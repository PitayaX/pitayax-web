/* eslint-disable */
var gulp = require('gulp')
var concat = require('gulp-concat')
var rev = require('gulp-rev')
var config = require('./config')

// concat assets
gulp.task('default', function () {
  return gulp.src(config.assets)
    .pipe(concat('assets.js'))
    .pipe(rev())
    .pipe(gulp.dest(config.assetsDest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.assetsDest))
})
