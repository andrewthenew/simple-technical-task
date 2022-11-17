const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));

const { series } = gulp;

const mySCSS = [
  './src/sass/app.scss',
];

gulp.task('styles', (done) => {
  gulp.src(mySCSS)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build'));
  done();
});

gulp.task('default', gulp.series(['styles']));

exports.default = series('default');
