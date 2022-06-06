import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private _jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];

            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({ message: "User is not authorized" });
            }

            const user = this._jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: "User is not authorized" });
        }
    }

}

@Injectable()
export class GetIdFromAuthGuard implements CanActivate {
    constructor(private _jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];

            if (bearer !== "Bearer" || !token) {
                req.userId = null;
                return true;
            }

            req.userId = this._jwtService.decode(token);
            return true;
        } catch (e) {
            throw new HttpException("Unexpected authguard error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}