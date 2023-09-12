/*
  Warnings:

  - You are about to drop the column `earnings` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `expenses` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movement` DROP COLUMN `earnings`,
    DROP COLUMN `expenses`,
    DROP COLUMN `month`,
    DROP COLUMN `year`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` DOUBLE NOT NULL;
