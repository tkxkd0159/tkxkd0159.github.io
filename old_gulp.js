// const gulp = require('gulp');
// const csso = require('gulp-csso');
// const uglify = require('gulp-uglify');
// const terser = require('gulp-terser');
// const concat = require('gulp-concat');
// const sass = require('gulp-sass');
// const plumber = require('gulp-plumber');
// const cp = require('child_process');
// const imagemin = require('gulp-imagemin');
// const browserSync = require('browser-sync');

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'bundle';

// /*
 // * Build the Jekyll Site
 // * runs a child process in node that runs the jekyll commands
 // */
// gulp.task('jekyll-build', function (done) {
	// return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'}).on('close', done);
	// done();
// });

// /*
 // * Rebuild Jekyll & reload browserSync
 // */
// gulp.task('jekyll-rebuild', gulp.series('jekyll-build', function (done) {
	// browserSync.reload();
	// done();
// }));

// /*
 // * Build the jekyll site and launch browser-sync
 // */
// gulp.task('browser-sync', gulp.series('jekyll-build', function(done) {
	// browserSync({
		// server: {
			// baseDir: '_site'
		// }
	// });
	// done();
// }));

// /*
// * Compile and minify sass
// */
// gulp.task('sass', function(done) {
  	// gulp.src('src/styles/**/*.scss')
		// .pipe(plumber())
		// .pipe(sass())
		// .pipe(csso())
		// .pipe(gulp.dest('assets/css/'));
		// done();
// });

// /*
// * Compile fonts
// */
// gulp.task('fonts', function(done) {
	// gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
		// .pipe(plumber())
		// .pipe(gulp.dest('assets/fonts/'));
		// done();
// })

// /*
 // * Minify images
 // */
// gulp.task('imagemin', function(done) {
	// return gulp.src('src/img/**/*.{jpg,png,gif}')
		// .pipe(plumber())
		// .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		// .pipe(gulp.dest('assets/img/'));
		// done();
// });

// /**
 // * Compile and minify js
 // */
// gulp.task('js', function(done){
	// return gulp.src('src/js/**/*.js')
		// .pipe(plumber())
		// .pipe(concat('main.js'))
		// .pipe(terser())
		// .pipe(gulp.dest('assets/js/'))
		// done();
// });

// gulp.task('watch', function() {
	// gulp.watch('src/styles/**/*.scss', ['sass', 'jekyll-rebuild']);
	// gulp.watch('src/js/**/*.js', ['js']);
	// gulp.watch('src/fonts/**/*.{tff,woff,woff2}', ['fonts']);
	// gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
	// gulp.watch(['*html', '_includes/*html', '_layouts/*.html'], ['jekyll-rebuild']);
	
// });


// gulp.task('default', gulp.series('js', 'sass', 'fonts', 'browser-sync', 'watch'));