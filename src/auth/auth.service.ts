import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return `This action returns all dahlah`;
  }
  signin() {
    return `This action returns all dahlah`;
  }
}
