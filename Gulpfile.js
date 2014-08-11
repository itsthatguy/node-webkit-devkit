// Gulpfile.js
// Require the needed packages
var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    clean       = require('gulp-clean'),
    coffee      = require('gulp-coffee'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    ejs         = require("gulp-ejs"),
    path        = require("path"),
    fs          = require('fs.extra'),
    del         = require('del'),
    runSequence = require('run-sequence');

var baseAppPath = path.join(__dirname,  'assets'),
    baseStaticPath = path.join(__dirname, 'app'),
    baseImgPath = path.join(baseAppPath, 'img'),
    baseJsPath  = path.join(baseAppPath, 'js'),
    baseCssPath = path.join(baseAppPath, 'scss');

var paths = {
  cleanPath      : path.join(baseStaticPath, '**', '*'),
  cssInput       : path.join(baseCssPath, 'app.scss'),
  cssOutput      : path.join(baseStaticPath, 'css'),
  coffeeInput    : path.join(baseJsPath, '**', '*.coffee'),
  coffeeOutput   : path.join(baseStaticPath, 'js'),
  ejsPath        : [path.join(baseAppPath, '**', '*.ejs')],
  assetsBasePath : baseAppPath,
  assetsPaths: [
    path.join(baseAppPath, 'img', '**', '*'),
    path.join(baseAppPath, 'fonts', '**', '*'),
    path.join(baseAppPath, '**', '*.html'),
    path.join(baseAppPath, '**', '*.json')
  ],
  assetsOutput: baseStaticPath
};

var watchPaths = {
  css: [
    path.join(baseCssPath, '**', '*.scss*'),
    baseCssPath, path.join('**', '*', '*.scss*')
  ],
  coffee: [path.join(baseJsPath, '**', '*.coffee')],
  assets: paths.assetsPaths,
  ejs: paths.ejsPath
}

var testFiles = [
  'generated/js/app.js',
  'test/client/*.js'
];


gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});


//
// sass
//


// Get and render all .styl files recursively
gulp.task('sass', function () {
  return gulp.src(paths.cssInput)
    .pipe(sass()
      .on('error', gutil.log)
      .on('error', gutil.beep))
    .pipe(gulp.dest(paths.cssOutput));

});


//
// Coffee
//

gulp.task('coffee', function() {
  return gulp.src(paths.coffeeInput)
    .pipe(coffee({bare: true})
      .on('error', gutil.log)
      .on('error', gutil.beep))
    .pipe(gulp.dest(paths.coffeeOutput));
});


//
// EJS
//

gulp.task('ejs', function() {
  return gulp.src(paths.ejsPath)
    .pipe(ejs()
      .on('error', gutil.log)
      .on('error', gutil.beep))
    .pipe(gulp.dest(paths.assetsOutput));
});


//
// Static Assets
//

gulp.task('assets', function() {
  return gulp.src(paths.assetsPaths, {base: paths.assetsBasePath})
    .pipe(gulp.dest(paths.assetsOutput)
      .on('error', gutil.log)
      .on('error', gutil.beep));
});


//
// Clean
//

gulp.task('clean', function() {
  return del(paths.cleanPath, { sync: true });
});


//
// Watch pre-tasks
//

gulp.task('watch-pre-tasks', function(callback) {
  runSequence('clean', ['coffee', 'sass', 'assets', 'ejs'], callback);
});


//
// Watch
//
gulp.task('watch', ['watch-pre-tasks'], function() {
  gulp.watch(watchPaths.css, ['sass'])
    .on('error', gutil.log)
    .on('error', gutil.beep);
  gulp.watch(watchPaths.coffee, ['coffee'])
    .on('error', gutil.log)
    .on('error', gutil.beep);
  gulp.watch(watchPaths.assets, ['assets'])
    .on('error', gutil.log)
    .on('error', gutil.beep);
  gulp.watch(watchPaths.ejs, ['ejs'])
    .on('error', gutil.log)
    .on('error', gutil.beep);

});

gulp.task('default', ['sass', 'coffee', 'assets', 'ejs']);
