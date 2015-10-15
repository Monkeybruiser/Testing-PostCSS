// Include gulp
var gulp					= require('gulp');

// Bring in PostCSS
var postcss					= require('gulp-postcss');

// Task notify - https://www.npmjs.com/package/gulp-notify
var notify					= require("gulp-notify");

// Autoprefixer, CSSNEXT and PreCSS
//var autoprefixer 			= require('autoprefixer');
var cssnext					= require('cssnext');
var precss					= require('precss');

// Lost Grid - https://github.com/corysimmons/lost
var sourcemaps				= require('gulp-sourcemaps');
var lost					= require('lost');

// Import other files
var atImport				= require('postcss-import');

// Bring Media Queries into one
var mqpacker				= require('css-mqpacker');

// Browser Support
var color_rgba_fallback 	= require('postcss-color-rgba-fallback');
var opacity 				= require('postcss-opacity');
var pseudoelements 			= require('postcss-pseudoelements');
var vmin 					= require('postcss-vmin');
var pixrem 					= require('pixrem'); // PX fallback for rem
var will_change 			= require('postcss-will-change');

// Strip and optimise CSS
var cssnano					= require('cssnano');

// Auto styleguide
var fs						= require('fs');
var styleGuide				= require('postcss-style-guide');
var processedCSS			= fs.readFileSync('src/style.css', 'utf-8');



gulp.task('css', function () {
	var processors = [
		will_change,
		lost(),
	    atImport,
	    cssnano,
		precss,
		cssnext,
	    color_rgba_fallback,
	    opacity,
	    pseudoelements,
	    vmin,
	    pixrem,
	    mqpacker
	];
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/library/css'))
        .pipe(notify("CSS has been compiled and organised."));
});



gulp.task('guide', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([
            require('postcss-style-guide')({
                name: "Project name",
                processedCSS: processedCSS
            })
        ]))
        .pipe(gulp.dest('build/'))
        .pipe(notify("Styleguide created!"));
});



// Default Task
gulp.task('default', ['css', 'guide']);