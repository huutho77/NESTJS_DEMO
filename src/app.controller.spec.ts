import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule Test', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  // Test app controller
  describe('AppController', () => {
    describe('root', () => {
      it('should be defined', () => {
        expect(appController).toBeDefined();
      });
    });

    describe('getHello', () => {
      it('should return "Hello World!"', () => {
        expect(appController.getHello()).toBe('Hello World!');
      });
    });
  });

  // Test app service
  describe('AppService', () => {
    describe('root', () => {
      it('should be defined', () => {
        expect(appService).toBeDefined();
      });
    });

    describe('getHello', () => {
      it('should return "Hello World!"', () => {
        expect(appService.getHello()).toBe('Hello World!');
      });
    });
  });


});
