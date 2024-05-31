import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');

            const httpSuccess = [200, 201, 202];
            const httpWarn = [400, 401, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 429];
            const httpError = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

            if (httpWarn.includes(statusCode)) this.logger.warn(
                `${method}::${statusCode} ${originalUrl} ${contentLength} - ${userAgent} ${ip}`,
            );

            if (httpSuccess.includes(statusCode)) this.logger.log(
                `${method}::${statusCode} ${originalUrl} ${contentLength} - ${userAgent} ${ip}`,
            );

            if (httpError.includes(statusCode)) this.logger.error(
                `${method}::${statusCode} ${originalUrl} ${contentLength} - ${userAgent} ${ip}`,
            );

        });

        next();
    }
}