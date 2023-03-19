import {
  ForbiddenException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(data: AuthDto) {
    try {
      const hash = await argon.hash(data.password);
      const user = await this.prisma.user.create({
        data: {
          username: data.username,
          password: hash,
        },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Credential Taken',
            error: 'Forbiden',
          });
        }
      }
      throw error;
    }
  }
  async signin(data: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });
      if (!user) throw new ForbiddenException('Credential incorrect');
      const match = await argon.verify(user.password, data.password);
      if (!match) throw new ForbiddenException('Credential incorrect');
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
