//导入工具包require('nide_modules里对应模块')
var gulp = require('gulp');//本地安装gulp所用到的地方 gulp命令
var sass = require('gulp-sass');//sass命令
var concat = require('gulp-concat');//合并
var connect = require('gulp-connect');//服务命令；
var uglify = require('gulp-uglify');//合并并压缩；
var htmlmin = require('gulp-htmlmin');//压缩html
var minifyCSS = require('gulp-clean-css');//压缩css文件
var babel = require('gulp-babel');//es6转换成es5



//压缩css文件
gulp.task("sass",function(){
	return gulp.src("src/style/*.scss")
	.pipe(sass())
	.pipe(minifyCSS())
	.pipe(gulp.dest("./dist/style/"));
	// .pipe(gulp.dest("D:\\PHPTutorial\\WWW\\xm\\style"));
});

//合并并压缩
gulp.task("uglify",function(){
	return gulp.src("src/js/*.js")
	.pipe(babel())
	.pipe(uglify())//压缩文件
	.pipe(concat("main.js"))//合并所有js文件
	.pipe(gulp.dest("./dist/js/"));

});

gulp.task("htmlmin",function(){
	return gulp.src("src/html/*.html")
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest("./dist/"))
})
//创建默认任务
gulp.task('fresh',['sass','uglify','htmlmin'],function(){
	return gulp.src('./src/*.html').pipe(connect.reload());
});
//监听所有
gulp.task("default",['sass','uglify','htmlmin'],function(){
	//gulp.watch("*.html",["copy-html"]);//index.html是修改的html  copy-index是起的名字
	gulp.watch(["src/style/*.scss","src/js/*js","*html","src/js/*js"],['fresh']);
	connect.server({
		livereload:true,
		port:'8081'
	});
});


