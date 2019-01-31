const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpmocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');


gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3050,
      DBHOST: "mongodb://127.0.0.1:27017/libApp2",
    },
    ignore: ['/node_modules/**'],
  });
});


gulp.task('test', () => {
  env({ vars: { ENV: 'Test', PORT: 3050, DBHOST: "mongodb://127.0.0.1:27017/libApp2Test",} });
  gulp.src('tests/*.js', { read: false })
    .pipe(gulpmocha({ reporter: 'nyan' }));
})
