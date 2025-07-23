-- CreateTable
CREATE TABLE `Block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiaBloque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` VARCHAR(191) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `horarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DiaBloque` ADD CONSTRAINT `DiaBloque_horarioId_fkey` FOREIGN KEY (`horarioId`) REFERENCES `Horario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
