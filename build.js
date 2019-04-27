const fs = require("fs");
const Handlebars = require("handlebars");

const makeDirectory = directoryName => {
  try {
    fs.mkdirSync(directoryName, 0744);
  } catch (e) {}
};

const posts = {
  a: {
    title: "How to win friends and influence them",
    body: "foo bar baz"
  },
  b: {
    title: "The Bible",
    body: "foo bar baz"
  },
  c: {
    title: "Alumni Warwick",
    body: "foo bar baz"
  }
};

const getPostLinks = postFilenames => {
  return postFilenames.map(filename => ({
    link: `/posts/${filename}`,
    name: filename.split(".")[0]
  }));
};

const compilePosts = postFilenames => {
  console.log("Compiling posts...");
  makeDirectory("dist/posts");
  postFilenames.forEach(postFilename => {
    const source = fs.readFileSync(`src/posts/${postFilename}`, "utf8");
    const template = Handlebars.compile(source);
    const postName = postFilename.split(".")[0];
    const context = posts[postName];
    const html = template(context);
    fs.writeFile(`dist/posts/${postFilename}`, html);
  });
};

console.log("Compiling index...");
const source = fs.readFileSync("src/index.html", "utf8");
const template = Handlebars.compile(source);
const postFilenames = fs.readdirSync("src/posts");
const postLinks = getPostLinks(postFilenames);
const context = { title: "My New Post", postLinks };
const html = template(context);
makeDirectory("dist");
fs.writeFile("dist/index.html", html);
compilePosts(postFilenames);
