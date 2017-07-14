// Return a stream so gulp can determine completion
gulp.task('clean', function() {
    return gulp
        .src('app/tmp/*.js', { read: false })
        .pipe(clean());
});

// OR

// Take in the gulp callback and call it when done
gulp.task('clean', function(callback) {
    gulp.src('app/tmp/*.js', { read: false })
        .pipe(clean());
    callback();
});

// Specify the dependencies in the second parameter
gulp.task('build', ['clean'], function() {
    // Build...
});


var msbuild = require('gulp-msbuild');

gulp.task('build', ['configuration'], function() {
    return gulp
        .src('**/*.sln')
        .pipe(msbuild({
            toolsVersion: 12.0,
            targets: ['Clean', 'Build'],
            errorOnFail: true,
            stdout: true
        }));
});