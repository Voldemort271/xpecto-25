/*
  Warnings:

  - Added the required column `levels` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_statement` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rules` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "levels" TEXT NOT NULL,
ADD COLUMN     "problem_statement" TEXT NOT NULL,
ADD COLUMN     "rules" TEXT NOT NULL;
