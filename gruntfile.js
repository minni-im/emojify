var path = require('path');

var emojize = require('emojize/lib/emoji');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  GEMOJI_DEST = path.join(".", "node_modules", "gemoji");
  IMAGES_DEST = path.join(".", "images" ,"emoji");

  GEMOJI_IMAGES_GLOB = [ path.join("images", "emoji", "*.png") ];
  GEMOJI_UNICODE_GLOB = [ path.join("images", "emoji", "unicode", "*.png") ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      project: '<%= pkg.name %>',
      version: '<%= pkg.version %>',
      banner:  '/*! <%= meta.project %> - v<%= meta.version %> - \n' +
               ' * Copyright (c) Benoit Charbonnier <%= grunt.template.today("yyyy") %>\n' +
               ' */',
      gemoji: {
        src: GEMOJI_DEST
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
    },

    gitreset: {
      gemoji: {
        options: {
          mode: "hard"
        },
        files: '<%= meta.gemoji %>'
      }
    },

    gitpull: {
      gemoji: {
        config: { },
        files: '<%= meta.gemoji %>'
      }
    }
  });

  var udpate_deps;
  if (grunt.file.exists(GEMOJI_DEST)) {
    update_deps = ["gitreset:gemoji", "gitpull:gemoji"];
  } else {
    update_deps = ["gitclone:gemoji"];
  }

  grunt.registerTask('update:gemoji', "Updating emojis from Github Official repository", function() {
    var non_standard = 0, named_list = [];
    var unicode_images = grunt.file.expand({
      cwd: GEMOJI_DEST
    }, GEMOJI_UNICODE_GLOB);

    grunt.log.subhead("Copying emoji images from Github Official repo");
    grunt.log.writeln("Copying unicode emojis...");

    grunt.log.ok(unicode_images.length, "images detected");
    unicode_images.forEach(function(image) {
      grunt.file.copy(path.join(GEMOJI_DEST, image), image);
    });
    grunt.log.ok();

    var github_images = grunt.file.expand({
      cwd: GEMOJI_DEST
    }, GEMOJI_IMAGES_GLOB);

    grunt.log.writeln("Copying standard named emojis...");
    grunt.log.ok(github_images.length, "images detected");
    github_images.forEach(function(image) {
      named_list.push(path.basename(image, ".png"));
      if (grunt.file.isLink(image)) {
        grunt.file.copy(grunt.file.read(path.join(GEMOJI_DEST, image)), image);
      } else {
        non_standard++;
        grunt.file.copy(path.join(GEMOJI_DEST, image), image);
      }
    });
    grunt.log.ok(non_standard, "non standard emojis were detected");
    grunt.log.ok();

    grunt.config.set("emoji_named_list", named_list.join(","));
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

  grunt.registerTask('update', flatten([ update_deps, 'update:gemoji', 'update:emojify.js' ]));
  grunt.registerTask('release', [ 'update', 'uglify:release' ]);
  grunt.registerTask('default', [ 'release' ]);
};


function flatten(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(b);
  });
}
