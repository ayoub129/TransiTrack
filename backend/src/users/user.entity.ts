export type UserRole = 'client' | 'transporteur' | 'admin';

export class UserEntity {
  id!: string; // uuid
  email!: string;
  password!: string; // hashed
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;

  firstName?: string;
  lastName?: string;
  phone?: string;
}


