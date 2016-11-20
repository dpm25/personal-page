var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon');;

var files = ['*.js', 'src/**/*.js', 'src/**/*.ejs'];

gulp.task('jshint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', [jshint]);
});

// start the node server and restart on changes to
gulp.task('serve', function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: files
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting server....');
        });
});


// define the default task and add the watch task to it
gulp.task('default', ['dev'] );
// serve up two task jshint and nodemon
gulp.task('dev', ['watch', 'serve']);
