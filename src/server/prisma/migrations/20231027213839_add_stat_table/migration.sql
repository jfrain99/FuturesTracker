-- CreateTable
CREATE TABLE `Stat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bet_id` INTEGER NOT NULL,
    `amount` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Stat_id_key`(`id`),
    UNIQUE INDEX `Stat_bet_id_key`(`bet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stat` ADD CONSTRAINT `Stat_bet_id_fkey` FOREIGN KEY (`bet_id`) REFERENCES `Bet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
