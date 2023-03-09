import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    create:jest.fn().mockImplementation(dto => dto),
    save:jest.fn().mockImplementation(user => Promise.resolve({id:Date.now() , ...user}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService , {
        provide:getRepositoryToken(User),
        useValue:mockUserRepository
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create new user record  and return that' , async () => {
    // const id = Date.now()
    expect(await service.create({name : 'jhon'})).toEqual({
      id:expect.any(Number),
      name:'jhon'
    })
  })
});
