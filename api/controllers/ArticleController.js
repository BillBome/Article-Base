/**
 * ArticleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async function (req, res) {
    Article.find({}).exec(function (err, article) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("pages/list", { article: article });
    });
  },

  create: async function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Article.create({ title: title, body: body }).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.redirect("/article/list");
    });
  },

  delete: async function (req, res) {
    Article.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.redirect("/article/list");
    });
    return false;
  },

  edit: async function (req, res) {
    Article.findOne({ id: req.params.id }).exec(function (err, article) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("pages/edit", { article: article });
    });
  },

  update: async function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Article.update({ id: req.params.id }, { title: title, body: body }).exec(
      function (err) {
        if (err) {
          res.send(500, { error: "Database Error" });
        }
        res.redirect("/article/list");
      }
    );
    return false;
  },
};
