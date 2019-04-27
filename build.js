const fs = require("fs");
const Handlebars = require("handlebars");

const makeDirectory = directoryName => {
  try {
    fs.mkdirSync(directoryName, 0744);
  } catch (e) {}
};

const getPostLinks = posts => {
  return posts.map(post => ({
    link: `/posts/${post.title}.html`,
    name: post.title
  }));
};

const compilePosts = posts => {
  console.log("Compiling posts...");
  makeDirectory("dist/posts");
  const postSource = fs.readFileSync(`src/post.html`, "utf8");
  const template = Handlebars.compile(postSource);
  posts.forEach(post => {
    const html = template(post);
    fs.writeFile(`dist/posts/${post.title}.html`, html);
  });
};

console.log("Parsing posts...");
const postsJson = fs.readFileSync("src/posts.json", "utf8");
const posts = JSON.parse(postsJson);
console.log("Compiling index...");
const source = fs.readFileSync("src/index.html", "utf8");
const template = Handlebars.compile(source);
const postLinks = getPostLinks(posts);
const context = { title: "Work In Progress", postLinks };
const html = template(context);
makeDirectory("dist");
fs.writeFile("dist/index.html", html);
compilePosts(posts);
