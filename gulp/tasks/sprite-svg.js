"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")({
  rename: {
    'gulp-svg-sprite': 'svgSprite'
  }
});

module.exports = function ({ env, task }) {
  let config = {
    mode: {
      symbol: {
        dest: ".",
        sprite: "sprite-svg-symbol.svg",
      },
      css: {
        dest: ".",
        sprite: "sprite-svg-css.svg",
        prefix: ".svg-icon-%s",
        bust: false,
        render: {
          scss: {
            dest: "sprite-svg-css.scss",
            template: task.cssTemplate
          }
        }
      }
    }
  };

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
      .pipe($.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.svgSprite(config))
      .pipe($.if("*.scss", gulp.dest(task.style), gulp.dest(task.build)));
  };
};