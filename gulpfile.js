const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');


function buildHTML() {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('dist'))
}

function style() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(gulp.dest('dist/css'))
}

function watch() {
    gulp.watch('src/pug/**/*.pug', buildHTML)
    gulp.watch('src/scss/**/*.scss', style)
}

exports.default = gulp.series(buildHTML, style, watch);
