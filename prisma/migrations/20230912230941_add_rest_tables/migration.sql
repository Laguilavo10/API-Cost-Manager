/*
  Warnings:

  - You are about to drop the column `userIdUser` on the `Balance` table. All the data in the column will be lost.
  - You are about to alter the column `earnings` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `expenses` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `userId` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Balance` DROP FOREIGN KEY `Balance_userIdUser_fkey`;

-- AlterTable
ALTER TABLE `Balance` DROP COLUMN `userIdUser`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `earnings` DOUBLE NULL,
    MODIFY `expenses` DOUBLE NULL;

-- CreateTable
CREATE TABLE `Movement` (
    `idMovement` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `earnings` DOUBLE NULL,
    `expenses` DOUBLE NULL,
    `typeId` INTEGER NOT NULL,

    PRIMARY KEY (`idMovement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeMovement` (
    `idTypeMovement` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTypeMovement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Balance` ADD CONSTRAINT `Balance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movement` ADD CONSTRAINT `Movement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movement` ADD CONSTRAINT `Movement_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `TypeMovement`(`idTypeMovement`) ON DELETE RESTRICT ON UPDATE CASCADE;
