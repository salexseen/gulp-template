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
    src: path.join(src, "styles/*.{scss,sass}"),
    watch: path.join(src, "styles/**/*.{scss,sass}"),
    build: path.join(build, "css"),
    browserSyncStream: true
  },
  {
    sort: 50,
    uses: false,
    name: "style:less",
    path: path.join(tasks, "less.js"),
    src: path.join(src, "styles/less/*.less"),
    watch: path.join(src, "styles/less/**/*.less"),
    build: path.join(build, "css"),
    browserSyncStream: true
  },
  {
    sort: 50,
    uses: false,
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
    src: [
      path.join(src, "image/**/*.{jpeg,png,gif,jpg,bmp}"),
      path.join("!", src, "image/sprite/*")
    ],
    build: path.join(build, "image")
  },
  {
    sort: 10,
    uses: true,
    name: "sprite:image",
    path: path.join(tasks, "sprite-image.js"),
    src: path.join(src, "image/sprite/*.{jpeg,png,gif,jpg,bmp}"),
    build: path.join(build, "image"),
    style: path.join(src, "styles/sprite"),
    spritesmith: {
      retinaSrcFilter: path.join(src, "image/sprite/*@2x.{jpeg,png,gif,jpg,bmp}")
    }
  },
  {
    sort: 10,
    uses: true,
    name: "sprite:svg",
    path: path.join(tasks, "sprite-svg.js"),
    src: path.join(src, "image/svg/**/*.svg"),
    build: path.join(build, "image/svg"),
    style: path.join(src, "styles/sprite"),
    cssTemplate: path.join(src, "styles/sprite/sprite-svg-css-template.scss")
  }
];