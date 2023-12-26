/*
  Warnings:

  - You are about to drop the `AirPlane` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_airPlaneId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_airPlaneId_fkey";

-- DropTable
DROP TABLE "AirPlane";

-- CreateTable
CREATE TABLE "Airplane" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "numberOfSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airPlaneId_fkey" FOREIGN KEY ("airPlaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
