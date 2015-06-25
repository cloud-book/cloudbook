var gulp = require('gulp');


gulp.task('xgettext',require('./task/xgettext.js'));
gulp.task('po2json',require('./task/po2json.js'));
gulp.task('doc',require('./task/doc.js'));
gulp.task('build',require('./task/build.js'));
gulp.task('run',require('./task/run.js'));
gulp.task('devel',require('./task/devel.js'));
