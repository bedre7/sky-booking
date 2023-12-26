/*
  Warnings:

  - You are about to drop the column `airPlaneId` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `airPlaneId` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `airplaneId` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airplaneId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_airPlaneId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_airPlaneId_fkey";

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "airPlaneId",
ADD COLUMN     "airplaneId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "airPlaneId",
ADD COLUMN     "airplaneId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
