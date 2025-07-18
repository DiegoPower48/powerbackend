import { spawn } from 'child_process';

export class CloudflaredService {
  private tunnelUrl = '';

  async startTunnel(): Promise<void> {
    console.log('🚀 Iniciando creación del túnel con Cloudflared...');

    return new Promise((resolve, reject) => {
      const child = spawn('cloudflared', ['tunnel', '--url', 'http://localhost:3000', '--loglevel', 'info']);

      const buscarURL = (line: string) => {
        const match = line.match(/https:\/\/.*?\.trycloudflare\.com/);
        if (match && !this.tunnelUrl) {
          this.tunnelUrl = match[0];
          console.log(`✅ Túnel iniciado en: ${this.tunnelUrl}`);
          resolve();
        }
      };

      child.stdout.on('data', (data) => {
        const line = data.toString();
        buscarURL(line);
      });

      child.stderr.on('data', (data) => {
        const line = data.toString();
        console.error(`Cloudflared: ${line}`);
        buscarURL(line); // 🔑 Aquí también buscamos la URL
      });

      child.on('error', reject);

      child.on('close', (code) => {
        if (!this.tunnelUrl && code !== 0) {
          reject(`Cloudflared finalizó con código: ${code}`);
        }
      });
    });
  }

  getTunnelUrl(): string {
    return this.tunnelUrl;
  }
}
