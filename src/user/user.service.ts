import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDTO } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // สร้างฟังก์ชัน createUser ที่รับ RegisterDTO และสร้างผู้ใช้ใหม่จากข้อมูลที่ได้รับ
  async createUser(registerDTO: RegisterDTO): Promise<User> {
    const { email, password, name, tel } = registerDTO;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      email,
      password: hashPassword,
      name,
      tel,
    };
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create user: ${error.message}`,
      );
    }
  }

  // สร้างฟังก์ชัน getUserById ที่รับ id และคืนค่าผู้ใช้ที่มี id ตรงกับที่ได้รับ
  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
    }
    return user ? user : null;
  }

  // สร้างฟังก์ชัน getUserByEmail ที่รับอีเมลและคืนค่าผู้ใช้ที่มีอีเมลตรงกับที่ได้รับ
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
    }
    return user ? user : null;
  }

  // สร้างฟังก์ชัน updateUser ที่รับ id และ UpdateUserDto และอัปเดตผู้ใช้ที่มี id ตรงกับที่ได้รับ
  updateUser(id: number, updateUsersDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUsersDto);
  }
}
