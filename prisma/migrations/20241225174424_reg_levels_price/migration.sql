-- CreateTable
CREATE TABLE "RegistrationLevel" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "labelling" TEXT NOT NULL,
    "eventDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistrationLevel_pkey" PRIMARY KEY ("eventDetailsId")
);

-- AddForeignKey
ALTER TABLE "RegistrationLevel" ADD CONSTRAINT "RegistrationLevel_eventDetailsId_fkey" FOREIGN KEY ("eventDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
