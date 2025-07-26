-- CreateTable
CREATE TABLE `Coin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `change1h` VARCHAR(191) NOT NULL,
    `change24h` VARCHAR(191) NOT NULL,
    `change7d` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Coin_symbol_key`(`symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
