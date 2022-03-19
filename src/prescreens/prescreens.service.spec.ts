import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Prescreen } from './prescreen.entity';
import { PrescreensService } from './prescreens.service';
import { Repository } from 'typeorm';

const prescreenArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
  },
];

const onePrescreen = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

describe('PrescreenService', () => {
  let service: PrescreensService;
  let repository: Repository<Prescreen>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescreensService,
        {
          provide: getRepositoryToken(Prescreen),
          useValue: {
            find: jest.fn().mockResolvedValue(prescreenArray),
            findOne: jest.fn().mockResolvedValue(onePrescreen),
            save: jest.fn().mockResolvedValue(onePrescreen),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PrescreensService>(PrescreensService);
    repository = module.get<Repository<Prescreen>>(getRepositoryToken(Prescreen));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a prescreen', () => {
      const onePrescreen = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
      };

      expect(
        service.create({
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        }),
      ).resolves.toEqual(onePrescreen);
    });
  });

  describe('findAll()', () => {
    it('should return an array of prescreens', async () => {
      const prescreens = await service.findAll();
      expect(prescreens).toEqual(prescreenArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single prescreen', () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      expect(service.findOne('1')).resolves.toEqual(onePrescreen);
      expect(repoSpy).toBeCalledWith('1');
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
