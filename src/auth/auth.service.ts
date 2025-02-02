import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // ตรวจสอบว่ามี email password นี้หรือไม่
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // ตรวจสอบว่ามี email password ตรงกับในฐานข้อมูลหรือไม่ ถ้าตรงให้สร้าง token และ refresh token เข้าสู้ระบบ
  async login(data: any, pass: string) {
    // Check if user exists
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(pass, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(data.id, user.email);
    await this.updateRefreshToken(data.id, tokens.refreshToken);
    return tokens;
  }

  // ออกจากระบบ
  async logout(userId: number) {
    return this.userService.updateUser(userId, { refreshToken: '' });
  }

  // ทำการ refreshTokens
  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.userService.getUserById(id);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(id, user.email);
    await this.updateRefreshToken(id, tokens.refreshToken);
    return tokens;
  }

  // อัพเดท refreshToken
  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.userService.updateUser(userId, {
      refreshToken: refreshToken,
    });
  }

  // สร้าง token และ refresh token
  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
