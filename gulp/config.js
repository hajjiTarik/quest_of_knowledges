'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../build/config/config');
var replace = require('gulp-replace-task');

var _package = require('../package.json');

gulp.task('config:constantes', function (done) {

    gutil.log(gutil.colors.green('Configuration de l\'environnment : ', config.get('env')));
    gutil.log(gutil.colors.green('Version de l\'application : ', _package.version));

    gulp.src('build/config/templates/configConstantes.js')
        .pipe(replace({
            patterns: [
                {
                    match      : 'logDebug',
                    replacement: config.get('logDebug')
                },
                {
                    match      : 'baseUrl',
                    replacement: config.get('server')
                },
                {
                    match      : 'version',
                    replacement: _package.version
                }
            ]
        }))
        .pipe(gulp.dest('src/app/constants/'))
        .on('end', done);
});

gulp.task('config:cordova', function (done) {

    gutil.log(gutil.colors.green('Environment cordova configuration : ', config.get('env')));
    gutil.log(gutil.colors.green('Version de l\'application : ', _package.version));

    gulp.src('build/config/templates/config.xml')
        // Manage constants by environment
        .pipe(replace({
            patterns: Object.keys(config.getProperties()).map(function (param) {
                return {
                    match      : param,
                    replacement: config.get(param)
                };
            })
        }))
        // Set application version and APP config
        .pipe(replace({
            patterns: [
                {
                    match      : 'APP_VERSION',
                    replacement: _package.version
                },
                {
                    match      : 'BUILD_NUMBER',
                    replacement: config.get('buildNumber')
                }
            ]
        }))
        .pipe(gulp.dest('.'))
        .on('end', done);

});

gulp.task('config', ['config:constantes', 'config:cordova'], function () {
    gutil.log(gutil.colors.green('Configuration OK'));
});