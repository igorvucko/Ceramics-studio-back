import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Delete,
  Body,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    const product = await this.productsService.findById(+id);
    if (!product) {
      throw new NotFoundException('Proizvod nije pronađen.');
    }
    return product;
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const product = await this.productsService.findOne(slug);
    if (!product) {
      throw new NotFoundException('Proizvod nije pronađen.');
    }
    return product;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CreateProductDto>,
  ) {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}