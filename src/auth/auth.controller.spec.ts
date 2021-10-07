import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: '30s'
            },
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
