# zargparse
Zero (dependencies) command line argument parser

### dependencies
No dependencies

### Use as a module
The simplest use is configure the parser to look for options by providing an array
```
const zparser = require("./zargparse.js")    
    
const opts = [    
  { name: 's', vname: 'source', help: 'source path', hasValue: true, mandatory: true },    
  { name: 'v', vname: 'verbose', help: 'verbose format'},    
  { name: 'a', vname: 'all', help: 'include all output'}   
]    
    
zparser.build(opts);       
let arguments = zparser.parse(); 
console.log(arguments)
```
Another way of 
In both cases the parser will return a dictionary which contains an entry for each option found along with the value read
```
$ node test.js -a --source=path/to/res --dst=/path/to/dest free_arg1 free_arg2
{ all: true,
  source: 'path/to/res',
  dst: '/path/to/dest',
  free_args: [ 'free_arg1', 'free_arg2' ] }
```
If a mandatory option is not found -1 is returned and an error message is logged on the error console. The behaviour is the same whenever an argument is found for an option that do not require one or if the opposite occurs.
