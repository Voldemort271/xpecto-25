/*
  Warnings:

  - You are about to drop the column `name` on the `Expos` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Workshops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expos" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Workshops" DROP COLUMN "name";
