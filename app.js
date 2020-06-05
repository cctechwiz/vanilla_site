'use strict';

import ListRecipes from './views/pages/ListRecipes.js'
import NewRecipe from './views/pages/NewRecipe.js'
import Viewrecipe from './views/pages/ViewRecipe.js'
import EditRecipe from './views/pages/EditRecipe.js'

import Error404 from './views/pages/Error404.js'

import UrlParser from './services/UrlParser.js'

//Note: The URL must start with /#/
const routes = {
    '/'         : ListRecipes
  , '/new'      : NewRecipe
  , '/view/:id' : Viewrecipe
  , '/edit/:id' : EditRecipe
};

const router = async () => {
  console.log('Hello, from app.js router!');

  const content = null || document.getElementById('page_container');

  let request = UrlParser.getRequest();
  console.log(request);
  let parsedUrl = UrlParser.getRoutableUrl(request);
  console.log(parsedUrl);
  let page = routes[parsedUrl] ? routes[parsedUrl] : Error404;

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);