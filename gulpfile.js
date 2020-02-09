const gulp = require("gulp");
const csso = require("gulp-csso");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const cp = require("child_process");
const imagemin = require("gulp-imagemin");
const browsersync = require("browser-sync").create();
const del = require("del");

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function clean() {
  return del(["./_site/assets/"]);
}

function css() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest("assets/css/"))
    .pipe(browsersync.stream());
}

/*
 * Compile fonts
 */

function fonts() {
  return gulp
    .src(["src/fonts/**/*.{ttf,woff,woff2}"])
    .pipe(plumber())
    .pipe(gulp.dest("assets/fonts/"))
    .pipe(browsersync.stream());
}
/*
 * Minify images
 */

function images() {
  return gulp
    .src("src/img/**/*.{jpg,png,gif}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 })
      ])
    )
    .pipe(gulp.dest("assets/img/"));
}
/**
 * Compile and minify js
 */

function scripts() {
  return gulp
    .src(["src/js/**/*.js"])
    .pipe(plumber())
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("assets/js/"))
    .pipe(browsersync.stream());
}

function jekyll() {
  return cp.spawn("jekyll.bat", ["build"], { stdio: "inherit" });
}

function watchFiles() {
  gulp.watch("src/styles/**/*.scss", gulp.parallel(jekyll, css));
  gulp.watch("assets/css/addstyle.css", jekyll);
  gulp.watch("src/js/**/*.js", gulp.parallel(jekyll, scripts));
  gulp.watch("src/fonts/**/*.{tff,woff,woff2}", fonts);
  gulp.watch("src/img/**/*.{jpg,png,gif}", images);
  gulp.watch(
    ["*html", "_includes/*.html", "_layouts/*.html"],
    gulp.series(jekyll, browserSyncReload)
  );
}

const build = gulp.series(
  clean,
  gulp.parallel(css, images, fonts, scripts, jekyll)
);
const watch = gulp.parallel(watchFiles, browserSync);

exports.build = build;
exports.default = build;
exports.watch = watch;
