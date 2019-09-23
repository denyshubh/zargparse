const zargparse = require("./zargparse.js")

const opts = [
  { name: 's', vname: 'source', hasValue: true, mandatory: true, help: 'abc is cool'},
  { name: 'd', vname: 'dst', hasValue: true, mandatory: true, help: 'dst dst abc'},
  { name: 'v', vname: 'verbose', help: 'abc is cool'},
  { name: 'a', vname: 'all', help: 'abc is cool'},
  { name: 'h', vname: 'help', help: 'print this message' }
]

z = zargparse(opts);
console.log(z);

