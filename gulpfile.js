const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel')
const alias = require('gulp-path-alias');
const path = require('path');

gulp.task('clean', function (){
    return gulp.src('./dist', {read: false, allowEmpty: true})
        .pipe(clean());
})

gulp.task('js', function (){
    return gulp.src('./src/**/*.js')
        .pipe(alias({
            paths: {
                '@routes': path.resolve(__dirname, './src/routes'),
                '@services': path.resolve(__dirname, './src/services'),
            }
        }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/'));
})

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('tpl', function (){
    return gulp.src('./src/templates/**/*.pug')
        .pipe(gulp.dest('./dist/templates'))
})

gulp.task('build', gulp.series(
    'clean',
    'tpl',
    'js',
    'sass'
))

gulp.task('develop', gulp.series('build', function (done) {
     return nodemon({
        script: './dist/server.js',
        watch: './src',
        tasks: ['build'],
        env: {
            'NODE_ENV': 'development'
        },
        done,
    })
}))