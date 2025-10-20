import { Body, Controller, NotFoundException, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateMeDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req: any, @Body() dto: UpdateMeDto) {
    const userId = req.user?.sub;
    const updated = await this.users.updateById(userId, dto);
    if (!updated) throw new NotFoundException('User not found');
    const obj = (updated as any).toObject ? (updated as any).toObject() : updated;
    delete (obj as any).password;
    return obj;
  }
}


