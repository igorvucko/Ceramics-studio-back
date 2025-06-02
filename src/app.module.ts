import {  Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './product/products.module';
import { ProductsController} from './product/products.controller';
import { CheckoutController } from './checkout/checkout.controller';
 @Module({
  imports: [ProductsModule],
  providers:[PrismaService],
  controllers: [ProductsController, CheckoutController],
 }
)
export class AppModule{}
