import { FakeUploader } from 'test/storage/faker-storage';
import { UploadCreateAttachmentsUseCase } from './attachments-use-cases';
import { InvalidAttachmentsTypeError } from '../errors/invalid-attachments-type';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let fakeUploder: FakeUploader;
let sut: UploadCreateAttachmentsUseCase;

describe('Upload and create attachments', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    fakeUploder = new FakeUploader();
    sut = new UploadCreateAttachmentsUseCase(
      inMemoryAttachmentsRepository,
      fakeUploder,
    );
  });

  it('should be able to upload and create attachments', async () => {
    const result = await sut.execute({
      fileType: 'image/png',
      fileName: 'profile.png',
      body: Buffer.from(''),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.attchaments[0],
    });
    expect(fakeUploder.uploads).toHaveLength(1);
    expect(fakeUploder.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    );
  });

  it('should not be able to upload an attachments with invalid file type', async () => {
    const result = await sut.execute({
      fileType: 'image/webp',
      fileName: 'profile.png',
      body: Buffer.from(''),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidAttachmentsTypeError);
  });
});
