import { Controller, Get, Param, NotFoundException,Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Delete(':id')
async remove(@Param('id') id: string) {
  return this.productsService.remove(+id);
}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const product = await this.productsService.findOne(slug);
    if (!product) {
      throw new NotFoundException('Proizvod nije pronađen.');
    }
    return product;
  }
}