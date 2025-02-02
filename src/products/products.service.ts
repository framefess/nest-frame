import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { createObjectCsvWriter } from 'csv-writer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  //สร้างฟังก์ชัน createProduct สำหรับสร้างสินค้าใหม่
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(newProduct);
    await this.cacheManager.del('products'); // Invalidate the cache for the product list
    return savedProduct;
  }

  //สร้างฟังก์ชัน getAllProducts สำหรับดึงข้อมูลสินค้าทั้งหมด
  async getAllProducts(): Promise<Product[]> {
    const cachedProducts = await this.cacheManager.get<Product[]>('products');
    if (cachedProducts) {
      return cachedProducts;
    }
    const products = await this.productsRepository.find();
    // const test = await this.cacheManager.set('products', products);
    // const test2 = await this.cacheManager.get('products');
    // console.log('products', test2);
    return products;
  }

  //สร้างฟังก์ชัน getProductById สำหรับดึงข้อมูลสินค้าตาม ID
  async getProductById(id: number): Promise<Product> {
    const cachedProduct = await this.cacheManager.get<Product>(`product_${id}`);
    if (cachedProduct) {
      return cachedProduct;
    }
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.cacheManager.set(`product_${id}`, product);
    return product;
  }

  //สร้างฟังก์ชัน updateProduct สำหรับอัปเดตข้อมูลสินค้า
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.cacheManager.set(`product_${id}`, updatedProduct);
    await this.cacheManager.del('products'); // Invalidate the cache for the product list
    return updatedProduct;
  }

  //สร้างฟังก์ชัน replaceProduct สำหรับอัปเดตข้อมูลสินค้า
  async replaceProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productsRepository.save({ ...product, ...updateProductDto });
    const replacedProduct = await this.productsRepository.findOneBy({ id });
    await this.cacheManager.set(`product_${id}`, replacedProduct);
    await this.cacheManager.del('products'); // Invalidate the cache for the product list
    if (!replacedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return replacedProduct;
  }

  //สร้างฟังก์ชัน deleteProduct สำหรับลบข้อมูลสินค้า
  async deleteProduct(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.cacheManager.del(`product_${id}`);
    await this.cacheManager.del('products'); // Invalidate the cache for the product list
  }

  //สร้างฟังก์ชัน exportProductsToCSV สำหรับส่งออกข้อมูลสินค้าเป็นไฟล์ CSV
  async exportProductsToCSV(): Promise<string> {
    const products = await this.productsRepository.find();
    const csvWriter = createObjectCsvWriter({
      path: path.join(__dirname, '../../exports/products.csv'),
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'description', title: 'Description' },
        { id: 'price', title: 'Price' },
      ],
    });

    const records = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    }));

    await csvWriter.writeRecords(records);
    return path.join(__dirname, '../../exports/products.csv');
  }
}
