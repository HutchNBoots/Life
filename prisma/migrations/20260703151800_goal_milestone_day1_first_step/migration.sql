-- Replace the day-3 milestone tier with day-1 "First Step" in place (same
-- row/id), so any already-earned unlocks are preserved rather than orphaned.
UPDATE "goal_milestone_tiers"
SET "day_threshold" = 1, "name" = 'First Step', "sort_order" = 0
WHERE "day_threshold" = 3;
