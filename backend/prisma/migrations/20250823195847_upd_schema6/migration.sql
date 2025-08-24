/*
  Warnings:

  - Added the required column `lastUpdated` to the `RecurringExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RecurringExpense" ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL;
