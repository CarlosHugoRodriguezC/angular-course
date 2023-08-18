import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED,
      });

      console.log(payload);

      const user = await this.authService.findOne(payload.id);

      if (!user) throw new UnauthorizedException('Invalid token');

      if (!user.isActive) throw new UnauthorizedException('User is not active');

      request['user'] = user;

      return Promise.resolve(true);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader = (request: Request): string | undefined => {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    if (type !== 'Bearer') {
      return undefined;
    }

    return token;
  };
}
