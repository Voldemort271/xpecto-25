-- CreateTable
CREATE TABLE "_invitations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_invitations_AB_unique" ON "_invitations"("A", "B");

-- CreateIndex
CREATE INDEX "_invitations_B_index" ON "_invitations"("B");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "_invitations" ADD CONSTRAINT "_invitations_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_invitations" ADD CONSTRAINT "_invitations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
