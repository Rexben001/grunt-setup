module.exports = function(grunt) {
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({
    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON("package.json"),

    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require("jshint-stylish"), // use jshint-stylish to make our errors look and read good
        esversion: 6
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ["Gruntfile.js", "src/**/*.js"]
    },
    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner:
          '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          "dist/js/magic.min.js": ["src/js/*.js"]
        }
      }
    },
    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          "dist/css/pretty.css": "src/css/pretty.less"
        }
      }
    },
    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner:
          '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          "dist/css/style.min.css": "src/css/style.css"
        }
      }
    },
    // configure watch to auto update ----------------
    watch: {
      // for stylesheets, watch css and less files
      // only run less and cssmin

      css: {
        files: ["src//*.css", "src//*.less"],
        tasks: ["less", "cssmin"],
        // for scripts, run jshint and uglify
        scripts: {
          files: "src/**/*.js",
          tasks: ["jshint", "uglify"]
        }
      }
    }
  });
  //   grunt.registerTask("default", ["jshint", "uglify", "cssmin", "less"]);
  grunt.registerTask("default", ["jshint", "uglify", "cssmin", "less"]);
  grunt.registerTask("dev", [
    "jshint:dev",
    "uglify:dev",
    "cssmin:dev",
    "less:dev"
  ]);

  // only run production configuration
  grunt.registerTask("production", [
    "jshint:production",
    "uglify:production",
    "cssmin:production",
    "less:production"
  ]);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
};
