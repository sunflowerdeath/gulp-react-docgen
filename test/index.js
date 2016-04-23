var path = require('path')
var assert = require('assert')
var gulp = require('gulp')
var docgen = require('../src/index.js')

describe('gulp-react-docgen', function() {
	var SRC = path.join(__dirname, 'files')
	var stream

	beforeEach(function() {
		stream = gulp.src(path.join(SRC, '*.js'))
	})

	it('generates doc and puts it to json file', function(done) {
		var NAME = 'NAME'
		stream
			.pipe(docgen(NAME))
			.on('data', function(result) {
				assert.equal(result.path, path.join(SRC, NAME + '.json'))
				var doc = JSON.parse(result.contents.toString())
				var buttonDoc = doc['button.js']
				var inputDoc = doc['input.js']
				assert.equal(buttonDoc.description, 'Button description')
				assert.equal(inputDoc.props.maxLength.type.name, 'number')
				done(null)
			})
	})
})
