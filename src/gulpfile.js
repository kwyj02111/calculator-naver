var VERSION_PATH = './version.json';
var VERSION      = require(VERSION_PATH);
var gulp         = require('gulp');
var gulpsync     = require('gulp-sync')(gulp);
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var concatcss    = require('gulp-concat-css');
var uglifycss    = require('gulp-uglifycss');
var uglifyhtml   = require('gulp-minify-html');
var fileinclude  = require('gulp-file-include');
var jsonmodify   = require('gulp-json-modify');

var src_file_path = {

    "css" : [
        "./css/calc.css",
        "./css/reset.css"
    ],

    "js" : [
        "./js/calc.js",
        "./js/main.js",
    ],

    "html"    :    "./html/*.html",
};

var dist_file_path = {

    "css" : "../dist/css",
    "js" : "../dist/js",
    "html" : "../dist",
};

var dist_file_name = {

    "js"        : function() { return "calculator_naver_ver." + VERSION['calculator_version'] + ".min.js"; },
    "css"       : function() { return "calculator_naver_ver." + VERSION['calculator_version'] + ".min.css"; },
};


gulp.task(
    'default',
    gulpsync.sync([
        'gen_html',
        'js',
        'css',
        'html'
    ]),
    function() {
        var type = 'calculator_version';
        var fileVersionPosition = 3; // gulp 버전 값 위치
        var version = VERSION[type]; // 해당 파일의 버전 값 가져옴
        var newVersion = '';         // 새로운 버전 변수

        version = version.split('.'); // 현재 버전을 . 을 분리
        version[fileVersionPosition] = Number(version[fileVersionPosition]) + 1; // gulp 버전 값 + 1

        // 문자열로 변경
        for(var i=0; i<version.length; i++) {
            newVersion += version[i];
            newVersion += '.';
        }

        newVersion = newVersion.slice(0, -1); // 마지막 문자열 삭제

        // 버전 파일 update
        gulp.src(VERSION_PATH)
            .pipe(jsonmodify({
                'key': type,
                'value': newVersion
            }))
            .pipe(gulp.dest('./'));

        VERSION[type] = newVersion;

        // 해당 파일의 버전 값 반환
        return newVersion;
    }
);

gulp.task("js", function() {
    return gulp.src(src_file_path.js)
        .pipe(concat(dist_file_name.js()))
        .pipe(uglify())
        .pipe(gulp.dest(dist_file_path.js));
});

gulp.task("css", function() {
    return gulp.src(src_file_path.css)
        .pipe(concatcss(dist_file_name.css()))
        .pipe(uglifycss())
        .pipe(gulp.dest(dist_file_path.css));
});


gulp.task('gen_html', function() {

    var calculatorJs = genjstag('./js/' + dist_file_name.js()) + '\n';
    var calculatorCss = gencsstag('./css/' + dist_file_name.css()) + '\n';

    gulp.src(['./tempHtml/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                calculatorJs: calculatorJs,
                calculatorCss: calculatorCss
            }
        }))
        .pipe(gulp.dest('./html'));
});

gulp.task("html", function() {
    return gulp.src(src_file_path.html)
        .pipe(uglifyhtml())
        .pipe(gulp.dest(dist_file_path.html));
});


/////////////////////////////////////[task에서 사용하는 내부 함수]/////////////////////////////////////

function gencsstag(src) {
    return '<link rel="stylesheet" href="' + src + '" type="text/css" />';
}

function genjstag(src) {
    return '<script src="' + src + '"></script>';
}