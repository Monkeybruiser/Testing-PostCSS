// Include gulp
var gulp					= require('gulp');

// Task notify - https://www.npmjs.com/package/gulp-notify
var notify					= require("gulp-notify");

// JS Helpers
var jshint					= require('gulp-jshint');
var concat					= require('gulp-concat');
var uglify					= require('gulp-uglify');
var rename					= require('gulp-rename');

// Browser Sync for awesomeness - http://www.browsersync.io/docs/gulp/
var browserSync				= require('browser-sync');
var reload					= browserSync.reload;

// Bring in PostCSS
var postcss					= require('gulp-postcss');

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

// CSS Lint
var stylelint				= require("stylelint");
var reporter				= require("postcss-reporter");

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



// Do all sorts of magic with CSS
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
	    mqpacker,
	    /*
	    stylelint({
			"rules": {
			"color-no-invalid-hex": 2,
			"declaration-colon-space-before": [2, "never"],
			}
		}),
		reporter({
			clearMessages: true,
		})
		*/
	];
	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/library/css'))
        .pipe(notify("CSS has been compiled and organised."));
});



// Create a styleguide
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



// Lint JS
gulp.task('lint', function() {
    return gulp.src('public/library/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify("Javascript has been linted"));
});



// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
		//"public/library/js/libs/...",
		"public/library/js/scripts.js",
		])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/library/js/min'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/library/js/min'))
        .pipe(notify("Javascript has been concatinated and uglified"));
});



// Watch files and act if they are changed
gulp.task('watch', function() {
    gulp.watch('public/library/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/*.css', ['css', 'guide']);
});


/*
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
*/



// Default Task
gulp.task('default', ['css', 'guide', 'lint', 'scripts', 'watch']);