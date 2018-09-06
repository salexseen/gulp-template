"use strict";

const path = require("path");

const root = path.dirname(path.dirname(__dirname));
const src = path.join(root, "src");
const build = path.join(root, "build");
const tasks = path.join(root, "gulp/tasks");

exports.root = root;
exports.src = src;
exports.build = build;

exports.tasks = [
  {
    sort: 100,
    uses: false,
    name: "markup:html",
    path: path.join(tasks, "html.js"),
    src: path.join(src, "markup/*.html"),
    watch: path.join(src, "markup/**/*.html"),
    build: build,
    browserSyncReload: true
  },
  {
    sort: 100,
    uses: true,
    name: "markup:pug",
    path: path.join(tasks, "pug.js"),
    src: path.join(src, "markup/*.pug"),
    watch: path.join(src, "markup/**/*.pug"),
    build: build,
    browserSyncReload: true
  },
  {
    sort: 50,
    uses: true,
    name: "style:sass",
    path: path.join(tasks, "sass.js"),
    src: path.join(src, "styles/sass/*.{scss,sass}"),
    watch: path.join(src, "styles/sass/**/*.{scss,sass}"),
    build: path.join(build, "css"),
    browserSyncStream: true
  },
  {
    sort: 50,
    uses: true,
    name: "style:less",
    path: path.join(tasks, "less.js"),
    src: path.join(src, "styles/less/*.less"),
    watch: path.join(src, "styles/less/**/*.less"),
    build: path.join(build, "css"),
    browserSyncStream: true
  },
  {
    sort: 50,
    uses: true,
    name: "style:stylus",
    path: path.join(tasks, "stylus.js"),
    src: path.join(src, "styles/stylus/*.styl"),
    watch: path.join(src, "styles/stylus/**/*.styl"),
    build: path.join(build, "css"),
    browserSyncStream: true
  },
  {
    sort: 10,
    uses: true,
    name: "assets",
    path: path.join(tasks, "assets.js"),
    src: path.join(src, "assets/**/*"),
    build: build
  },
  {
    sort: 10,
    uses: true,
    name: "image",
    path: path.join(tasks, "image.js"),
    src: path.join(src, "image/**/*.{jpeg,png,gif,jpg,bmp}"),
    build: path.join(build, "image")
  }
];