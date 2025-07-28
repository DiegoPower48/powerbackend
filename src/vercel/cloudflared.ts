import { Logger } from '@nestjs/common';
import { spawn } from 'child_process';

export class CloudflaredService {
  private readonly logger = new Logger(CloudflaredService.name)
  private tunnelUrl = '';

  async startTunnel(): Promise<void> {
    this.logger.log('🚀 Iniciando creación del túnel con Cloudflared...');

    return new Promise((resolve, reject) => {
      const child = spawn('cloudflared', ['tunnel', '--url', `http://localhost:${process.env.HOST_PORT}`, '--loglevel', 'info']);

      const buscarURL = (line: string) => {
        const match = line.match(/https:\/\/.*?\.trycloudflare\.com/);
        if (match && !this.tunnelUrl) {
          this.tunnelUrl = match[0];
          this.logger.log(`⭐⭐⭐ Túnel iniciado en: ${this.tunnelUrl}`);
          resolve();
        }
      };

      child.stdout.on('data', (data) => {
        const line = data.toString();
        buscarURL(line);
      });

      child.stderr.on('data', (data) => {
        const line = data.toString();
        buscarURL(line);
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
