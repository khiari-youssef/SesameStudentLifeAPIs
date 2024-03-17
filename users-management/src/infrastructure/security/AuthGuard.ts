import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {SesameRole} from "../../domain/entities/SesameRole";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = AuthGuard.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            const  user = await this.jwtService.verifyAsync<{
                email : string,
                role : SesameRole,
                iat : number,
                exp : number
            }>(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private static extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}