-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
