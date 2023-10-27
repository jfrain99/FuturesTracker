/*
  Warnings:

  - You are about to drop the column `stat` on the `Bet` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bet` DROP COLUMN `stat`,
    ADD COLUMN `type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `BetTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
