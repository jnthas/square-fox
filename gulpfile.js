var gulp = require('gulp');
var serve = require('gulp-serve')

gulp.task('hello', function () {
	console.log('Hello World');
});

gulp.task('serve', serve({
	root: 'app',
	port: 4000
}))