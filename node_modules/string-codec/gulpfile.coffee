'use strict'

gulp = require 'gulp'
$ = (require 'gulp-load-plugins') lazy: false
es = require 'event-stream'

paths =
  lint: [
    './gulpfile.coffee'
    './src/**/*.coffee'
  ]
  watch: [
    './gulpfile.coffee'
    './src/**/*.coffee'
    './test/**/*.coffee'
  ]
  tests: [
    './test/**/*.coffee'
  ]
  source: [
    './src/**/*.coffee'
  ]


gulp.task 'lint', ->
  gulp.src paths.lint
    .pipe $.coffeelint()
    .pipe $.coffeelint.reporter()

gulp.task 'compile', ['lint'], ->
  es.merge(
    gulp.src paths.source
      .pipe $.sourcemaps.init()
      .pipe($.coffee(bare: true).on('error', $.util.log))
      .pipe gulp.dest('./lib')
    gulp.src paths.tests
      .pipe $.sourcemaps.init()
      .pipe($.coffee(bare: true).on('error', $.util.log))
      .pipe $.sourcemaps.write()
      .pipe $.espower()
      .pipe gulp.dest('./compile/test')
  )

gulp.task 'test', ['compile'], ->
  gulp.src ['./compile/test/**/*.js'], {cwd: __dirname}
    .pipe $.mocha()

gulp.task 'watch', ['test'], ->
  gulp.watch paths.watch, ['test']

gulp.task 'default', ['test']
