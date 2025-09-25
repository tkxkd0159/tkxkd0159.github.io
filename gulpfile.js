import gulp from "gulp";
import csso from "gulp-csso";
import terser from "gulp-terser";
import concat from "gulp-concat";
import gulpSass from "gulp-sass";
import * as sassCompiler from "sass";
import plumber from "gulp-plumber";
import cp from "child_process";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import browsersync from "browser-sync";
import del from "del";

const sass = gulpSass(sassCompiler);
const browserSyncInstance = browsersync.create();

function browserSync(done) {
  browserSyncInstance.init({
    server: {
      baseDir: "./_site/",
    },
    port: 3000,
  });
  done();
}

function browserSyncReload(done) {
  browserSyncInstance.reload();
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
    .pipe(browserSyncInstance.stream());
}

/*
 * Compile fonts
 */

function fonts() {
  return gulp
    .src(["src/fonts/**/*.{ttf,woff,woff2}"])
    .pipe(plumber())
    .pipe(gulp.dest("assets/fonts/"))
    .pipe(browserSyncInstance.stream());
}
/*
 * Minify images
 */

function images() {
  return gulp
    .src("src/img/**/*.{jpg,png,gif}")
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          name: "cleanupIDs",
          active: true,
        }),
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
    .pipe(browserSyncInstance.stream());
}

function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build", "--incremental"], {
    stdio: "inherit",
  });
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

export { build, watch };
export default build;
