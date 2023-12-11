import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private primsaService: PrismaService,
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.primsaService.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hashedPassword,
        },
      });

      return {
        accessToken: this.signAccessToken({ id: user.id, email: user.email }),
        refreshToken: this.signRefreshToken({ id: user.id, email: user.email }),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Username or email already exists');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.primsaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    return {
      accessToken: this.signAccessToken({ id: user.id, email: user.email }),
      refreshToken: this.signRefreshToken({ id: user.id, email: user.email }),
    };
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new ForbiddenException('Invalid token');
      }
      console.log(refreshToken);

      const payload = this.jwt.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      return {
        accessToken: this.signAccessToken({
          id: payload.id,
          email: payload.email,
        }),
      };
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }

  private signAccessToken(payload: { id: number; email: string }) {
    const signOptions = {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    };

    return this.jwt.sign(payload, signOptions);
  }

  private signRefreshToken(payload: { id: number; email: string }) {
    const signOptions = {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    };
    return this.jwt.sign(payload, signOptions);
  }
}
