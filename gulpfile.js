const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const maps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-javascript-obfuscator');
const imagemin = require('gulp-imagemin');



function compileSass() {
    const directoryPath = './source/scss/';
    const filename = 'main.scss';

    if (!fs.existsSync(`${directoryPath}/${filename}`)) {
        fs.writeFileSync(`${directoryPath}/${filename}`, '//main scss');
    }

    return gulp.src('./source/scss/main.scss')
    .pipe(maps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(maps.write('./build/css/maps'))
    .pipe(gulp.dest('./build/css'));
}


function compressJs() {
    const directoryPath = './source/scripts/';
    const filename = 'index.js';

    if (!fs.existsSync(`${directoryPath}/${filename}`)) {
        fs.writeFileSync(`${directoryPath}/${filename}`, '//main js');
    }

    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/js'));
}


function compressImages() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

exports.default = function (){
    gulp.watch(['./source/scss/**/*.scss', './source/scripts/index.js'], {ignoreInitial: false}, gulp.series(compileSass, compressJs));
}

exports.compressImg = compressImages;