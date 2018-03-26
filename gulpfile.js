const gulp = require('gulp');
const del = require('del');
const gulpif = require('gulp-if');
const watch = require('gulp-watch');
const lazypipe = require('lazypipe');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

const isProd = process.env.NODE_ENV === 'production';

const paths = {
  output: 'dist/',
  scripts: {
    input: 'src/js/**/*.js',
    output: 'dist/js/',
  },
  styles: {
    inputSingle: 'src/scss/styles.{scss,sass}',
    inputAll: 'src/scss/**/*.{scss,sass}',
    vendor: 'src/scss/vendor/**/*',
    output: 'dist/css/',
  },
  images: {
    input: 'src/img/**/*',
    output: 'dist/img/',
  },
  html: {
    input: 'src/*.html',
    output: 'dist/',
  },
  fonts: {
    input: 'src/fonts/**/*',
    output: 'dist/css',
  },
};

gulp.task('default', () => {
  runSequence('clean', ['scripts', 'styles', 'images', 'fonts', 'html']);
});

gulp.task('production', () => {
  runSequence('lint-sass', 'lint-js', 'default');
});

gulp.task('serve', () => {
  runSequence('default', 'browser-sync');
  watch(paths.styles.inputAll, () => runSequence('styles'));
  watch(paths.images.input, () => runSequence('images'));
  watch(paths.scripts.input, () => runSequence('scripts'));
  watch(paths.html.input, () => runSequence('html'));
});

gulp.task('clean', () => del(paths.output));

gulp.task('scripts', () =>
  gulp
    .src(paths.scripts.input)
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(gulpif(!isProd, browserSync.stream()))
);

const sassPipe = lazypipe()
  .pipe(() => gulpif(!isProd, sourcemaps.init()))
  .pipe(sass)
  .pipe(autoprefixer, { browsers: 'last 4 versions' })
  .pipe(() => gulpif(isProd, cleanCss()))
  .pipe(() => gulpif(!isProd, sourcemaps.write()));

gulp.task('styles', () =>
  gulp
    .src(paths.styles.inputSingle)
    .pipe(plumber())
    .pipe(sassPipe())
    .pipe(gulp.dest(paths.styles.output))
    .pipe(gulpif(!isProd, browserSync.stream()))
);

gulp.task('images', () =>
  gulp
    .src(paths.images.input)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.output))
    .pipe(gulpif(!isProd, browserSync.stream()))
);

gulp.task('html', () =>
  gulp
    .src(paths.html.input)
    .pipe(plumber())
    .pipe(gulp.dest(paths.html.output))
    .pipe(gulpif(!isProd, browserSync.stream()))
);

gulp.task('fonts', () =>
  gulp
    .src(paths.fonts.input)
    .pipe(plumber())
    .pipe(gulp.dest(paths.fonts.output))
);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: paths.output,
    },
  });
});

gulp.task('lint-sass', () =>
  gulp
    .src([paths.styles.inputAll, !paths.styles.vendor])
    .pipe(plumber())
    .pipe(sassLint())
    .pipe(sassLint.format())
);

gulp.task('lint-js', () =>
  gulp
    .src(paths.scripts.input)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
);
