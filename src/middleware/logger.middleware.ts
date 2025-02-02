import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode } = res;
      const responseTime = Date.now() - start;

      const logMessage = `${method} ${originalUrl} ${statusCode} - ${responseTime}ms\n`;

      // Write log to file
      const logFilePath = path.join(__dirname, '../../logs/access.log');
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error('Failed to write log to file', err);
        }
      });
    });

    next();
  }
}
