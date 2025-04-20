import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { join } from 'path';
import fs from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      root: join(process.cwd(), 'site'),
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
        },
      },
    });

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (req.url?.startsWith('/api')) return next();

      if (req.method === 'GET' && req.url === '/') {
        try {
          const html = await fs.readFile(
            join(process.cwd(), 'site', 'index.html'),
            'utf-8',
          );
          const transformed = await vite.transformIndexHtml(req.url, html);
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(transformed);
        } catch (err) {
          console.error('[Nest] Failed to read index.html', err);
          return res.status(500).send('Internal Server Error');
        }
      }

      vite.middlewares(req, res, next);
    });
  }

  await app.listen(3000);
}
bootstrap();
