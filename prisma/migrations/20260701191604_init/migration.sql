-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_entries" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "good_thing_1" TEXT,
    "good_thing_2" TEXT,
    "good_thing_3" TEXT,
    "to_sort" TEXT,
    "sorted" TEXT,
    "backfilled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "binary_goals" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "binary_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "binary_goal_logs" (
    "id" TEXT NOT NULL,
    "binary_goal_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "achieved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "binary_goal_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spirit_tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streak_day_threshold" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "spirit_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_spirit_unlocks" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "spirit_tier_id" TEXT NOT NULL,
    "unlocked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_spirit_unlocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_name_key" ON "profiles"("name");

-- CreateIndex
CREATE INDEX "daily_entries_profile_id_idx" ON "daily_entries"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_entries_profile_id_date_key" ON "daily_entries"("profile_id", "date");

-- CreateIndex
CREATE INDEX "binary_goals_profile_id_idx" ON "binary_goals"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "binary_goal_logs_binary_goal_id_date_key" ON "binary_goal_logs"("binary_goal_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "spirit_tiers_name_key" ON "spirit_tiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "profile_spirit_unlocks_profile_id_spirit_tier_id_key" ON "profile_spirit_unlocks"("profile_id", "spirit_tier_id");

-- AddForeignKey
ALTER TABLE "daily_entries" ADD CONSTRAINT "daily_entries_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binary_goals" ADD CONSTRAINT "binary_goals_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binary_goal_logs" ADD CONSTRAINT "binary_goal_logs_binary_goal_id_fkey" FOREIGN KEY ("binary_goal_id") REFERENCES "binary_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_spirit_unlocks" ADD CONSTRAINT "profile_spirit_unlocks_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_spirit_unlocks" ADD CONSTRAINT "profile_spirit_unlocks_spirit_tier_id_fkey" FOREIGN KEY ("spirit_tier_id") REFERENCES "spirit_tiers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
