var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // Waypoints
  gulp.src([
    './node_modules/waypoints/lib/*.js'
  ])
  .pipe(gulp.dest('./vendor/waypoints/'))

  // jQuery counterup
  gulp.src([
    './node_modules/jquery.counterup/*.js'
  ])
  .pipe(gulp.dest('./vendor/jquery.counterup/'))

  // Flag icon css
  gulp.src([
    './node_modules/flag-icon-css/css/**/*',
    './node_modules/flag-icon-css/flags/**/*'
  ], {
    base: './node_modules/flag-icon-css'
  })
  .pipe(gulp.dest('./vendor/flag-icon-css/'))

  // Animate.css
  gulp.src([
    './node_modules/animate.css/*.css'
  ])
  .pipe(gulp.dest('./vendor/animate.css/'))

  // Parallax.js
  gulp.src([
    './node_modules/jquery-parallax.js/*.js'
  ])
  .pipe(gulp.dest('./vendor/jquery-parallax.js/'))

  // Owl Carousel 2
  gulp.src([
    './node_modules/owl.carousel/dist/*.js', 
    './node_modules/owl.carousel/dist/assets/*.css'
  ])
  .pipe(gulp.dest('./vendor/owl.carousel/'))

    // jQuery Validation
    gulp.src([
      './node_modules/jquery-validation/dist/**/*'
    ], {
      base: './node_modules/jquery-validation/dist'
    })
    .pipe(gulp.dest('./vendor/jquery-validation/'))

  // Typed.js
  gulp.src([
    './node_modules/typed.js/lib/*.js'
  ])
  .pipe(gulp.dest('./vendor/typed.js/'))

    // WOW.js
    gulp.src([
      './node_modules/wowjs/dist/*.js'
    ])
    .pipe(gulp.dest('./vendor/wowjs/'))

  // Anime.js
  gulp.src([
    './node_modules/animejs/*.js'
  ])
  .pipe(gulp.dest('./vendor/animejs/'))

  // Countdown.js
  gulp.src([
    './node_modules/countdown/*.js'
  ])
  .pipe(gulp.dest('./vendor/countdown/'))

   // Vivus.js
   gulp.src([
    './node_modules/vivus/dist/*.js'
  ])
  .pipe(gulp.dest('./vendor/vivus/'))

  // Morris.js
  gulp.src([
    './node_modules/morris.js/morris.js', 
    './node_modules/morris.js/morris.min.js'
  ])
  .pipe(gulp.dest('./vendor/morris.js/'))

  // Raphael.js
  gulp.src([
    './node_modules/raphael/raphael.js', 
    './node_modules/raphael/raphael.min.js'
  ])
  .pipe(gulp.dest('./vendor/raphael.js/'))

  // Peity
  gulp.src([
    './node_modules/peity/*.js'
  ])
  .pipe(gulp.dest('./vendor/peity/'))

  // jQuery Marquee
  gulp.src([
    './node_modules/jquery.marquee/*.js'
  ])
  .pipe(gulp.dest('./vendor/jquery.marquee/'))  

});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
