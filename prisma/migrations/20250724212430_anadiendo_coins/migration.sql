/*
  Warnings:

  - You are about to drop the `webdata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `webdata`;

-- CreateTable
CREATE TABLE `Coin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rank` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `change24h` VARCHAR(191) NOT NULL,
    `marketCap` VARCHAR(191) NOT NULL,
    `volume24h` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
