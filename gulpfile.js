let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    gcmq = require('gulp-group-css-media-queries'),
    webp = require('gulp-webp'),
    imagemin = require('gulp-imagemin'),
    svgcss = require('gulp-svg-css'),
    autoprefixer = require('gulp-autoprefixer');

let path = {
    build: {
        html: 'dist',
        css: 'dist/css',
        img: 'dist/images',
    },
    src: {
        html: 'src/pug/*.pug',
        css: 'src/scss/**/*.scss',
        img: 'src/images/**/*',
    },
    watch: {
        html: 'src/pug/**/*.pug',
        css: 'src/scss/**/*.scss',
        img: 'src/images/**/*',
    }
};


function html() {
    return gulp.src(path.src.html)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.build.html))
}

function styles() {
    return gulp.src(path.src.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(gulp.dest(path.build.css))
}

function images() {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            quality: 95,
            progressive: true,
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(gulp.src(path.src.img))
        .pipe(webp({
            quality: 90,
        }))
        .pipe(gulp.dest(path.build.img))
}

function svg() {
    return gulp.src('src/svg/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/svg-min'))
        .pipe(gulp.src('src/svg-min/*.svg'))
        .pipe(svgcss())
        .pipe(gulp.dest('src/svg-min'))
}


function watch() {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.css, styles)
    gulp.watch(path.watch.img, images)
    gulp.watch('src/svg/*', svg)
}

exports.default = gulp.parallel(html, styles, images, svg, watch);
