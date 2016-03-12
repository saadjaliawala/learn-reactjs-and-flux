var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('browserify', function () {
  browserify('./app/main.js')
    .transform('reactify')
    .bundle()
    .on('error', handleError)
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('app/css/*.*')
    .pipe(gulp.dest('dist/css'));
  gulp.src('app/vendors/*.*')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['browserify', 'copy'], function () {
  return gulp.watch('app/**/*.*', ['browserify', 'copy']);
});