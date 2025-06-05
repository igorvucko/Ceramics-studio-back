import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async findOne(slug: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { slug },
    });
  }

  async create(data: {
    name: string;
    price: string;
    image: string;
    slug: string;
    description?: string;
    details?: string;
  }) {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: number, data: Partial<Prisma.ProductUpdateInput>) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}