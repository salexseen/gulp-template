"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function ({ env, task }) {
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
      .pipe($.if(env.production, $.imagemin({
        verbose: true
      })))
      .pipe(gulp.dest(task.build));
  };
};