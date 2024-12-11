-- AlterTable
ALTER TABLE "User" ADD COLUMN     "college_name" TEXT NOT NULL DEFAULT 'Individual';

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "prize_money" INTEGER NOT NULL DEFAULT 0,
    "leaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "prizepool" INTEGER NOT NULL DEFAULT 0,
    "max_team_size" INTEGER NOT NULL DEFAULT 5,
    "min_team_size" INTEGER NOT NULL DEFAULT 1,
    "competitionDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "teamId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "ranking" INTEGER,
    "submissions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("teamId","competitionId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "eventDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDetails" (
    "id" TEXT NOT NULL,
    "begin_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pronite" (
    "id" TEXT NOT NULL,
    "max_capacity" INTEGER NOT NULL DEFAULT 1000,
    "ticket_price" INTEGER NOT NULL DEFAULT 0,
    "proniteDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pronite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompetitionToOrganization" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompetitionToSponsor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToOrganization" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToSponsor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProniteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Competition_competitionDetailsId_key" ON "Competition"("competitionDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventDetailsId_key" ON "Event"("eventDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Pronite_proniteDetailsId_key" ON "Pronite"("proniteDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "_CompetitionToOrganization_AB_unique" ON "_CompetitionToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_CompetitionToOrganization_B_index" ON "_CompetitionToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompetitionToSponsor_AB_unique" ON "_CompetitionToSponsor"("A", "B");

-- CreateIndex
CREATE INDEX "_CompetitionToSponsor_B_index" ON "_CompetitionToSponsor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToOrganization_AB_unique" ON "_EventToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToOrganization_B_index" ON "_EventToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSponsor_AB_unique" ON "_EventToSponsor"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSponsor_B_index" ON "_EventToSponsor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProniteToUser_AB_unique" ON "_ProniteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProniteToUser_B_index" ON "_ProniteToUser"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_competitionDetailsId_fkey" FOREIGN KEY ("competitionDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventDetailsId_fkey" FOREIGN KEY ("eventDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pronite" ADD CONSTRAINT "Pronite_proniteDetailsId_fkey" FOREIGN KEY ("proniteDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionToOrganization" ADD CONSTRAINT "_CompetitionToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionToOrganization" ADD CONSTRAINT "_CompetitionToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionToSponsor" ADD CONSTRAINT "_CompetitionToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionToSponsor" ADD CONSTRAINT "_CompetitionToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToOrganization" ADD CONSTRAINT "_EventToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToOrganization" ADD CONSTRAINT "_EventToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProniteToUser" ADD CONSTRAINT "_ProniteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pronite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProniteToUser" ADD CONSTRAINT "_ProniteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
