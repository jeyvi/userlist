var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    webserver = require('gulp-webserver'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

var paths = {
    scripts: ['libs/js/**/*.js','js/**/*.js', 'app.js'],
    styles: ['libs/css/**/*.css','css/**/*.css'],
    tpl: 'tpl/*.html',
    index: 'index.html'
};

gulp.task('cleanWatcher', function (cb) {
    del(['build/css/*', 'build/js/*', 'build/tpl/*', 'build/index.html'], cb);
});

gulp.task('cleanAll', function (cb) {
    del(['build', '**/sourcemaps'], cb);
});

// Конкатенация и минификация JS
gulp.task('minifyJs', function(){
    return gulp.src(paths.scripts)
                        .pipe(concat('all.js'))
                            .pipe(gulp.dest('build/js'))
                            .pipe(sourcemaps.init())
                        .pipe(rename('all.min.js'))
                        .pipe(uglify())
                            .pipe(sourcemaps.write('.'))
                            .pipe(gulp.dest('build/js'));
});

// Конкатенация и минификация CSS or Less
gulp.task('css',  function() {
    return gulp.src(paths.styles)
                    .pipe(concat('common.css'))
                    .pipe(minifyCss())
                    .pipe(gulp.dest('build/css'));
});
// Перекладывание tpl в папочку с билдом
gulp.task('tpl', function() {
  return gulp.src(paths.tpl)
            .pipe(gulp.dest('build/tpl'));
});
// Перекладывание index.html в папочку с билдом
gulp.task('index', function() {
  return gulp.src(paths.index)
            .pipe(gulp.dest('build'));
});

//Server start
gulp.task('connect', function() {
    gulp
        .src('')
        .pipe(webserver({
            port: 8111,
            open: '/build/'
        }));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['minifyJs']);
    gulp.watch(paths.styles, ['css']);
    gulp.watch(paths.tpl, ['tpl']);
    gulp.watch(paths.index, ['index']);
});

// Дефолтный запуск гулпа - gulp
gulp.task('default', ['watch', 'minifyJs', 'css', 'tpl', 'index', 'connect']);
