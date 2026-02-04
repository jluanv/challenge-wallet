import "dotenv/config";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../src/prisma/prisma.service";

const prisma = new PrismaService();

async function seed() {
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("@Abc1234", 8);

  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      cpf: "38692761001",
      name: "Fulano",
      password: passwordHash,
    },
  });

  console.log("✅ Usuário criado");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
