-- CreateTable
CREATE TABLE "shortenedUrls" (
    "short_id" TEXT NOT NULL PRIMARY KEY,
    "full_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "shortenedUrls.short_id_unique" ON "shortenedUrls"("short_id");
