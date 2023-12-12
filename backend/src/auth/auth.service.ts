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

      return this.sendTokens(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException({
            message: 'Username or email already exists',
          });
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
      throw new ForbiddenException({
        message: 'Invalid credentials',
      });
    }

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException({
        message: 'Invalid credentials',
      });
    }

    return this.sendTokens(user);
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new ForbiddenException(
          'No refresh token provided, please login again',
        );
      }

      const payload = this.jwt.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      return {
        accessToken: this.signAccessToken({
          id: payload.id,
          email: payload.email,
          username: payload.username,
        }),
      };
    } catch (error) {
      throw new ForbiddenException({
        message: 'Invalid refresh token',
      });
    }
  }

  private sendTokens(payload: { id: number; email: string; username: string }) {
    return {
      accessToken: this.signAccessToken(payload),
      refreshToken: this.signRefreshToken(payload),
    };
  }

  private signAccessToken(payload: {
    id: number;
    email: string;
    username: string;
    isAdmin?: boolean;
  }) {
    const signOptions = {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    };

    return this.jwt.sign(payload, signOptions);
  }

  private signRefreshToken(payload: {
    id: number;
    email: string;
    username: string;
    isAdmin?: boolean;
  }) {
    const signOptions = {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    };
    return this.jwt.sign(payload, signOptions);
  }
}
