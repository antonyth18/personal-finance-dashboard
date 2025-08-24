/*
  Warnings:

  - Added the required column `recurringAmount` to the `RecurringExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RecurringExpense" ADD COLUMN     "recurringAmount" DOUBLE PRECISION NOT NULL;
