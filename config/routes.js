/**
 * Route Mappings
 * (sails.config.routes)
 */

module.exports.routes = {
  "/": { view: "pages/homepage" },
  "GET /article/list": "ArticleController.list",
  "GET /article/add": { view: "pages/add" },
  "POST /article/create": "ArticleController.create",
  "POST /article/delete/:id": "ArticleController.delete",
  "GET /article/edit/:id": "ArticleController.edit",
  "POST /article/update/:id": "ArticleController.update",
  "GET /user/signup": { view: "pages/signup" },
  "POST /user/signup": "UserController.signup",
  "GET /user/signin": { view: "pages/signin" },
  "POST /user/signin": "UserController.signin",
  "GET /user/logout": "UserController.logout",
};
