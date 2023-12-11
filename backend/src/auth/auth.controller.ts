import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: SignUpDto, @Res() response: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.signup(dto);

      response.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      });

      response.send({ accessToken });
    } catch (e) {
      response.send(e.message);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(dto);

      response.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      });

      response.json({ accessToken });
    } catch (e) {
      response.send(e.message);
    }
  }

  @Post('refresh')
  refresh(@Req() request: Request) {
    const { refreshToken } = request.cookies;
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('refreshToken');
    response.send({ message: 'Logged out' });
  }
}
