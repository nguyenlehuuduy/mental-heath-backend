import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MockDataService {
  constructor(private prisma: PrismaService) {}
  async createAccount() {
    try {
      const result = await this.prisma.account.createMany({
        data: [
          {
            id: '1',
            email: 'nhduong@gmail.com',
            password: await bcrypt.hash('genz123123', 10),
            aboutMe:
              'Faker tries to generate realistic data and not obvious fake data. ',
            address: faker.person.jobArea(),
            birth: faker.date.birthdate(),
            nickName: faker.person.lastName(),
            fullName: 'Nguyễn Hải Dương',
            phone: faker.phone.number(),
          },
          {
            id: '2',
            email: 'nkthinh@gmail.com',
            password: await bcrypt.hash('genz123123', 10),
            aboutMe:
              'Faker tries to generate realistic data and not obvious fake data. ',
            address: faker.person.jobArea(),
            birth: faker.date.birthdate(),
            nickName: faker.person.lastName(),
            fullName: 'Nguyễn Khắc Thịnh',
            phone: faker.phone.number(),
          },
          {
            id: '3',
            email: 'ntcuong@gmail.com',
            password: await bcrypt.hash('genz123123', 10),
            aboutMe:
              'Faker tries to generate realistic data and not obvious fake data. ',
            address: faker.person.jobArea(),
            birth: faker.date.birthdate(),
            nickName: faker.person.lastName(),
            fullName: 'Nguyễn Thanh Cường',
            phone: faker.phone.number(),
          },
          {
            id: '4',
            email: 'nlhduy@gmail.com',
            password: await bcrypt.hash('genz123123', 10),
            aboutMe:
              'Faker tries to generate realistic data and not obvious fake data. ',
            address: faker.person.jobArea(),
            birth: faker.date.birthdate(),
            nickName: faker.person.lastName(),
            fullName: 'Nguyễn Lê Hữu Duy',
            phone: faker.phone.number(),
          },
        ],
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async createRole() {
    try {
      return await this.prisma.role.createMany({
        data: [
          {
            nameRole: 'USER',
            descriptionRole: 'normal account',
          },
          {
            nameRole: 'ADMIN',
            descriptionRole: 'run the system',
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createPostForeachAccount() {
    const dataText = 'gen mental heath';
    try {
      const allAccount = await this.prisma.account.findMany();
      for (const item of allAccount) {
        await this.prisma.post.createMany({
          data: [
            { accountId: item.id, contentText: faker.animal.bear() + dataText },
            { accountId: item.id, contentText: faker.animal.bird() + dataText },
            { accountId: item.id, contentText: faker.animal.cat() + dataText },
            { accountId: item.id, contentText: faker.animal.cow() + dataText },
            { accountId: item.id, contentText: faker.animal.fish() + dataText },
            { accountId: item.id, contentText: faker.animal.lion() + dataText },
            { accountId: item.id, contentText: faker.animal.bird() + dataText },
          ],
        });
      }
      return 'ok';
    } catch (error) {
      console.error(error);
    }
  }

  async createFollowShip() {
    try {
      return this.prisma.followShip.createMany({
        data: [
          { followerId: '1', followingId: '2', piority: 4 },
          { followerId: '2', followingId: '1', piority: 1 },
          { followerId: '1', followingId: '3', piority: 7 },
          { followerId: '1', followingId: '4', piority: 6 },
          { followerId: '3', followingId: '1', piority: 4 },
          { followerId: '3', followingId: '2', piority: 2 },
          { followerId: '3', followingId: '4', piority: 3 },
          { followerId: '4', followingId: '1', piority: 6 },
          { followerId: '4', followingId: '2', piority: 8 },
          { followerId: '4', followingId: '3', piority: 10 },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }
}