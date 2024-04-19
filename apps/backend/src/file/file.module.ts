import { Module } from '@nestjs/common';
import { MinioModule } from '../minio/minio.module';
import { FileController } from './file.controller';

@Module({
  imports: [MinioModule],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
