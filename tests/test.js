const zparser = require("./zargparse.js")

describe("Testing the Zargparse js file ", () => {

	beforeEach(()=> {
		const opts = [
			{ name: 's', vname: 'source', hasValue: true, mandatory: true, help: 'abc is cool'},
			{ name: 'v', vname: 'verbose', help: 'abc is cool'},
			{ name: 'a', vname: 'all', help: 'abc is cool'},
		]
  })

  it("should not create a gift without amount", async () => {
    zparser.build(opts);
		zparser.add('destination path', 'dst', 'd', true, true);
		let arguments = zparser.parse();
		expect(arguments).not.toBeNull();
  })

})
