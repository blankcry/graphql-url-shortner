/*
  Warnings:

  - A unique constraint covering the columns `[full_url]` on the table `shortenedUrls` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[short_url]` on the table `shortenedUrls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shortenedUrls.full_url_unique" ON "shortenedUrls"("full_url");

-- CreateIndex
CREATE UNIQUE INDEX "shortenedUrls.short_url_unique" ON "shortenedUrls"("short_url");
