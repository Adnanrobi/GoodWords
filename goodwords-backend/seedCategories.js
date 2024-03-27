const { PrismaClient } = require("@prisma/client");

async function seedCategories() {
  const prisma = new PrismaClient();

  try {
    const categories = [
      "TECHNOLOGY",
      "TRAVEL",
      "FOOD",
      "LIFESTYLE",
      "FASHION",
      "ENTERTAINMENT",
      "DIY",
      "BUSINESS",
      "SPORTS",
    ];

    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category,
        },
      });
    }

    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
