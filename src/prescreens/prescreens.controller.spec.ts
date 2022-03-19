import { Test, TestingModule } from '@nestjs/testing';
import { CreatePrescreenDto } from './dto/create-prescreen.dto';
import { PrescreensController } from './prescreens.controller';
import { PrescreensService } from './prescreens.service';

const createPrescreenDto: CreatePrescreenDto = {
  userId: '5ceeea68-2012-4008-84c3-4148bbcb27d5',
  type: 'prescreen',
  code: 'Failure_8',
  status: true,
};

describe('PrescreensController', () => {
  let prescreensController: PrescreensController;
  let prescreensService: PrescreensService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PrescreensController],
      providers: [
        PrescreensService,
        {
          provide: PrescreensService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((prescreen: CreatePrescreenDto) =>
                Promise.resolve({ id: '1', ...prescreen }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    prescreensController = app.get<PrescreensController>(PrescreensController);
    prescreensService = app.get<PrescreensService>(PrescreensService);
  });

  it('should be defined', () => {
    expect(prescreensController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a prescreen', () => {
      prescreensController.create(createPrescreenDto);
      expect(prescreensController.create(createPrescreenDto)).resolves.toEqual({
        id: '1',
        ...createPrescreenDto,
      });
      expect(prescreensService.create).toHaveBeenCalledWith(createPrescreenDto);
    });
  });

  describe('findAll()', () => {
    it('should find all prescreens ', () => {
      prescreensController.findAll();
      expect(prescreensService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a prescreen', () => {
      expect(prescreensController.findOne('1')).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        id: '1',
      });
      expect(prescreensService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the prescreen', () => {
      prescreensController.remove('2');
      expect(prescreensService.remove).toHaveBeenCalled();
    });
  });
});
