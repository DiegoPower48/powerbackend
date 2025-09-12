import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CloudflaredService } from './cloudflared';
import 'dotenv/config';

const PROYECTOS_VERCELES = process.env.PROYECTOS_VERCELES?.split(',') || [];
const VARS_A_ACTUALIZAR = process.env.VARIABLES?.split(',') || [];

const FABIAN_PROYECTOS_VERCELES =
  process.env.FABIAN_PROYECTOS_VERCELES?.split(',') || [];

@Injectable()
export class VercelMultiService implements OnModuleInit {
  private readonly logger = new Logger(VercelMultiService.name);

  constructor(private readonly cloudflaredService: CloudflaredService) {}

  private headers = {
    Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  private fabianHeaders = {
    Authorization: `Bearer ${process.env.FABIAN_VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  async onModuleInit() {
    if (process.env.VERCEL_MULTI_ENABLED === 'true') {
      try {
        await this.cloudflaredService.startTunnel();
      } catch (err) {
        console.error('No se pudo iniciar Cloudflared:', err.message);
      }
      const nuevaUrl = this.cloudflaredService.getTunnelUrl();
      await this.actualizarYRedeploy(nuevaUrl);
      await this.actualizarYRedeployFabian(nuevaUrl);
    } else {
      this.logger.warn(
        '😭 VercelMultiService está deshabilitado por configuración.',
      );
    }
  }

  private async actualizarVariable(
    project: string,
    key: string,
    value: string,
  ): Promise<boolean> {
    const query = process.env.VERCEL_TEAM_ID
      ? `?teamId=${process.env.VERCEL_TEAM_ID}`
      : '';
    this.logger.log(`✅ ${key} en ${project} = ${value} `);
    // 1. Obtener todas las variables
    const listUrl = `https://api.vercel.com/v10/projects/${project}/env${query}`;
    const listRes = await fetch(listUrl, {
      headers: this.headers,
    });

    if (!listRes.ok) {
      this.logger.error(`❌ No se pudieron obtener variables de ${project}`);
      return false;
    }

    const data = await listRes.json();
    const existingVar = data.envs.find((v: any) => v.key === key);

    // 2. Si existe, eliminarla
    if (existingVar) {
      const deleteUrl = `https://api.vercel.com/v10/projects/${project}/env/${existingVar.id}${query}`;
      const deleteRes = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: this.headers,
      });

      if (!deleteRes.ok) {
        this.logger.error(
          `❌ No se pudo eliminar la variable ${key} en ${project}`,
        );
        return false;
      }
    }

    // 3. Crear la variable con el nuevo valor
    const createUrl = `https://api.vercel.com/v10/projects/${project}/env${query}`;
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        key,
        value,
        target: ['production', 'preview', 'development'],
        type: 'plain',
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      this.logger.error(
        `❌ Error al crear variable ${key} en ${project}:`,
        err,
      );
      return false;
    }
    return true;
  }

  private async actualizarVariableFabian(
    project: string,
    key: string,
    value: string,
  ): Promise<boolean> {
    const query = process.env.FABIAN_VERCEL_TEAM_ID
      ? `?teamId=${process.env.FABIAN_VERCEL_TEAM_ID}`
      : '';
    this.logger.log(`🔥 ${key} en ${project} = ${value} `);
    // 1. Obtener todas las variables
    const listUrl = `https://api.vercel.com/v10/projects/${project}/env${query}`;
    const listRes = await fetch(listUrl, {
      headers: this.fabianHeaders,
    });

    if (!listRes.ok) {
      this.logger.error(`🧨 No se pudieron obtener variables de ${project}`);
      return false;
    }

    const data = await listRes.json();
    const existingVar = data.envs.find((v: any) => v.key === key);

    // 2. Si existe, eliminarla
    if (existingVar) {
      const deleteUrl = `https://api.vercel.com/v10/projects/${project}/env/${existingVar.id}${query}`;
      const deleteRes = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: this.fabianHeaders,
      });

      if (!deleteRes.ok) {
        this.logger.error(
          `🧨 No se pudo eliminar la variable ${key} en ${project}`,
        );
        return false;
      }
    }

    // 3. Crear la variable con el nuevo valor
    const createUrl = `https://api.vercel.com/v10/projects/${project}/env${query}`;
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: this.fabianHeaders,
      body: JSON.stringify({
        key,
        value,
        target: ['production', 'preview', 'development'],
        type: 'plain',
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      this.logger.error(
        `🧨 Error al crear variable ${key} en ${project}:`,
        err,
      );
      return false;
    }
    return true;
  }

  private async hacerRedeploy(project: string): Promise<boolean> {
    const webhookUrl = process.env[`VERCEL_WEBHOOK_${project}`];
    if (!webhookUrl) {
      this.logger.error(`❌ No se encontró webhook para ${project}`);
      return false;
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
    });

    if (!res.ok) {
      this.logger.error(
        `❌ Error al hacer redeploy de ${project}:`,
        await res.text(),
      );
      return false;
    }

    this.logger.log(`🚀 Redeploy ${project}`);
    return true;
  }

  private async hacerRedeployFabian(project: string): Promise<boolean> {
    const webhookUrl = process.env[`FABIAN_VERCEL_WEBHOOK_${project}`];
    if (!webhookUrl) {
      this.logger.error(`🧨 No se encontró webhook para ${project}`);
      return false;
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
    });

    if (!res.ok) {
      this.logger.error(
        `🧨 Error al hacer redeploy de ${project}:`,
        await res.text(),
      );
      return false;
    }

    this.logger.log(`🚀 Redeploy ${project}`);
    return true;
  }

  async actualizarYRedeploy(nuevaUrl): Promise<void> {
    let todoOk = true;

    for (const proyecto of PROYECTOS_VERCELES) {
      for (const key of VARS_A_ACTUALIZAR) {
        const ok = await this.actualizarVariable(proyecto, key, nuevaUrl);
        if (!ok) todoOk = false;
      }

      const redeployOk = await this.hacerRedeploy(proyecto);
      if (!redeployOk) todoOk = false;
    }

    if (todoOk) {
      this.logger.log(
        '🎉🎉🎉 Variables actualizadas y redeploy completado en Vercel.',
      );
    } else {
      this.logger.warn(
        '⚠️ Hubo errores durante la actualización o el redeploy.',
      );
    }
  }
  async actualizarYRedeployFabian(nuevaUrl): Promise<void> {
    let todoOk = true;

    for (const proyecto of FABIAN_PROYECTOS_VERCELES) {
      for (const key of VARS_A_ACTUALIZAR) {
        const ok = await this.actualizarVariableFabian(proyecto, key, nuevaUrl);
        if (!ok) todoOk = false;
      }

      const redeployOk = await this.hacerRedeployFabian(proyecto);
      if (!redeployOk) todoOk = false;
    }

    if (todoOk) {
      this.logger.log(
        '💥💥💥 Variables actualizadas y redeploy completado en VercelFabian.',
      );
    } else {
      this.logger.warn(
        '⚠️ Hubo errores durante la actualización o el redeploy en VercelFabian.',
      );
    }
  }
}
