// Include gulp
var gulp				= require('gulp');


// Bring in PostCSS
var postcss				= require('gulp-postcss');


// Autoprefixer, CSSNEXT and PreCSS
var autoprefixer 		= require('autoprefixer');
var cssnext				= require('cssnext');
var precss				= require('precss');




gulp.task('css', function () {
	var processors = [
		autoprefixer,
		cssnext,
		precss
	];
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/library/css'));
});