-- AlterTable
ALTER TABLE "binary_goals" ADD COLUMN     "archived_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "goal_milestone_tiers" (
    "id" TEXT NOT NULL,
    "day_threshold" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "goal_milestone_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_milestone_unlocks" (
    "id" TEXT NOT NULL,
    "binary_goal_id" TEXT NOT NULL,
    "goal_milestone_tier_id" TEXT NOT NULL,
    "unlocked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goal_milestone_unlocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "goal_milestone_tiers_day_threshold_key" ON "goal_milestone_tiers"("day_threshold");

-- CreateIndex
CREATE UNIQUE INDEX "goal_milestone_unlocks_binary_goal_id_goal_milestone_tier_i_key" ON "goal_milestone_unlocks"("binary_goal_id", "goal_milestone_tier_id");

-- AddForeignKey
ALTER TABLE "goal_milestone_unlocks" ADD CONSTRAINT "goal_milestone_unlocks_binary_goal_id_fkey" FOREIGN KEY ("binary_goal_id") REFERENCES "binary_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_milestone_unlocks" ADD CONSTRAINT "goal_milestone_unlocks_goal_milestone_tier_id_fkey" FOREIGN KEY ("goal_milestone_tier_id") REFERENCES "goal_milestone_tiers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
