/*
  Warnings:

  - You are about to drop the column `username` on the `account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `target` DROP FOREIGN KEY `Target_accountId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `username`,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `refreshTokenJWT` VARCHAR(191) NULL,
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `roommessage` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sessionaccount` MODIFY `accessTokenJWT` VARCHAR(191) NULL,
    MODIFY `refreshTokenJWT` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `target` MODIFY `content` VARCHAR(191) NULL,
    MODIFY `idTargetAccount` VARCHAR(191) NULL,
    MODIFY `accountId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Target` ADD CONSTRAINT `Target_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
