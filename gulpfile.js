"use strict";

const gulp = require("gulp");
const config = require("./gulp/tools/config");
const env = require("./gulp/tools/env")("dev", ["dev", "production", "sourcemaps"]);

let browserSync;
if (env.dev)
  browserSync = require("browser-sync").create("GulpServer");

let tasks = [];
let tasksResult = [];
let tasksSort = {};
let watches = [];

function lazyLoadTask(task) {
  if (task.uses) {
    let stream = require(task.path)({
      task,
      env
    });

    gulp.task(task.name, stream);

    tasks.push({
      sort: task.sort,
      name: task.name
    });

    if (task.watch && env.dev) {
      watches.push({
        watch: task.watch,
        name: task.name,
        browserSyncReload: task.browserSyncReload
      });
    }
  }
}

if (Array.isArray(config.tasks)) {
  for (let i = 0; i < config.tasks.length; i++) {
    lazyLoadTask(config.tasks[i]);
  }
}

tasks.forEach(task => {
  if (!(task.sort in tasksSort))
    tasksSort[task.sort] = [];

  tasksSort[task.sort].push(task.name);
});

Object.keys(tasksSort)
  .map(sort => Number(sort))
  .sort((a, b) => a > b)
  .forEach(sort => {
    let tasks = tasksSort[sort];
    let taskName = `group:${sort}`;
    gulp.task(taskName, gulp.parallel.apply(gulp, tasks));
    tasksResult.push(taskName);
  });

if (env.dev) {
  gulp.task("watch", function () {

    if (browserSync) {
      browserSync.init({
        server: {
          baseDir: "./build"
        }
      });
    }

    watches.forEach(function ({ watch, name, browserSyncReload }) {
      if (browserSync && browserSyncReload) {
        gulp.watch(watch, gulp.series(name)).on("change", browserSync.reload);
      } else {
        gulp.watch(watch, gulp.series(name));
      }
    });
  });

  tasksResult.push("watch");
}

gulp.task("clean", function () {
  return require("del")([
    config.build
  ]);
});

tasksResult.unshift("clean");

gulp.task("default", gulp.series.apply(gulp, tasksResult));