/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Movement` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Balance_userId_key` ON `Balance`(`userId`);
