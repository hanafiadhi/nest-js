import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(createCustomer: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomer });
  }
  async findAll() {
    try {
      const data = await this.prisma.customer.findMany({
        include: { user: true },
      });
      const result = {
        statuscode: 200,
        messaage: 'success',
        data,
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    return this.prisma.customer.findFirst({ where: { userId: id } });
  }
  update(id: string, updateCustomer: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { userId: id },
      data: updateCustomer,
    });
  }
  remove(id: string) {
    return this.prisma.customer.delete({ where: { userId: id } });
  }
}
