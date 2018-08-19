"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function ({ name, src, build, env } = {}) {
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
      .pipe($.pug({
        pretty: true
      }))
      .pipe(gulp.dest(build));
  };
};