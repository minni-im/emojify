/*! see https://github.com/roulotte/emojify */

var punycode            = require('punycode'),
    codepoints          = punycode.ucs2.decode,
    str_from_codepoints = punycode.ucs2.encode;

var db = require('./emoji.json'),
    all,
    by_name = {},
    by_unicode = {};


var VARIATION_SELECTOR_16 = 0xfe0f;

function rjust(str, char, max) {
  while (str.length < max) {
    str = char + str;
  }
  return str;
}

var Character = function Character(name) {
  this.aliases = name ? [name] : [];
  this.unicode_aliases = [];

  Object.defineProperty(this, 'name', {
    'enumerable': true,
    'get': function() {
      return this.aliases[0];
    }
  });

  Object.defineProperty(this, 'raw', {
    'enumerable': true,
    'get': function() {
      return this.unicode_aliases[0];
    }
  });

  Object.defineProperty(this, 'custom', {
    'enumerable': true,
    'get': function() {
      return !this.raw;
    }
  });

  this.tags = [];

  Object.defineProperty(this, 'image_filename', {
    'enumerable': true,
    'get': function() {
      if (this.custom) {
        return this.name + '.png';
      } else {
        return 'unicode/' + this.hex_inspect().replace('-'+VARIATION_SELECTOR_16.toString(16), '') + '.png';
      }
    }
  });

};

Character.prototype.toString = function() {
  var hex = this.custom ? '' : this.hex_inspect();
  return "<Emoji:" + this.name +" ("+ hex + ")> " + JSON.stringify(this);
};

Character.prototype.add_alias = function(name) {
  this.aliases.push(name);
};

Character.prototype.add_unicode_alias = function(str) {
  this.unicode_aliases.push(str);
};

Character.prototype.add_tag = function(tag) {
  this.tags.push(tag);
};

Character.prototype.hex_inspect = function() {
  return codepoints(this.raw).map(function(c) {
    return rjust(c.toString(16), "0", 4);
  }).join('-');
};

function parse_data_file() {
  db.forEach(function(raw_emoji) {
    var emoji = emojify.create(undefined, function(emoji) {
      var raw = raw_emoji.emoji, variation_16;
      raw_emoji.aliases.forEach(function(a) {
        emoji.add_alias(a);
      });

      if (raw) {
        emoji.add_unicode_alias(raw);
        variation_16 = str_from_codepoints(codepoints(raw).filter(function(cp) {
          return cp != VARIATION_SELECTOR_16; }).concat([VARIATION_SELECTOR_16]));
        if (raw !== variation_16) {
          emoji.add_unicode_alias(variation_16);
        }
      }

      raw_emoji.tags.forEach(function(t) {
        emoji.add_tag(t);
      });
      return emoji;
    });
  });
}


var emojify = {
  /**
   * @public
   */
  create: function(name, callback) {
    var emoji = new Character();
    this.all.push(this.edit_emoji(emoji, callback));
    return emoji;
  },

  /**
   * @public
   */
  edit_emoji: function(emoji, callback) {
    if (callback) {
      emoji = callback(emoji);
    }

    emoji.aliases.forEach(function(name) {
      by_name[name] = emoji;
    });
    emoji.unicode_aliases.forEach(function(unicode) {
      by_unicode[unicode] = emoji;
    });

    return emoji;
  },

  get all () {
    if (all !== undefined) {
      return all;
    }
    all = [];
    parse_data_file();
    return all;
  },

  /**
   * Find an emoji by its aliased name.
   * @public
   * @return emoji or undefined if missing
   */
  find_by_alias: function(name) {
    this.all && void(0);
    return by_name[name];
  },

  /**
   * Find an emoji by its unicode character.
   * @public
   * @return emoji or undefined if missing
   */
  find_by_unicode: function(unicode) {
    this.all && void(0);
    return by_unicode[unicode];
  }
};

module.exports = emojify;
