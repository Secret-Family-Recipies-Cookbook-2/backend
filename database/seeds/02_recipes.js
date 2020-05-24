
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          id: 1, title: 'Brownie in a Mug', 
          source: 'Tasty',
          ingredients:
           "4 tablespoons flour,3 tablespoons sugar, 2 tablespoons cocoa powder,½ teaspoon baking powder,3 tablespoons milk,1 tablespoon oil, vegetable or canola,1 teaspoon vanilla extract,1 tablespoon chocolate hazelnut spread, plus more for topping",
          instructions:  "12-ounce (375 ml) mug or larger, mix all ingredients (except the chocolate hazelnut spread) until just combined. Once combined, spoon the chocolate hazelnut spread on top of the batter. Microwave on high for 90 seconds to 2 minutes, watching to make sure it doesn’t spill over (depending on the size of the mug). Let cool one minute before eating. Top with additional chocolate hazelnut spread and powdered sugar (optional).",
          category: 'desert',
          user_id: 1
        },

        {
          id: 2, title: 'Chicken Alfredo Pasta',
          source: 'Pinterest',
          ingredients: 'chicken, alfredo sauce, pasta',
          instructions: 'cook chicken, cook pasta, and combine all of ingredients including the sauce into the pan',
          category: 'dinner',
          user_id: 2
        }

      
      ]);
    });
};
