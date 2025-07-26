import { Injectable, OnModuleInit } from '@nestjs/common';
import { CloudflaredService } from './cloudflared';
import 'dotenv/config';
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID || '';
const PROYECTOS_VERCELES = process.env.PROYECTOS_VERCELES?.split(',') || [];
const VARS_A_ACTUALIZAR = ['NEXT_PUBLIC_API_URL', 'VITE_API_URL'];

@Injectable()
export class VercelMultiService implements OnModuleInit {
  
  constructor(private readonly cloudflaredService: CloudflaredService) {}

  private headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  };
  async onModuleInit() {
    await this.actualizarYRedeploy();
  }
  private async actualizarVariable(project: string, key: string, value: string): Promise<boolean> {
  const query = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
console.log(`📦 Estableciendo ${key} = ${value} en ${project}`);
  // 1. Obtener todas las variables
  const listUrl = `https://api.vercel.com/v10/projects/${project}/env${query}`;
  const listRes = await fetch(listUrl, {
    headers: this.headers,
  });

  if (!listRes.ok) {
    console.error(`❌ No se pudieron obtener variables de ${project}`);
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
      console.error(`❌ No se pudo eliminar la variable ${key} en ${project}`);
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
    console.error(`❌ Error al crear variable ${key} en ${project}:`, err);
    return false;
  }

  console.log(`✅ Variable ${key} actualizada en ${project}`);
  return true;
}

  private async hacerRedeploy(project: string): Promise<boolean> {
    const webhookUrl = process.env[`VERCEL_WEBHOOK_${project}`];
    if (!webhookUrl) {
      console.error(`❌ No se encontró webhook para ${project}`);
      return false;
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
    });

    if (!res.ok) {
      console.error(
        `❌ Error al hacer redeploy de ${project}:`,
        await res.text(),
      );
      return false;
    }

    console.log(`🚀 Redeploy enviado para ${project}`);
    return true;
  }

  async actualizarYRedeploy(): Promise<void> {
    await this.cloudflaredService.startTunnel(); 
    const nuevaUrl = this.cloudflaredService.getTunnelUrl();
    console.log(`🌐 URL del túnel: ${nuevaUrl}`);

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
      console.log('✅ Variables actualizadas y redeploy completado.');
    } else {
      console.warn('⚠️ Hubo errores durante la actualización o el redeploy.');
    }
  }
}
