var gulp = require('gulp');
var browserSync = require('browser-sync');
var Server = require('karma').Server;
var server = require('gulp-live-server');

gulp.task('server', function () {
    var live = new server('express.js');
    live.start();
})

gulp.task('serve', ['server'], function () {
    browserSync.init({
        notify: false,
        port: 8080,
        server: {
            baseDir: ["app"],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch(['app/**/*.*'])
        .on('change', browserSync.reload);

});

gulp.task('test-browser', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('serve-test', function () {
    browserSync.init({
        notify: false,
        port: 8081,
        server: {
            baseDir: ["test", "app"],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch(['app/**/*.*'])
        .on('change', browserSync.reload);

});
