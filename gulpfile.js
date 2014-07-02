// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
//var pngcrush = require('imagemin-pngcrush');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

// Concatenate & Minify JS
gulp.task('scripts', function () {
    gulp.src('sourse/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('www/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/js'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src('sourse/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('sourse/css'));
});

//Concatenate & Minify css
gulp.task('minify-css', function () {
    gulp.src('sourse/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(prefix())
        .pipe(gulp.dest('www/css'))
        .pipe(rename('style.min.css'))
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('www/css'))
        .pipe(livereload());
});

//Create html pages
gulp.task('fileinclude', function () {
    gulp.src('sourse/templates/**/*.tpl.html')
        .pipe(fileinclude())
        .pipe(rename({
            extname: ""
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest('www'))
        .pipe(livereload());
});

//imagemin
gulp.task('imagemin', function () {
    return gulp.src('sourse/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('www/images'))
        .pipe(livereload());
});
//Run 
gulp.task('livereload', function () {
    gulp.src('./')
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('sourse/js/**/*.js', ['scripts']);
    gulp.watch('sourse/scss/**/*.scss', ['sass']);
    gulp.watch('sourse/css/**/*.css', ['minify-css']);
    //gulp.watch('www/**/*.html', ['livereload']);
    gulp.watch('sourse/templates/**/*.html', ['fileinclude']);
    gulp.watch('sourse/images/**/*.*', ['imagemin']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'minify-css', 'livereload', 'watch', 'fileinclude', 'imagemin']);