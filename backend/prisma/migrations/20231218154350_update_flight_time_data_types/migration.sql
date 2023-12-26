/*
  Warnings:

  - Changed the type of `arrivalTime` on the `Flight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `departureTime` on the `Flight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "arrivalTime",
ADD COLUMN     "arrivalTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "departureTime",
ADD COLUMN     "departureTime" TIMESTAMP(3) NOT NULL;
