import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser function', () => {
    it('should be defined', async () => {
      expect(service.getUser).toBeDefined();
    });

    it('should return a user', async () => {
      let mockUser: User = {
        id: '21209c99-3042-4d38-8088-78235c7f129d',
        username: 'thonguyen77',
        password: '$2a$12$ZQuVppir4EYNW8goQt8C4.BuWFoYPf6Zij6ug7UZTIFoeOfun06qC',
        firstname: 'Huu Tho',
        lastname: 'Nguyen',
        email: 'huutho1999@gmail.com',
        address: '106 Nguyen Van Troi, Q.Phu Nhuan, TP.HCM',
        phone_number: '0987654536',
        create_At: new Date(),
        update_At: new Date()
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      service.getUser('thonguyen77');
      expect(userRepository.findOne).toHaveBeenCalledWith({ "username": mockUser.username });
      expect(await service.getUser('thonguyen77')).toEqual(mockUser);
    });

    it('should return exception not found when username not already exist', async () => {
      let mockUser: User = {
        id: '21209c99-3042-4d38-8088-78235c7f129d',
        username: 'thonguyen77',
        password: '$2a$12$ZQuVppir4EYNW8goQt8C4.BuWFoYPf6Zij6ug7UZTIFoeOfun06qC',
        firstname: 'Huu Tho',
        lastname: 'Nguyen',
        email: 'huutho1999@gmail.com',
        address: '106 Nguyen Van Troi, Q.Phu Nhuan, TP.HCM',
        phone_number: '0987654536',
        create_At: new Date(),
        update_At: new Date()
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      service.getUser('thonguyen');
      expect(userRepository.findOne).toHaveBeenCalledWith({ "username": "thonguyen" });
      expect(await userRepository.findOne({ "username": "thonguyen" })).toBeUndefined();
      expect(await service.getUser('thonguyen')).toEqual(undefined);
    });
  }); // close describe getUser function

  describe('checkExist fucntion', () => {
    it('should be defined', async () => {
      expect(service.checkExist).toBeDefined();
    });
  }); // close describe checkExist function

  describe('validationUser fucntion', () => {
    it('should be defined', async () => {
      expect(service.validationUser).toBeDefined();
    });

    it('should return true', () => {
      expect(service.validationUser('tnguyen77', 'huutho!0707')).toBeTruthy();
    });

    it('should return false when username is empty', () => {
      expect(service.validationUser('', '123456789')).toBeFalsy();
    });

    it('should return false when password is empty', () => {
      expect(service.validationUser('thonguyen', '')).toBeFalsy();
    });

    it('should return false when username length less than 6 charactors', () => {
      expect(service.validationUser('tho', '123456789')).toBeFalsy();
    });

    it('should return false when password length less than 8 charactors', () => {
      expect(service.validationUser('thonguyen', '12345')).toBeFalsy();
    });
  }); // close describe validationUser function
});
