
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

let isDev = true;
let isProd = !isDev;
const conf = {
    dest: './build'
};

let cssFiles = [
    './src/css/some.css',
    './src/css/other.css'
];
let webConfig = {
    output: {
        filename: 'all.js'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      },
      // mode: isDev ? 'development' : 'production',
      // devtool: isDev ? 'eval-source-map':""
};

function styles() {
    return gulp.src(cssFiles)
                .pipe(concat('all.css'))
                .pipe(autoprefixer({cascade: false}))
                .pipe(cleanCSS({level: 2}))
                .pipe(gulp.dest('./build/css'))
                .pipe(browserSync.stream());
}
function html() {
    return gulp.src('./src/**/*.html')
                .pipe(gulp.dest('./build'))
                .pipe(browserSync.stream());

}

function scripts() {
    return gulp.src('./src/scripts/some.js')
                .pipe(webpack(webConfig))
                .pipe(gulp.dest(conf.dest +'/js'))
                .pipe(browserSync.stream());
}

function clean() {
   return del(['./build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles); 
    gulp.watch('./src/scripts/**/*.js', scripts); 
    gulp.watch('./src/**/*.html', html); 
}

gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("watch", watch);
gulp.task("clean", clean);


gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, html)));
gulp.task('dev', gulp.series('build', 'watch'));
