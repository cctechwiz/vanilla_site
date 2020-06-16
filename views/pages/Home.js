import HtmlBuilder from '../../services/HtmlBuilder.js'
import Repository from '../../services/Repository.js'

let ListRecipes = {
  render : async () => {
    console.log("Home render");
    let view = /*html*/`
      <section>
        <h1>Home</h1>

        <h1>Categories</h1>
        <div id="home-categories"></div>

        <h1>All Recipes</h1>
        <div id="home-recipes"></div>
      </section>
    `
    return view;
  }
  , after_render : async () => {
    console.log("Home after_render");

    let allCategories = Repository.getAllCategories();
    console.log(allCategories === Repository.categories);
    console.log(allCategories);
    let categoriesSection = document.getElementById("home-categories")
    allCategories.forEach(category => {
      HtmlBuilder.addChild(categoriesSection, "div", category);
    });

    let allRecipes = await Repository.getAllRecipes();
    console.log(allRecipes === Repository.recipes);
    console.log(allRecipes);
    let recipesSection = document.getElementById("home-recipes")
    for(var recipeId in allRecipes) {
      //TODO: Turn this into a card instead of a link and br
      let link = HtmlBuilder.addChild(recipesSection, "a", allRecipes[recipeId].title);
      link.href = `/#/view/${recipeId}`;
      HtmlBuilder.addChild(recipesSection, "br", "");
    };
  }

};

export default ListRecipes;