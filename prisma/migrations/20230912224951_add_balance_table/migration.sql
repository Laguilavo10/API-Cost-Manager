/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `idUser` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `imgProfile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idUser` VARCHAR(191) NOT NULL,
    ADD COLUMN `imgProfile` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`idUser`);

-- CreateTable
CREATE TABLE `Balance` (
    `idBalance` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `imgProfile` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `userIdUser` VARCHAR(191) NULL,

    UNIQUE INDEX `Balance_email_key`(`email`),
    UNIQUE INDEX `Balance_username_key`(`username`),
    PRIMARY KEY (`idBalance`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Balance` ADD CONSTRAINT `Balance_userIdUser_fkey` FOREIGN KEY (`userIdUser`) REFERENCES `User`(`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
