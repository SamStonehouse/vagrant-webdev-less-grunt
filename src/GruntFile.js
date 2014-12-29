module.exports = function(grunt) {
	var autoprefixer = require('less-plugin-autoprefix');

	var scriptSource = [
		"scripts/app/app.js",
		"scripts/app/*.js",
		"scripts/app/**/*.js",
	];

	var scriptDest = "public/assets/scripts/app.js";

	var styleDest = "public/assets/styles/style.css";

	grunt.initConfig({
		concat: {
			libs: {
				src: ["scripts/lib/*.js", "scripts/lib/**/*.js"],
				dest: "public/assets/scripts/libs.js"
			},
			main:{
				src: scriptSource,
				dest: scriptDest
			}
		},
		concat_sourcemap: {
			main: {
				files:{
					"public/assets/scripts/app.js": scriptSource
				}
			}
		},
		less: {
			development: {
				options: {
					plugins: [
						new autoprefixer({browsers: ["last 2 versions"]})
					],
					sourceMap: true,
					sourceMapURL: "style.css.map",
				},
				files: {
					"public/assets/styles/style.css": "styles/less/style.less"
				}
			},
			production: {
				options: {
					plugins: [
						autoprefixer({browsers: ["last 2 versions"]})
					],
					sourceMap: false,
				},
				files: {
					"public/assets/styles/style.css": "styles/less/style.less"
				}
			}
		},
		watch: {
			styles: {
				files: ['styles/less/*'],
				tasks: ['dev'],
				options: {

				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat:libs', 'concat_sourcemap:main', 'less:development']);
	grunt.registerTask('dev', ['concat:libs', 'concat_sourcemap:main', 'less:development']);
	grunt.registerTask('prod', ['concat:libs', 'concat:main', 'less:production']);
	grunt.registerTask('scripts', ['concat:libs', 'concat_sourcemap:main']);
	grunt.registerTask('styles', ['less:development']);
	grunt.registerTask('watch-styles', ['watch:styles']);

};