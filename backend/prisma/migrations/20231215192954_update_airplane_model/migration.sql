/*
  Warnings:

  - You are about to drop the column `numberOfSeats` on the `Airplane` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Airplane` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airplane" DROP COLUMN "numberOfSeats",
ADD COLUMN     "capacity" INTEGER NOT NULL;
