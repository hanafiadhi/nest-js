/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrderDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_user_Id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customer_id_seq";

-- AlterTable
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "order_id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OrderDetails_id_seq";

-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Orders_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "category_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductCategory_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
