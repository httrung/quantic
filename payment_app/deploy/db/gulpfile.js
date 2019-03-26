const gulp = require('gulp');
var gmcfp = require('gulp-mysql-command-file-processor');

const dbConfig = require('../../config/db/info');
const config = {
    srcIndex: 'index.js',
    destIndex: '../../node_modules/gulp-mysql-command-file-processor',
    schema: dbConfig.schema,
    tables: dbConfig.schema,
    masterData: 'insert_master_data.sql'
};


const schema = (cb) => {
    gulp.src(config.schema)
        .pipe(gmcfp(dbConfig.username, dbConfig.password,dbConfig.host,dbConfig.port,'DEFAULT',dbConfig.database));    
    cb();
}
gulp.task('schema', schema);

const dbInsertData = (cb) => {
    gulp.src([        
        config.masterData
    ])
    .pipe(gmcfp(dbConfig.username, dbConfig.password,dbConfig.host,dbConfig.port,'DEFAULT',dbConfig.database));
    cb();
}
gulp.task('data', dbInsertData);

const overrideFileIndex = () => {
    return gulp.src(config.srcIndex)
      .pipe(gulp.dest(config.destIndex))
}

gulp.task('default', gulp.series(
    overrideFileIndex,
    schema
)); 

// execute:
// gulp
// gulp data