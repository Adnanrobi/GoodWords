const CategoryResolver = {
  Query: {
    categories: async () => {
      // Retrieve all categories from the database
      const categories = await prisma.category.findMany();
      return categories;
    },
  },
};

module.exports = CategoryResolver;
