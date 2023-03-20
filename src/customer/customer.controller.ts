import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiAcceptedResponse({
    status: 200,
    isArray: true,
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiAcceptedResponse({
    status: 200,
    isArray: true,
    description: 'menampilkan semua cutomer dengan usernya',
  })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customerService.findOne(id);
    if (!customer) return new NotFoundException(`customer not found`);
    return customer;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
