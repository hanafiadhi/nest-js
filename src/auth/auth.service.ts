import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credential taken');
      }
      throw new ForbiddenException('gagal');
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
      throw new ForbiddenException('Credential taken');
    }
  }
}
