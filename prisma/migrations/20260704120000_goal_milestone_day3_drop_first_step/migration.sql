-- Drop the day-1 "First Step" milestone tier and revert it to day 3, in
-- place (same row/id), mirroring how it was originally moved from 3 to 1 --
-- so any already-earned "First Step" unlock is preserved as a day-3 unlock
-- rather than being orphaned.
UPDATE "goal_milestone_tiers"
SET "day_threshold" = 3, "name" = NULL, "sort_order" = 0
WHERE "day_threshold" = 1;
