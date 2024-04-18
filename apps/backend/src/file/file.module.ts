import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [MinioModule],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
