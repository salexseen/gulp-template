"use strict";

const buffer = require("vinyl-buffer");
const merge = require("merge-stream");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function ({ env, task }) {
  return function (callback) {
    let spriteData = gulp.src(task.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError(function (error) {
          return {
            title: task.name,
            message: error.message
          };
        })
      }))
      .pipe($.spritesmith(Object.assign({
        imgName: "sprite-image.png",
        cssName: "sprite-image.scss",
        imgPath: "../image/sprite-image.png",
        retinaImgName: "sprite-image@2x.png",
        retinaImgPath: "../image/sprite-image@2x.png",
        padding: 15
      }, task.spritesmith)));

    let imgStream = spriteData.img
      .pipe(buffer())
      .pipe($.if(env.production, $.imagemin({
        verbose: true
      })))
      .pipe(gulp.dest(task.build));

    let cssStream = spriteData.css
      .pipe(gulp.dest(task.style));

    return merge(imgStream, cssStream);
  };
};