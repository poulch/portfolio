var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    surcemap = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    streamqueue = require('streamqueue'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    compressCss = require('gulp-minify-css');


var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

var jsLoadPath = [

    './js/vendor/modernizr-2.8.3.min.js',
    './js/main.js'
];

var cssLoadPath = [
    'css/normalize.css',
    'bower_components/components-font-awesome/css/font-awesome.min.css'

];


gulp.task('concatCss', function () {
    return gulp.src(cssLoadPath)
        .pipe(surcemap.init())
        .pipe(concatCss('lib.css'))
        .pipe(surcemap.write())
        .pipe(compressCss())
        .pipe(gulp.dest('css/'));
});

gulp.task('sass', function () {
    return gulp.src('sass/main.scss')
        .pipe(surcemap.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(surcemap.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});


gulp.task('js', function () {
    return streamqueue({objectMode: true},
        gulp.src(jsLoadPath)
            .pipe(concat("script.js"))
            .pipe(gulp.dest("./js"))
            .pipe(rename('script.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest("./js")))

});


gulp.task('watch', function () {


    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('./js/**/*.js', ['js']);


});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['browser-sync'], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('./js/**/*.js', ['js']);

});
