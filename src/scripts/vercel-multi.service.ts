import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CloudflaredService } from './cloudflared';

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID || '';
const PROYECTOS_VERCELES = process.env.PROYECTOS_VERCELES?.split(',') || [];
const VARS_A_ACTUALIZAR = ['NEXT_PUBLIC_API_URL', 'VITE_API_URL'];

@Injectable()
export class VercelMultiService {
  constructor(private readonly cloudflaredService: CloudflaredService) {}

  private headers = {
    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  private async actualizarVariable(project: string, key: string, value: string): Promise<boolean> {
    const query = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
    const url = `https://api.vercel.com/v10/projects/${project}/env${query}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        key,
        value,
        target: ['production', 'preview', 'development'],
        type: 'plain',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Error al actualizar ${key} en ${project}:`, err);
      return false;
    }

    console.log(`✅ Variable ${key} actualizada en ${project}`);
    return true;
  }

  private async hacerRedeploy(project: string): Promise<boolean> {
    const query = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
    const url = `https://api.vercel.com/v1/integrations/deploy/${project}${query}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
    });

    if (!res.ok) {
      console.error(`❌ Error al hacer redeploy de ${project}:`, await res.text());
      return false;
    }

    console.log(`🚀 Redeploy enviado para ${project}`);
    return true;
  }

  async actualizarYRedeploy(): Promise<void> {
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
