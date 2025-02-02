// import { DynamicModule, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({})
// export class DatabaseModule {
//   static forRoot(entities = [], options?): DynamicModule {
//     const providers = [
//       {
//         provide: 'DATABASE_CONNECTION',
//         useFactory: async (configService: ConfigService) => {
//           return TypeOrmModule.forRootAsync({
//             imports: [ConfigModule],
//             useFactory: async () => ({
//               type: 'mysql',
//               host: configService.get<string>('DB_HOST'),
//               port: configService.get<number>('DB_PORT'),
//               username: configService.get<string>('DB_USER'),
//               password: configService.get<string>('DB_PASSWORD'),
//               database: configService.get<string>('DB_NAME'),
//               entities,
//               synchronize: true,
//               ...options,
//             }),
//             inject: [ConfigService],
//           });
//         },
//         inject: [ConfigService],
//       },
//     ];

//     return {
//       module: DatabaseModule,
//       imports: [
//         TypeOrmModule.forRootAsync({
//           imports: [ConfigModule],
//           useFactory: async (configService: ConfigService) => ({
//             type: 'mysql',
//             host: configService.get<string>('DB_HOST'),
//             port: configService.get<number>('DB_PORT'),
//             username: configService.get<string>('DB_USER'),
//             password: configService.get<string>('DB_PASSWORD'),
//             database: configService.get<string>('DB_NAME'),
//             entities,
//             synchronize: true,
//             ...options,
//           }),
//           inject: [ConfigService],
//         }),
//       ],
//       providers,
//       exports: providers,
//     };
//   }

//   static forFeature(entities = []): DynamicModule {
//     return TypeOrmModule.forFeature(entities);
//   }

//   static forRootMultiple(
//     connections: { name: string; entities: any[]; options?: any }[],
//   ): DynamicModule {
//     const imports = connections.map((connection) =>
//       TypeOrmModule.forRootAsync({
//         name: connection.name,
//         imports: [ConfigModule],
//         useFactory: async (configService: ConfigService) => ({
//           type: 'mysql',
//           host: configService.get<string>(`${connection.name}_DB_HOST`),
//           port: configService.get<number>(`${connection.name}_DB_PORT`),
//           username: configService.get<string>(`${connection.name}_DB_USER`),
//           password: configService.get<string>(`${connection.name}_DB_PASSWORD`),
//           database: configService.get<string>(`${connection.name}_DB_NAME`),
//           entities: connection.entities,
//           synchronize: true,
//           ...connection.options,
//         }),
//         inject: [ConfigService],
//       }),
//     );

//     return {
//       module: DatabaseModule,
//       imports,
//     };
//   }
// }
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities,
            synchronize: true,
            ...options,
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }

  static forFeature(entities = []): DynamicModule {
    return TypeOrmModule.forFeature(entities);
  }

  static forRootMultiple(
    connections: { name: string; entities: any[]; options?: any }[],
  ): DynamicModule {
    const imports = connections.map((connection) =>
      TypeOrmModule.forRootAsync({
        name: connection.name,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>(`${connection.name}_DB_HOST`),
          port: configService.get<number>(`${connection.name}_DB_PORT`),
          username: configService.get<string>(`${connection.name}_DB_USER`),
          password: configService.get<string>(`${connection.name}_DB_PASSWORD`),
          database: configService.get<string>(`${connection.name}_DB_NAME`),
          entities: connection.entities,
          synchronize: true,
          ...connection.options,
        }),
        inject: [ConfigService],
      }),
    );

    return {
      module: DatabaseModule,
      imports,
      exports: imports,
    };
  }
}
