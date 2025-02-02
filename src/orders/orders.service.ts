import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_items.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,

    private dataSource: DataSource,
  ) {}

  //สร้างฟังชั่นสำหรับสร้าง Order ใหม่ โดยใช้ QueryRunner ในการจัดการ Transaction
  async createOder(createOrderDto: CreateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { customerName, customerEmail, items } = createOrderDto;

      const order = new Order();
      order.customerName = customerName;
      order.customerEmail = customerEmail;
      order.items = [];

      for (const item of items) {
        const orderItem = new OrderItem();
        orderItem.productName = item.productName;
        orderItem.quantity = item.quantity;
        orderItem.price = item.price;
        order.items.push(orderItem);
      }

      await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      return order;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  //สร้างฟังชั่นสำหรับดึงข้อมูล Order ทั้งหมด
  findAllOder(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['items'] });
  }
}
