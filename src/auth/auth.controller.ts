import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

import { RegisterDTO } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Body() body: any) {
    return await this.authService.login(req.user, body.password);
  }

  @Post('register')
  async registerUser(@Body() registerDTO: RegisterDTO) {
    return this.userService.createUser(registerDTO);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Request() req: any) {
    return this.authService.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const user = await this.userService.getUserByEmail(req.user.email);
    if (!user) {
      return null;
    }
    const result = {
      email: user.email,
    };
    return result;
  }
}
