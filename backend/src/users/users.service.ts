import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  async create(data: { email: string; password: string; role: UserRole; firstName?: string; lastName?: string; phone?: string; }): Promise<UserEntity> {
    const now = new Date();
    const hashed = await bcrypt.hash(data.password, 10);
    const user: UserEntity = {
      id: randomUUID(),
      email: data.email.toLowerCase(),
      password: hashed,
      role: data.role,
      createdAt: now,
      updatedAt: now,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };
    this.users.push(user);
    return { ...user, password: undefined as any };
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find(u => u.email === email.toLowerCase());
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.users.find(u => u.id === id);
  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
  }
}


