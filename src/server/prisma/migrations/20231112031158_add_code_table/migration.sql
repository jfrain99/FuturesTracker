-- AlterTable
ALTER TABLE `Bet` ADD COLUMN `code_id` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Code` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Code_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_code_id_fkey` FOREIGN KEY (`code_id`) REFERENCES `Code`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
