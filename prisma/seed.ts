import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const PROFILES = ["Alex", "Sam", "Jo"];

const DEFAULT_GOALS = ["avoided sugar", "no wine"];

// 15-tier ladder per ready_SPIRIT_ANIMALS.md — includes the 3 early tiers
// (days 3, 5, 7) added for future MVP2 feature-gating; only the tiers
// themselves are seeded here, no MVP2 gating logic.
const SPIRIT_TIERS = [
  { name: "Curious Otter", streakDayThreshold: 1 },
  { name: "Chirpy Wren", streakDayThreshold: 3 },
  { name: "Party Panda", streakDayThreshold: 4 },
  { name: "Steady Badger", streakDayThreshold: 5 },
  { name: "Bright Fox", streakDayThreshold: 7 },
  { name: "Smug Pelican", streakDayThreshold: 8 },
  { name: "Zen Sloth", streakDayThreshold: 14 },
  { name: "Dapper Owl", streakDayThreshold: 21 },
  { name: "Cozy Capybara", streakDayThreshold: 30 },
  { name: "Feisty Flamingo", streakDayThreshold: 45 },
  { name: "Steadfast Tortoise", streakDayThreshold: 66 },
  { name: "Radiant Narwhal", streakDayThreshold: 100 },
  { name: "Serene Stag", streakDayThreshold: 150 },
  { name: "Wise Raven", streakDayThreshold: 250 },
  { name: "Legendary Phoenix", streakDayThreshold: 365 },
];

async function main() {
  for (const [index, name] of PROFILES.entries()) {
    const profile = await prisma.profile.upsert({
      where: { name },
      update: {},
      create: { name, sortOrder: index },
    });

    for (const [goalIndex, label] of DEFAULT_GOALS.entries()) {
      const existing = await prisma.binaryGoal.findFirst({
        where: { profileId: profile.id, label },
      });
      if (!existing) {
        await prisma.binaryGoal.create({
          data: { profileId: profile.id, label, sortOrder: goalIndex },
        });
      }
    }
  }

  for (const [index, tier] of SPIRIT_TIERS.entries()) {
    await prisma.spiritTier.upsert({
      where: { name: tier.name },
      update: { streakDayThreshold: tier.streakDayThreshold, sortOrder: index },
      create: { ...tier, sortOrder: index },
    });
  }

  console.log(`Seeded ${PROFILES.length} profiles, goals, and ${SPIRIT_TIERS.length} spirit tiers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
