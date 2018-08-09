"use strict";

const gulp = require("gulp");
const config = require("./gulp/tools/config");
const env = require("./gulp/tools/env")("dev", ["dev", "production", "sourcemaps"]);

if (env.dev){
    var browserSync = require("browser-sync").create("GulpServer");
}

let tasks = [];
let watches = [];

function lazyLoadTask({ uses, sort, name, path, src, build, watch, browserSyncStream, browserSyncReload } = {}){
    if (uses){
        let stream = require(path)({
            src,
            build,
            name,
            env,
            browserSyncStream
        });

        gulp.task(name, stream);

        tasks.push({
            sort,
            name
        });

        if (watch && env.dev){
            watches.push({
                watch,
                name,
                browserSyncReload
            });
        }
    }
}

if (Array.isArray(config.tasks)){
    for (let i = 0, task; i < config.tasks.length; i++){
        lazyLoadTask(config.tasks[i]);
    }
}

tasks = tasks
    .sort((a, b) => a.sort > b.sort)
    .map(task => task.name);

if (env.dev){
    gulp.task("watch", function(){

        if (browserSync){
            browserSync.init({
                server: {
                    baseDir: "./build"
                }
            });
        }

        watches.forEach(function({ watch, name, browserSyncReload }){
            if (browserSync && browserSyncReload){
                gulp.watch(watch, gulp.series(name)).on("change", browserSync.reload);
            } else {
                gulp.watch(watch, gulp.series(name));
            }
        });
    });

    tasks.push("watch");
}

gulp.task("clean", function(){
    return require("del")([
        config.build
    ]);
});

tasks.unshift("clean");

gulp.task("default", gulp.series.apply(gulp, tasks));