// Include gulp
var gulp				= require('gulp');


// Bring in PostCSS
var postcss				= require('gulp-postcss');




gulp.task('css', function () {
  var processors = [
  ];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/library/css'));
});