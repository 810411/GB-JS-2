const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  concatCss = require('gulp-concat-css');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {baseDir: 'app'}
  })
});

gulp.task('watch', gulp.series('browserSync', 'sass'), function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function(){
  return gulp.src('app/*.html')
    .pipe(gulpIf('*.css', cleanCSS({compatibility: 'ie8'})))
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(useref())
    .pipe(gulp.dest('dist/'))
});

gulp.task('clean', function() {
  del('dist');
});
