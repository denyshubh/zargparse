const assert = require('assert')
const zparser = require("./main.js")

const defaultParam = [
  { name: 's', vname: 'source', hasValue: true, mandatory: true, help: 'The source directory.'},
  { name: 'o', vname: 'outdir', hasValue: true, mandatory: false, help: 'The destinantion directory.'},
  { name: 'v', vname: 'verbose', help: 'Prints a more verbose logging.'},
  { name: 'a', vname: 'all', help: 'Applies to all files.'},
]

const defaultArgs = ["node", "my-package.js", "-a", "-s", "src", "-o", "out", "arg1", "arg2"]

describe("Constructor", function() {
  it("accept param object as configuration", function() {
    const parser = new zparser(defaultParam)
    const arguments = parser.parse(defaultArgs)
    const expected = {
      "all": true,
      "source": "src",
      "outdir": "out",
      free_args: [ "arg1", "arg2" ]
    }
    assert.deepEqual(arguments, expected)
  })

  /*it("long options allow dashes", function() {
    // config
    const param = [{ name: 'l', vname: 'long-opt', hasValue: true, mandatory: true, help: 'A long option.'}]
    const args = ["node", "my-package.js", "--long-opt=something"]
    const expected = {
      "long-opt": "something",
      free_args: [ ]
    }
    // run
    const parser = new zparser(param)
    const arguments = parser.parse(args)
    assert.deepEqual(arguments, expected)
  })*/
}) 