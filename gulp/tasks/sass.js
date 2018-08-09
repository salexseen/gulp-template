"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function({ name, src, build, env, browserSyncStream } = {}){
    let browserSync;
    let processors = [
        require("autoprefixer")()
    ];

    if (env.dev){
        browserSync = require("browser-sync").get("GulpServer");
    }

    if (env.production){
        processors.push(
            require("cssnano")()
        );
    }

    return function(callback){
        const pipes = [
            $.plumber({
                errorHandler: $.notify.onError(function(error){
                    return {
                        title: name,
                        message: error.message
                    };
                })
            }),
            $.if(env.sourcemaps, $.sourcemaps.init()),
            $.sass(),
            $.postcss(processors),
            $.if(env.sourcemaps, $.sourcemaps.write()),
            gulp.dest(build),
        ];

        if (browserSync && browserSyncStream){
            pipes.push(browserSync.stream())
        }

        const streamCreate = function(stream, pipes){
            pipes.forEach(pipe => {
                stream = stream.pipe(pipe);
            });

            return stream;
        };

        return streamCreate(
            gulp.src(src),
            pipes
        );

    };
};