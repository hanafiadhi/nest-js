// import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// @Injectable()
// export class PrismaService extends PrismaClient {
//   constructor() {
//     super({
//       datasources: {
//         db: {
//           url: 'postgresql://root:password@localhost:5434/nest?schema=public',
//         },
//       },
//     });
//   }
// }
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
