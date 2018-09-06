"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function ({ env, task }) {
  let browserSync;
  let processors = [
    require("autoprefixer")()
  ];

  if (env.dev) {
    browserSync = require("browser-sync").get("GulpServer");
  }

  if (env.production) {
    processors.push(
      require("cssnano")()
    );
  }

  return function (callback) {
    const pipes = [
      $.plumber({
        errorHandler: $.notify.onError(function (error) {
          return {
            title: task.name,
            message: error.message
          };
        })
      }),
      $.if(env.sourcemaps, $.sourcemaps.init()),
      $.sass(),
      $.postcss(processors),
      $.if(env.sourcemaps, $.sourcemaps.write(".")),
      gulp.dest(task.build),
    ];

    if (browserSync && task.browserSyncStream) {
      pipes.push(browserSync.stream())
    }

    const streamCreate = function (stream, pipes) {
      pipes.forEach(pipe => {
        stream = stream.pipe(pipe);
      });

      return stream;
    };

    return streamCreate(
      gulp.src(task.src),
      pipes
    );

  };
};