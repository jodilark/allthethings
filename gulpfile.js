var gulp = require('gulp')
    ,sourcemaps = require('gulp-sourcemaps')
    , sass = require('gulp-sass')
    , CacheBuster = require('gulp-cachebust')
    , cachebust = new CacheBuster()
    , concat = require('gulp-concat')
    , babel = require('gulp-babel')
    , print = require('gulp-print')
    , uglify = require('gulp-uglify')

var gulpPath = {
    jsSource: ['./public/js/app.js','./public/js/**/*.js']
    ,scss: ['./public/styles/reset.scss','./public/styles/*.*css', './public/styles/fonts/*.*css']
}

gulp.task ('hello', function (){
    console.log("hello gulp is on")
})


gulp.task ('build-css', function (){
    return gulp.src(gulpPath.scss) 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/dist'))
})

gulp.task('build-js', function() {
   return gulp.src(gulpPath.jsSource)               
      .pipe(sourcemaps.init())
      .pipe(print())                        
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./')) 
      .pipe(gulp.dest('./public/dist/js')); 
});

gulp.task('build', ['build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(gulpPath.scss, ['build']);
    gulp.watch(gulpPath.jsSource, ['build']);
});