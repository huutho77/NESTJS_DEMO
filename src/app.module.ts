import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'P@ssword@123',
      database: 'demo_nestjs',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrationsRun: true,
      migrations: [
        'dist/migration/*{.ts,.js}'
      ]
    }),
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
