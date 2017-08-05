'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {

    var files = path.join(conf.paths.src, '/app/**/*.js');
    //charger le fichier d'initialisation du module au debut
    var startupScript = path.join(conf.paths.src, '/app/**/index.module.js');
    var exludeFilesSpec = '!' + path.join(conf.paths.src, '/app/**/*.spec.js');
    var exludeFilesMock = '!' + path.join(conf.paths.src, '/app/**/*.mock.js');

    return gulp.src([startupScript, files, exludeFilesMock, exludeFilesSpec])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(browserSync.reload({stream: true}))
        .pipe($.size())
});
