var gulp = require('gulp');


gulp.task('xgettext',require('./task/xgettext.js'));
gulp.task('po2json',require('./task/po2json.js'));
gulp.task('doc',require('./task/doc.js'));
gulp.task('nwbuild',require('./task/nwbuild.js'));

