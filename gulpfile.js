var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    git        = require('gulp-git'),
    browserify = require('gulp-browserify'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    rimraf     = require('gulp-rimraf'),
    through    = require('through2'),
    request    = require('request');

var path = require('path'),
    fs   = require('fs');

var colors = gutil.colors;

var GEMOJI_GITHUB_REPO = "https://github.com/github/gemoji.git",
    GEMOJI_SRC = path.join(".", "node_modules", "gemoji"),
    IMAGES_DEST = path.join(".", "images" ,"emoji"),

    GEMOJI_DB_JSON = "./" + path.join(GEMOJI_SRC, "db", "emoji.json"),

    TWITTER_EMOJI_URL = "https://abs.twimg.com/emoji/v1/72x72/",
    TWITTER_DEST = path.join(".", "images", "twitter"),
    TWITTER_UNICODE_DIR = path.join(TWITTER_DEST, "unicode"),

    HANGOUT_EMOJI_URL = "https://raw.githubusercontent.com/iamcal/emoji-data/master/img-hangouts-128/",
    HANGOUT_DEST = path.join(".", "images", "hangout"),
    HANGOUT_UNICODE_DIR = path.join(HANGOUT_DEST, "unicode"),

    VARIATION_SELECTOR_16 = 'fe0f';


var verbose = gutil.env.verbose || false,
    log     = function() {
        if (verbose) {
            gutil.log.apply(gutil, arguments);
        }
    };

gulp.task('gemoji:clone', function(cb) {
    git.clone(GEMOJI_GITHUB_REPO, { args: GEMOJI_SRC + " --quiet" }, cb);
});

gulp.task('gemoji:reset', function(cb) {
    git.reset('', { args: '--hard --quiet', cwd: 'node_modules/gemoji' }, cb);
});

gulp.task('gemoji:pull', function(cb) {
    git.pull('origin', 'master', { args: '--rebase --quiet', cwd: 'node_modules/gemoji' }, cb);
});

gulp.task("images:clean", function() {
    return gulp.src('./images/*', { read: false })
        .pipe(rimraf());
});


var init_folders = {
    TWITTER: function() {
        if (!fs.existsSync(TWITTER_DEST)) {
            fs.mkdirSync(TWITTER_DEST);
            fs.mkdirSync(TWITTER_UNICODE_DIR);
        }
    },
    HANGOUT: function() {
        if (!fs.existsSync(HANGOUT_DEST)) {
            fs.mkdirSync(HANGOUT_DEST);
            fs.mkdirSync(HANGOUT_UNICODE_DIR);
        }
    }
};

var folders = {
    TWITTER: {
        ROOT: TWITTER_DEST,
        UNICODE: TWITTER_UNICODE_DIR
    },
    HANGOUT: {
        ROOT: HANGOUT_DEST,
        UNICODE: HANGOUT_UNICODE_DIR
    }
};

var name_processors = {
    TWITTER: function(name) {
        // unicode variation management
        if (name.indexOf(VARIATION_SELECTOR_16)) {
            name = name.replace('-'+VARIATION_SELECTOR_16, '');
        }

        // weird twitter behavior, leading 0 are stripped
        name = name.replace(/^0+/, '');
        return name;
    },

    HANGOUT: function(name) {
        // unicode variation management
        if (name.indexOf(VARIATION_SELECTOR_16)) {
            name = name.replace('-'+VARIATION_SELECTOR_16, '');
        }
        return name;
    }
};

var images_urls = {
    TWITTER: TWITTER_EMOJI_URL,
    HANGOUT: HANGOUT_EMOJI_URL
};

function fetch_images(type) {
    init_folders[type] && init_folders[type]();

    function process(file, enc, cb) {
        var p_name, name = file.path.split('/emoji/').pop();
        log("processing", colors.cyan(name));
        if (name.indexOf("unicode") === 0) {
            name = name.split('/').pop();
            name_processors[type] && (p_name = name_processors[type](name));

            request.get({ encoding: null, url: images_urls[type] + p_name }, function(error, response, body) {
                if (error) {
                    this.push(file);
                    return cb(error);
                }
                if (response.statusCode !== 404) {
                    this.push(file);
                    fs.writeFile(path.join(folders[type].UNICODE , name), body, cb);
                } else {
                    gutil.log(colors.red("[Error:"+type+"]"), "emoji does not exist: " + name);
                    this.push(file);
                    cb();
                }
            }.bind(this));
        } else {
            log("Copying custom emoji: " + name);
            this.push(file);
            fs.writeFile(path.join(folders[type].ROOT, name), file.contents, cb);
        }
    }
    return through.obj(process);
}

var gemoji_deps = fs.existsSync(GEMOJI_SRC) ? ['gemoji:reset', 'gemoji:pull'] : ['gemoji:clone'];
var images_deps = [].concat(gemoji_deps);
images_deps.push('images:clean');

gulp.task('images:build', images_deps, function() {
    return gulp.src(GEMOJI_SRC + '/images/**/*.png')
        .pipe(fetch_images("TWITTER"))
        .pipe(fetch_images("HANGOUT"))
        .pipe(gulp.dest('./images'));
});

gulp.task('db:copy', function() {
    return gulp.src(GEMOJI_DB_JSON)
        .pipe(gulp.dest('.'));
});

gulp.task('gemoji:git', gemoji_deps);

gulp.task('build:images', ['gemoji:git', 'images:build', 'build']);
gulp.task('build:lib', ['gemoji:git', 'db:copy'], function() {
   gulp.src('./emojify.js')
    .pipe(browserify({
        'standalone': "emojify"
    }))
    .pipe(uglify())
    .pipe(rename("emojify.min.js"))
    .pipe(gulp.dest('.'));
});
