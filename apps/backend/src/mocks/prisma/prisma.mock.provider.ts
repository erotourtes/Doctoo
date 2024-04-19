import { Provider } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { prismaMock } from './prisma.mock';

export const PrismaMockProvider: Provider = { provide: PrismaService, useValue: prismaMock };
