import {CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {SesameRole, SesameRoleLabel} from "../../domain/entities/SesameRole";
import {Reflector} from "@nestjs/core";

const ROLES_KEY : string = "ROLES_KEY"
export const SesameRoles = (...roles: SesameRoleLabel[]) => SetMetadata(ROLES_KEY, roles);


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector: Reflector) {}

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
            }>(token, {secret: process.env.JWT_SECRET});
            const requiredRoles = this.reflector.getAllAndOverride<SesameRoleLabel[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
           return  requiredRoles.some((role)=>role == user.role.getRoleName())
        } catch {
            throw new UnauthorizedException();
        }
    }

    private static extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}