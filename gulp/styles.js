'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {
    var sassOptions = {
        style: 'expanded'
    };

    var injectFiles = gulp.src([
        path.join(conf.paths.src, '/app/**/*.scss'),
        path.join('!' + conf.paths.src, '/app/index.scss')
    ], {read: false});

    var injectOptions = {
        transform   : function (filePath) {
            filePath = filePath.replace(conf.paths.src + '/app/', '');
            console.log(filePath);
            return '@import "' + filePath + '";';
        },
        starttag    : '// injector',
        endtag      : '// endinjector',
        addRootSlash: false
    };

    var cssFilter = $.filter('**/*.css');

    return gulp.src([
        path.join(conf.paths.src, '/app/index.scss')
    ])
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe($.sass(sassOptions)).on('error', conf.errorHandler('RubySass'))
        .pipe(cssFilter)
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(cssFilter.restore())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
        .pipe(browserSync.reload({stream: true}));
});
