/*
  Warnings:

  - You are about to drop the `diabloque` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `horario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `diabloque` DROP FOREIGN KEY `DiaBloque_horarioId_fkey`;

-- DropTable
DROP TABLE `diabloque`;

-- DropTable
DROP TABLE `horario`;

-- CreateTable
CREATE TABLE `Peluche` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
