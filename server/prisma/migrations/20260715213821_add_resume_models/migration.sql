-- CreateEnum
CREATE TYPE "ResumeStatus" AS ENUM ('processing', 'analyzed', 'failed');

-- CreateEnum
CREATE TYPE "SuggestionCategory" AS ENUM ('formatting', 'content', 'keywords', 'structure');

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT,
    "status" "ResumeStatus" NOT NULL DEFAULT 'processing',
    "atsScore" INTEGER,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSuggestion" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "category" "SuggestionCategory" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ResumeSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_key" ON "Resume"("userId");

-- CreateIndex
CREATE INDEX "ResumeSuggestion_resumeId_idx" ON "ResumeSuggestion"("resumeId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSuggestion" ADD CONSTRAINT "ResumeSuggestion_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
