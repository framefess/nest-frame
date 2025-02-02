import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}

// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule], // Import ConfigModule
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'), // Use ConfigService to get the secret
//         signOptions: { expiresIn: '1d' },
//       }),
//       inject: [ConfigService], // Inject ConfigService
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [
//     AuthService,
//     LocalStrategy,
//     JwtStrategy,
//     AccessTokenStrategy,
//     RefreshTokenStrategy,
//   ],
// })
// export class AuthModule {}
