path = require 'path'
fs = require 'fs'

class Emojify
	images_path: path.normalize( path.join __dirname, '..', 'images')
	constructor: ->
		@mappings = {}
		@inverted_mappings = {}
		@init_names()
		@init_reverted_names()

		@names = Object.keys(@mappings).sort()
		@unicodes = Object.keys(@inverted_mappings)

		@custom = ( =>
			clone = Object.keys(@mappings).slice(0)
			clone.filter (item) => @mappings[item] is null ? true : false
		)()

	unicode_for: (name) ->
		if name in @inverted_mappings
			return @mappings[name][0]
		null

	name_for: (unicode) ->
		if unicode in @inverted_mappings
			return @inverted_mappings[unicode]
		null
		


	init_names: ->
		emoji_path = path.join @images_path, 'emoji'
		fs.readdirSync(emoji_path).forEach (filename) =>
			name = path.basename filename, '.png'
			filename = path.join emoji_path, filename
			stats = fs.lstatSync filename
			return if stats.isDirectory()
			if stats.isSymbolicLink()
				unicode_filename = path.join(emoji_path, fs.readlinkSync(filename))
				@mappings[name] = []

				while true
					codepoints = unicode_filename.match(/unicode\/([\da-f\-]+)\.png/)[1]
					@mappings[name] = [codepoints.split("-").map((bit) -> String.fromCharCode(parseInt(bit,16))).join('')]
					
					unicode_stats = fs.lstatSync unicode_filename
					if unicode_stats.isSymbolicLink()
						unicode_filename = path.join(emoji_path, 'unicode', fs.readlinkSync(unicode_filename))
					else
						break

			else
				@mappings[name] = null
				#console.log name	 	

	init_reverted_names: ->
		for mapping, unicode of @mappings
			#console.log mapping, unicode
			continue unless unicode
			@inverted_mappings[unicode[0]] = mapping


emojify = new Emojify()
#console.log emojify.unicodes

console.log "☀" is String.fromCharCode(parseInt("2600", 16))
console.log emojify.unicode_for("lightning");

console.log emojify.name_for(String.fromCharCode(parseInt("2600", 16)));
console.log emojify.unicode_for("sunny");
module.exports = emojify

