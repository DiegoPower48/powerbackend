/*
  Warnings:

  - You are about to drop the column `rank` on the `coin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `coin` table. All the data in the column will be lost.
  - You are about to drop the column `volume24h` on the `coin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[symbol]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `change1h` to the `Coin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Coin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coin` DROP COLUMN `rank`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `volume24h`,
    ADD COLUMN `change1h` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Coin_symbol_key` ON `Coin`(`symbol`);
