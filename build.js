const fs = require("fs");
const Handlebars = require("handlebars");

fs.readFile("src/index.html", "utf8", function(err, source) {
  const template = Handlebars.compile(source);
  const context = { title: "My New Post", body: "This is my first post!" };
  const html = template(context);
  fs.writeFile("dist/index.html", html);
});
