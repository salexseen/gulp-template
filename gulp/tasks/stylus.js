"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function ({ name, src, build, env } = {}) {
  let processors = [
    require("autoprefixer")()
  ];

  if (env.production) {
    processors.push(
      require("cssnano")()
    );
  }

  return function (callback) {
    return gulp.src(src)
      .pipe($.plumber({
        errorHandler: $.notify.onError(function (error) {
          return {
            title: name,
            message: error.message
          };
        })
      }))
      .pipe($.if(env.sourcemaps, $.sourcemaps.init()))
      .pipe($.stylus())
      .pipe($.postcss(processors))
      .pipe($.if(env.sourcemaps, $.sourcemaps.write()))
      .pipe(gulp.dest(build));
  };
};