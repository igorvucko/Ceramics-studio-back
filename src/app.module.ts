import {  Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './product/products.module';
import { ProductsController} from './product/products.controller';
import { CheckoutController } from './checkout/checkout.controller';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
 @Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ImageModule,
    ProductsModule,
    OrderModule,
    ConfigModule.forRoot({ isGlobal: true })],
  providers:[PrismaService],
  controllers: [ProductsController, CheckoutController],
 }
)
export class AppModule{}
