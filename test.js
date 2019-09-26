const zparser = require("./zargparse.js")

const opts = [
  { name: 's', vname: 'source', hasValue: true, mandatory: true, help: 'abc is cool'},
  { name: 'v', vname: 'verbose', help: 'abc is cool'},
  { name: 'a', vname: 'all', help: 'abc is cool'},
]

zparser.build(opts);
zparser.add('destination path', 'dst', 'd', true, true);
let arguments = zparser.parse();
console.log(arguments);




