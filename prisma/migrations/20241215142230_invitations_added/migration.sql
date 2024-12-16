/*
  Warnings:

  - The primary key for the `InviteToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InviteToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "InviteToken_token_key";

-- AlterTable
ALTER TABLE "InviteToken" DROP CONSTRAINT "InviteToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "InviteToken_pkey" PRIMARY KEY ("token");

-- AlterTable
ALTER TABLE "_CompetitionToOrganization" ADD CONSTRAINT "_CompetitionToOrganization_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CompetitionToOrganization_AB_unique";

-- AlterTable
ALTER TABLE "_CompetitionToSponsor" ADD CONSTRAINT "_CompetitionToSponsor_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CompetitionToSponsor_AB_unique";

-- AlterTable
ALTER TABLE "_EventToOrganization" ADD CONSTRAINT "_EventToOrganization_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_EventToOrganization_AB_unique";

-- AlterTable
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_EventToSponsor_AB_unique";

-- AlterTable
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_EventToUser_AB_unique";

-- AlterTable
ALTER TABLE "_ProniteToUser" ADD CONSTRAINT "_ProniteToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProniteToUser_AB_unique";

-- AlterTable
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TeamToUser_AB_unique";
