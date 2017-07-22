//LOADED PLUGINS
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var del = require('del');
var sequence = require('run-sequence');
var streamqueue = require('streamqueue');



//PATHS
var config = {
    app: 'app',
    dist: 'dist',

    cssIn: 'app/css/**/*.css',
    cssLoadPath : [
        'app/css/normalize.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'app/css/main.css'
    ],
    jsLoadPath: [
        'app/js/vendor/modernizr-2.8.3.min.js',
        'app/js/main.js'
    ],
    jsIn : 'app/js/*.js',
    imgIn: 'app/img/**/*.{jpg,jpeg,png,gif}',
    sassIn: 'app/sass/main.scss',
    sassOut: 'app/css',
    sassWatch: 'app/sass/**/*.scss',
    allOutput: 'dist/'
};


//SERVE AND WATCH
gulp.task('serve', ['sass', 'js'], function () {

    gulp.watch(config.jsIn, ['js']);
    gulp.watch(config.sassWatch, ['sass']);
});


//CSS

gulp.task('css', function () {
    return gulp.src(config.cssLoadPath)
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.allOutput + 'css'));

});

//SASS, PREFIX
gulp.task('sass', function () {
    return gulp.src(config.sassIn)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sassOut))
        .on('finish', function () { gulp.start('css'); });
});



//JS
gulp.task('js', function () {
    return streamqueue({objectMode: true},
        gulp.src(config.jsLoadPath)
            .pipe(concat('script.js'))
            // .pipe(uglify().on('error', function(err) {
            //     gutil.log(gutil.colors.red('[Error]'), err.toString());
            //     this.emit('end');
            // }))
            .pipe(gulp.dest(config.allOutput + 'js')))
});

//IMG
gulp.task('img', function () {
    return gulp.src(config.imgIn)
        .pipe(changed('dist/img/'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});



//CLEAN TASK
gulp.task('clean', function () {
    return del([config.allOutput]);
});

//BUILD TASK
gulp.task('build', function () {
    sequence('clean', ['js', 'css', 'img']);
});
//DEFAULT TASK
gulp.task('default', ['serve']);