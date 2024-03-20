import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {SesamePermissions, SesamePermissionState, SesameRole, SesameRoleType} from "../../domain/entities/SesameRole";
import {Reflector} from "@nestjs/core";

const ROLES_KEY : string = "ROLES_KEY"
const PERMISSIONS_KEY : string = "PERMISSIONS_KEY"
export const RequireRole = (...roles: SesameRoleType[]) => SetMetadata(ROLES_KEY, roles);
export const RequirePermissions = (...permissions: SesamePermissions[]) => SetMetadata(PERMISSIONS_KEY, permissions);

type UserAuthPayload = {
    email : string,
        role : SesameRole,
        iat : number,
        exp : number
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = AuthGuard.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        let  user : UserAuthPayload;
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            user =  await this.jwtService.verifyAsync<UserAuthPayload>(token, {secret: process.env.JWT_SECRET});
        } catch {
            throw new UnauthorizedException("Invalid token");
        }

            const requiredRoles = this.reflector.getAllAndOverride<SesameRoleType[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles || requiredRoles.length == 0) return  true;
            if (user.role.type in requiredRoles) {
                const requiredPermissions = this.reflector.getAllAndOverride<SesamePermissions[]>(PERMISSIONS_KEY, [
                    context.getHandler(),
                    context.getClass(),
                ]);

                if (!requiredPermissions || requiredPermissions.length == 0) return  true;

                let filteredResult = user.role.permissions
                    .filter((userPermission)=>{
                        return  userPermission.permission in requiredPermissions
                    })
                filteredResult.forEach((userPermission)=>{
                    let isPermissionEnabled = userPermission.state == SesamePermissionState.GRANTED || userPermission.state == SesamePermissionState.REQUIRES_AUTH
                    if (!isPermissionEnabled) throw new ForbiddenException(`This action requires permission, permission code : ${userPermission}`)
                })
                return true;
            } else  throw new ForbiddenException(`This action expects you to have one of the following roles ${requiredRoles.join(" , ")}, actual role : ${user.role.type}`)

    }

    private static extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}