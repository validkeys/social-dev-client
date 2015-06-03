'use strict';

var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    clean         = require('gulp-clean'),
    connect       = require('gulp-connect'),
    liveReload    = require('gulp-livereload'),
    serveStatic   = require('serve-static'),
    watch         = require('gulp-watch'),
    stylus        = require('gulp-stylus'),
    nib           = require('nib');

var config = {
  dist: "./dist",
  tmp:  "./tmp",
  jsSources: ['app/app.js']
};

gulp.task('styles:compile', function(){
  return gulp.src('./styles/app.styl')
    .pipe(stylus({
      use: [nib()]
    }))
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(connect.reload());
});

gulp.task("styles:vendor", function(){
  return gulp.src(['./bower_components/fontawesome/css/font-awesome.css'])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(config.dist + '/styles'))
});

gulp.task('server', function(next){
  connect.server({
    root:       config.dist,
    livereload: true,
    port:       4200
  })
});

gulp.task("copy:index", function(){
  return gulp.src('./templates/*.html')
    .pipe(gulp.dest(config.dist))
    .pipe(connect.reload());
});

gulp.task("copy:fonts", function(){
  return gulp.src('./bower_components/fontawesome/fonts/*')
    .pipe(gulp.dest(config.dist + "/fonts"))
    .pipe(connect.reload());
});

gulp.task("copy:assets", function(){
  return gulp.src('./assets/**/*')
    .pipe(gulp.dest(config.dist + "/"))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(['./styles/**/*.styl','./templates/*.html'], ['build']);
});

gulp.task('build', ['styles:compile','copy:index']);

gulp.task('default', ['build','styles:vendor','copy:fonts', 'copy:assets','server','watch']);