// src/utils/cloudflared.ts
import { spawn } from 'child_process';

export const iniciarCloudflared = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const child = spawn('cloudflared', ['tunnel', '--url', 'http://localhost:3000']);

    child.stdout.on('data', (data) => {
      const texto = data.toString();
      const match = texto.match(/https:\/\/.*\.trycloudflare\.com/);
      if (match) {
        const url = match[0];
        console.log('✅ Cloudflare URL:', url);
        resolve(url);
      }
    });

    child.stderr.on('data', (data) => {
      console.error('Cloudflared error:', data.toString());
    });

    child.on('error', reject);
  });
};
