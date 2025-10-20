import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: { email: string; password: string; role: UserRole; firstName?: string; lastName?: string; phone?: string; }) {
    const exists = await this.userModel.findOne({ email: data.email.toLowerCase() }).lean();
    if (exists) throw new BadRequestException('Email already registered');
    const hashed = await bcrypt.hash(data.password, 10);
    const created = await this.userModel.create({
      email: data.email.toLowerCase(),
      password: hashed,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });
    const obj = created.toObject();
    // remove password before returning
    delete (obj as any).password;
    return obj;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
  }

  async updateById(id: string, update: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, update, { new: true });
  }
}


