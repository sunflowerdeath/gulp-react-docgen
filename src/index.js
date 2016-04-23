var path = require('path')
var _ = require('underscore')
var through2 = require('through2')
var reactDocgen = require('react-docgen')
var File = require('vinyl')

/**
 * @param {string} filename - File where to put results.
 * @param {object} [options]
 * @param {boolean} [options.logErrors=false] - When `true`, log to console react-docgen errors.
 */
module.exports = function docgen(filename, options) {
	if (options === undefined) options = {}

	var base
	var files = []

	function write(file, enc, cb) {
		if (!base) base = file.base
		if (file.isNull()) return
		files.push(file)
		cb()
	}

	function end(cb) {
		if (!files.length) return

		var result = {}
		files.forEach(function(file) {
			var content = file.contents.toString()
			var doc
			try {
				doc = reactDocgen.parse(content)
			} catch(err) {
				if (options.logErrors) {
					console.log('Error, file: ', file.path, err)
				}
			}
			if (doc) result[file.relative] = doc
		})

		this.push(new File({
			contents: new Buffer(JSON.stringify(result)),
			base: base,
			path: path.join(base, filename)
		}))

		cb()
	}

	return through2.obj(write, end)
}
