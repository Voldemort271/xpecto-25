/*
  Warnings:

  - You are about to drop the `_ExposToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProniteToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToWorkshops` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExposToUser" DROP CONSTRAINT "_ExposToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExposToUser" DROP CONSTRAINT "_ExposToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProniteToUser" DROP CONSTRAINT "_ProniteToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProniteToUser" DROP CONSTRAINT "_ProniteToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkshops" DROP CONSTRAINT "_UserToWorkshops_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkshops" DROP CONSTRAINT "_UserToWorkshops_B_fkey";

-- DropTable
DROP TABLE "_ExposToUser";

-- DropTable
DROP TABLE "_ProniteToUser";

-- DropTable
DROP TABLE "_UserToWorkshops";

-- CreateTable
CREATE TABLE "_EventDetailsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventDetailsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventDetailsToUser_B_index" ON "_EventDetailsToUser"("B");

-- AddForeignKey
ALTER TABLE "_EventDetailsToUser" ADD CONSTRAINT "_EventDetailsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDetailsToUser" ADD CONSTRAINT "_EventDetailsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
