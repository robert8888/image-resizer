import gulp from 'gulp'
import gulpSass from "gulp-sass";
import dartSass from "sass";
import clean from 'gulp-clean'
import nodemon from 'gulp-nodemon'
import alias from 'gulp-path-alias'
import path from 'path'

const sass = gulpSass(dartSass)


gulp.task('clean', function (){
    return gulp.src('./dist', {read: false, allowEmpty: true})
        .pipe(gulp.src('./temp', {read: false, allowEmpty: true}))
        .pipe(clean());
})

gulp.task('structure', function (){
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./dist/public'))
        .pipe(gulp.dest('./dist/public/download'))
})

gulp.task('js', function (){
    return gulp.src('./src/**/*.js')
        .pipe(alias({
            paths: {
                '@routes': path.resolve('./src/routes'),
                '@services': path.resolve('./src/services'),
            }
        }))
        .pipe(gulp.dest('dist/'));
})

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/public/css'))
});

gulp.task('tpl', function (){
    return gulp.src('./src/templates/**/*.pug')
        .pipe(gulp.dest('./dist/templates'))
})

gulp.task('build', gulp.series(
    'clean',
    'structure',
    'tpl',
    'js',
    'sass'
))

gulp.task('develop', gulp.series('build', function (done) {
     return nodemon({
        script: './dist/server.js',
        watch: './src',
        tasks: ['build'],
        ext: 'js json scss pug',
        env: {
            'NODE_ENV': 'development'
        },
        done,
    })
}))