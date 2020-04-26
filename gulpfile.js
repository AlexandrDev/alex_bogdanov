const gulp = require('gulp');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');

function style() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(gulp.dest('dist'))
}

function watch() {
    gulp.watch('scss/**/*.scss', style)
}

exports.default = gulp.series(style, watch);
