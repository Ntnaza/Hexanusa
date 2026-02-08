-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `heroTitle` TEXT NOT NULL,
    `heroDesc` TEXT NOT NULL,
    `aboutTitle` TEXT NOT NULL,
    `aboutDesc` TEXT NOT NULL,
    `aboutImage` TEXT NOT NULL,
    `contactEmail` VARCHAR(191) NOT NULL,
    `contactPhone` VARCHAR(191) NOT NULL,
    `contactAddress` TEXT NOT NULL,
    `contactMaps` TEXT NOT NULL,
    `socialIg` VARCHAR(191) NULL,
    `socialLi` VARCHAR(191) NULL,
    `socialGh` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
