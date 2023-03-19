import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
const prisma = new PrismaClient();

async function main() {
  const passwordUser = await argon.hash('12345678');
  const user = await prisma.user.upsert({
    where: { username: 'hanafi' },
    update: {},
    create: {
      username: 'hanafi_adhi',
      password: passwordUser,
      customer: {
        create: {
          firstname: 'hanafi',
          lastname: 'adhi',
        },
      },
    },
  });
  const user2 = await prisma.user.upsert({
    where: { username: 'hanafi2' },
    update: {},
    create: {
      username: 'hanafi_adhi2',
      password: passwordUser,
      customer: {
        create: {
          firstname: 'hanafi2',
          lastname: 'adhi2',
        },
      },
    },
  });
  console.log({ user, user2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect;
    process.exit(1);
  });
