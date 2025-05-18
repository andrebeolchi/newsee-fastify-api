/*
  Warnings:

  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'student';
