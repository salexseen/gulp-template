"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function ({ env, task }) {
  let processors = [
    require("autoprefixer")()
  ];

  if (env.production) {
    processors.push(
      require("cssnano")()
    );
  }

  return function (callback) {
    return gulp.src(task.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError(function (error) {
          return {
            title: task.name,
            message: error.message
          };
        })
      }))
      .pipe($.if(env.sourcemaps, $.sourcemaps.init()))
      .pipe($.less())
      .pipe($.postcss(processors))
      .pipe($.if(env.sourcemaps, $.sourcemaps.write(".")))
      .pipe(gulp.dest(task.build));
  };
};