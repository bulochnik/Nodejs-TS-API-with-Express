import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (error, payload) => {
				if (error) {
					next();
				} else if (payload) {
					const data = payload as JwtPayload;
					req.user = data.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
