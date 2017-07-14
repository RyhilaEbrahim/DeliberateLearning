var gulp = require('gulp');

gulp.task('default', []);
gulp.task('ci', []);


// Return a stream so gulp can determine completion
gulp.task('clean', function() {
    return gulp
        .src('DeliberateLearning/DeliberateLearning/bin/*.*', { read: false })
        .pipe(clean());
});

// OR

// Take in the gulp callback and call it when done
gulp.task('clean', function(callback) {
    gulp.src('DeliberateLearning/DeliberateLearning/bin/*.*', { read: false })
        .pipe(clean());
    callback();
});

// Specify the dependencies in the second parameter
gulp.task('build', ['clean'], function() {
    // Build...
});

var args = require('yargs').argv,
    assemblyInfo = require('gulp-dotnet-assembly-info');

gulp.task('assemblyInfo', function() {
    return gulp
        .src('**/AssemblyInfo.cs')
        .pipe(assemblyInfo({
            version: 1,
            fileVersion: 1,
            company: 'moo',
            copyright: function(value) { 
                return value + '-' + new Date().getFullYear(); 
            }
        }))
        .pipe(gulp.dest('.'));
});

var msbuild = require('gulp-msbuild');

gulp.task('build', ['assemblyInfo'], function() {
    return gulp
        .src('**/*.sln')
        .pipe(msbuild({
            toolsVersion: 12.0,
            targets: ['Clean', 'Build'],
            errorOnFail: true,
            stdout: true
        }));
});