'use strict';

var path = require('path');
var gulp = require('gulp');
var shell = require('shelljs');
var bower = require('gulp-bower');
var cordova = require("cordova-lib").cordova;
var config = require('../build/config/config');
var _package = require('../package.json');
var runSequence = require('run-sequence');
var _ = require('lodash');
var platforms = ['android', 'ios'];

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('cordova:platforms', function () {

    var tmp = config.get('platforms');

    if (!_.isEmpty(tmp) && _.isString(tmp)) {
        $.util.log($.util.colors.green('Récupération des plateformes par paramètres', tmp));
        platforms = tmp.split(',');
    } else {
        $.util.log($.util.colors.green('Récupération des platformes depuis le config.xml'));
    }
});

gulp.task('cordova:clean', function (done) {
    $.del([path.join('platforms', '/'), path.join('plugins', '/')], done);
});

gulp.task('bower', function () {
    bower();
});

gulp.task('cordova:web', ['bower', 'build']);

gulp.task('cordova:prepare', function (done) {
    cordova.prepare({
        "platforms": platforms
    }, done);

});

gulp.task('cordova:requirements', function (done) {
    cordova.requirements({
        "platforms": platforms
    }, done);

});

gulp.task('cordova:build', function (done) {

    var args = ['--device', '--gradleArg=--no-daemon'];

    if (config.get('isRelease') === true) {
        $.util.log($.util.colors.green('Build en Mode RELEASE'));
        args.splice(0, 0, '--release');
    }

    cordova.build({
        "platforms": platforms,
        "options"  : {
            argv: args
        }
    }, done);
});

gulp.task('cordova:package', function (done) {
    runSequence(
        'cordova:clean',
        'config',
        'cordova:web',
        'cordova:platforms',
        'cordova:prepare',
        'cordova:requirements',
        'cordova:build',
        function (error) {
            if (error) {
                $.util.log($.util.colors.red(error.message));
            } else {
                $.util.log($.util.colors.green('Package SUCCESSFULL'));
            }
            done(error);
        })
});