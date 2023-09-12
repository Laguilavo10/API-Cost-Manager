/*
  Warnings:

  - You are about to drop the column `email` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `imgProfile` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Balance` table. All the data in the column will be lost.
  - Added the required column `month` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Balance_email_key` ON `Balance`;

-- DropIndex
DROP INDEX `Balance_username_key` ON `Balance`;

-- AlterTable
ALTER TABLE `Balance` DROP COLUMN `email`,
    DROP COLUMN `idUser`,
    DROP COLUMN `imgProfile`,
    DROP COLUMN `name`,
    DROP COLUMN `username`,
    ADD COLUMN `earnings` INTEGER NULL,
    ADD COLUMN `expenses` INTEGER NULL,
    ADD COLUMN `month` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;
