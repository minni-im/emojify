var path    = require('path'),
    fs      = require('fs');

var request = require('request');

var emojize = require('emojize/lib/emoji');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  GEMOJI_SRC = path.join(".", "node_modules", "gemoji");
  IMAGES_DEST = path.join(".", "images" ,"emoji");

  GEMOJI_IMAGES_GLOB = [ path.join("images", "emoji", "*.png") ];
  GEMOJI_UNICODE_GLOB = [ path.join("images", "emoji", "unicode", "*.png") ];

  TWITTER_EMOJI_URL = "https://abs.twimg.com/emoji/v1/72x72/";
  TWITTER_DIR = path.join("images", "twitter");
  TWITTER_UNICODE_DIR = path.join(TWITTER_DIR, "unicode");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      project: '<%= pkg.name %>',
      version: '<%= pkg.version %>',
      banner:  '/*! <%= meta.project %> - v<%= meta.version %> - \n' +
               ' * Copyright (c) Benoit Charbonnier <%= grunt.template.today("yyyy") %>\n' +
               ' */',
      gemoji: {
        src: GEMOJI_SRC
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      release: {
        files : {
          'emojify.min.js' : 'emojify.js'
        }
      }
    },

    gitclone: {
      gemoji: {
        options: {
          repository: "https://github.com/github/gemoji.git",
          directory: '<%= meta.gemoji.src %>'
        }
      }
    }
  });

  var udpate_deps;
  if (grunt.file.exists(GEMOJI_SRC)) {
    update_deps = ["gitreset:gemoji", "gitpull:gemoji"];
  } else {
    update_deps = ["gitclone:gemoji"];
  }


  grunt.registerTask('gitreset:gemoji', "Reset Gemoji repository", function() {
    var repo_location = grunt.config.get("meta.gemoji.src");
    var done = this.async();

    grunt.util.spawn({
      cmd: "git",
      args: ["reset", "--hard"],
      opts: {cwd: repo_location, stdio: grunt.option("verbose") ? 'inherit': 'ignore'}
    }, done);
  });

  grunt.registerTask('gitpull:gemoji', "Pulling new code for Gemoji repository", function() {
    var repo_location = grunt.config.get("meta.gemoji.src");
    var done = this.async();
    grunt.util.spawn({
      cmd: "git",
      args: ["pull", "origin", "master"],
      opts: {cwd: repo_location, stdio: grunt.option("verbose") ? 'inherit': 'ignore'}
    }, done);
  });


  function copyAndKeepSymlink(src, dest) {
    if (fs.lstatSync(src).isSymbolicLink()) {
      var src_path, dest_dir = path.dirname(dest);
      if (grunt.file.exists(dest)) {
        grunt.file.delete(dest);
      }
      src_path = fs.readlinkSync(src);
      if (!grunt.file.isPathAbsolute(src_path)) {
        src_path = path.join('.', src_path) || '.';
      }
      grunt.log.debug("Symbolic link creation", dest, "->", src_path);
      fs.symlinkSync(src_path, dest, 'file');
      return true;
    } else {
      grunt.file.copy(src, dest);
      return false;
    }
  }

  grunt.registerTask('update:gemoji', "Updating emojis from Github Official repository", function() {
    var named_list = [], named_nonstandard_list = [];
    var unicode_images = grunt.file.expand({
      cwd: GEMOJI_SRC
    }, GEMOJI_UNICODE_GLOB);

    grunt.log.subhead("Copying emoji images from Github Official repo");
    grunt.log.writeln("Copying unicode emojis...");

    grunt.log.ok(unicode_images.length, "images detected");
    unicode_images.forEach(function(image) {
      var src  = path.join(GEMOJI_SRC, image),
          dest = path.join(image);
      copyAndKeepSymlink(src, dest);
    });
    grunt.log.ok();

    var github_images = grunt.file.expand({
      cwd: GEMOJI_SRC
    }, GEMOJI_IMAGES_GLOB);

    grunt.log.writeln("Copying standard named emojis...");
    grunt.log.ok(github_images.length, "images detected");
    github_images.forEach(function(image) {
      named_list.push(path.basename(image, ".png"));
      var src  = path.join(GEMOJI_SRC, image),
          dest = path.join(image);
          if (!copyAndKeepSymlink(src, dest)) {
            named_nonstandard_list.push(path.basename(image, ".png"));
          }
    });
    grunt.log.ok(named_nonstandard_list.length, "non standard emojis were detected");
    grunt.log.ok();

    grunt.config.set("emoji_named_list", named_list.join(","));
    grunt.config.set("emoji_nonstandard_list", named_nonstandard_list.join(","));
  });


  grunt.registerTask("update:emojify.js", "Update the library itself with emojis names as a list", function() {
    this.requires("update:gemoji");

    grunt.log.subhead("Patching emojify.js file");
    var code = grunt.file.read("emojify.js").split(/\r\n|[\r\n]/g);

    grunt.log.writeln("Detecting source code line containing emoji list...");
    var name_list_line = code.reduce(function(expected, line, index) {
      return (/\s+\/\/##EMOJILISTSTART/).test(line) ? index + 1 : expected;
    }, 0);
    grunt.log.ok("list detected at line", name_list_line);


    grunt.log.writeln("Detecting source code line containing emoji unicode list...");
    var unicode_list_line = code.reduce(function(expected, line, index) {
      return (/\s+\/\/##UNICODELISTSTART/).test(line) ? index + 1 : expected;
    }, 0);
    grunt.log.ok("list detected at line", unicode_list_line);

    var unicode_list = emojize;
    Object.keys(unicode_list).forEach(function(u) {
      unicode_list[u] = unicode_list[u].substr(1);
    });

    grunt.log.writeln("Patching the file...");
    code[name_list_line] = ["      ", "\"", grunt.config.get("emoji_named_list"), "\";"].join("");
    code[unicode_list_line] = ["      ", JSON.stringify(unicode_list), ";"].join("");


    grunt.file.write("emojify.js", code.join(require('os').EOL));
    grunt.log.ok();
  });


  grunt.registerTask('update:twitter-unicode', "Retrieve twitter emojis", function() {
    //this.requires("update:gemoji");
    var done = this.async();
    var unicode_images = grunt.file.expand({
      cwd: GEMOJI_SRC
    }, GEMOJI_UNICODE_GLOB);

    unicode_images.forEach(function(image, index) {
      var src      = path.join(GEMOJI_SRC, image),
          filename = path.basename(image),
          real_filename = filename;

      if (fs.lstatSync(src).isSymbolicLink()) {
        real_filename = path.basename(fs.readlinkSync(src));
      }
      request.get({encoding: null, url: TWITTER_EMOJI_URL+filename}, function(error, response, body) {
        grunt.log.writeln("Downloading emoji", filename);
        if (response.statusCode !== 404) {
          grunt.file.write(path.join(TWITTER_UNICODE_DIR, real_filename), body);
          if (filename !== real_filename) {
            var symlink = path.join(TWITTER_UNICODE_DIR, filename);
            grunt.log.writeln("Symlink creation", filename, real_filename);
            if (grunt.file.exists(symlink)) {
              grunt.file.delete(symlink);
            }
            fs.symlinkSync(real_filename, symlink);
          }
        }
        if(index === unicode_images.length) {
          done(true);
        }
      });
    });
  });

  grunt.registerTask('update:twitter-named', "Create named emojis alias", function() {
    var github_images = grunt.file.expand({
      cwd: GEMOJI_SRC
    }, GEMOJI_IMAGES_GLOB);

    github_images.forEach(function(image) {
      var src  = path.join(GEMOJI_SRC, image),
          dest = path.join(TWITTER_DIR, path.basename(image));
      copyAndKeepSymlink(src, dest);
    });
  });

  grunt.registerTask('update:twitter', ['update:twitter-unicode', 'update:twitter-named']);
  grunt.registerTask('update', flatten([ update_deps, 'update:gemoji', 'update:emojify.js', 'update:twitter']));
  grunt.registerTask('release', [ 'update', 'uglify:release' ]);
  grunt.registerTask('default', [ 'release' ]);
};


function flatten(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(b);
  });
}
