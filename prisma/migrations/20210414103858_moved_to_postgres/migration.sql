-- CreateTable
CREATE TABLE "shortenedUrls" (
    "short_id" TEXT NOT NULL,
    "full_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,

    PRIMARY KEY ("short_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortenedUrls.short_id_unique" ON "shortenedUrls"("short_id");

-- CreateIndex
CREATE UNIQUE INDEX "shortenedUrls.full_url_unique" ON "shortenedUrls"("full_url");

-- CreateIndex
CREATE UNIQUE INDEX "shortenedUrls.short_url_unique" ON "shortenedUrls"("short_url");
