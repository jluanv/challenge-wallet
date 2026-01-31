import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    super({ adapter: pool });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
