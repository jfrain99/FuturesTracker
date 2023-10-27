-- CreateTable
CREATE TABLE `BetTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('PASSING', 'RUSHING', 'RECEIVING', 'DEFENSE', 'SCORING') NOT NULL,

    UNIQUE INDEX `BetTypes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
