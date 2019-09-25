function print_help(conf) {
  // Checking mandatory arguments
  if (!(conf.description && conf.name)) {
    throw "Missing argument";
    return -1;
  }

  // Parsing simple fields
  const dscr_str = `Description: ${conf.description}`;
  const author_str = `Author: ${conf.author}`;
  const name_str = `${conf.name} (v${conf.version})`;  
  // Parsing argument options
  let opt_str = [];
  for (let e of conf.options) {
    // Checking mandatory entry format
    if (!(e.vname && e.help)) {
      throw `Bad format for argument ${e.key}`;
      return -1;
    }
    let estr = `\t --${e.vname}${e.name ? ", -"+e.name : ""} \t ${e.help} ${e.mandatory ? "(mandatory)": ""}`;
    opt_str.push(estr);
  }
  opt_str = opt_str.join("\n");
  // Printing help string
  console.log([name_str, dscr_str, author_str, "options: ", opt_str].join("\n"));
}

function argparse(args, conf) {
  let res = {};
  let free_args = [];
  args = args.slice(2, args.length);

  // Expanding short multi args 
  // (e.g "$ app -uv" -> "$ app -u -v") ----- //
  joined_args = args.join(" ");  
  args_expl = joined_args.replace(/(?<![-])-\w{2,}/g, (x) => { 
    x = x.slice(1);
    x = x.replace(/(.{0})/g," -");
    return x.slice(0, x.length-1).trim();
  });
  args = args_expl.split(" ");

  // Scanning arguments ----- //
  for (let i=0; i<args.length; i++) {
    const s = args[i];
    let key; let value; // key-value to match
    let match; // entry in conf
    
    if (s.charAt(0)!="-") /* free args */ { 
      free_args.push(s);
      continue;
    } 
    else if (free_args.length!=0) /* found arg after free args */ {
      print_help(conf);
      console.error("Wrong command format, free arguments must appear at the end");
      return -1;
    }

    // Exploding key-value
    if (s.charAt(1)=="-") /* vname format: --x=v */ {
      expl_idx = s.indexOf("=");
      key = (expl_idx != -1 ? s.substr(0, expl_idx) : s);
      key = key.replace(/-/g, "");
        // value = s.substr(expl_idx+1);
    }
    else /* short format: x v */ {
      key = s.replace(/-/g, "");
    }

    // Matching conf ----- //
    match = conf.options.find((conf_entry) => { 
      return (conf_entry.name==key || conf_entry.vname==key);
    });
    if (!match) {
      print_help(conf);
      console.error(`Unknown argumen ${key}`);
      return -1;
    }
    
    // Default actions ----- //
    if (match.vname == "help") {
      print_help(conf);
      return 0;
    }
    else if (match.vname == "version") {
      console.log(conf.version);
      return 0;
    }
    
    // Parsing arg if mandatory ----- //
    if (match.hasValue) {
      if (s.charAt(1)=="-") {
        if (expl_idx==-1) {
          print_help(conf);
          console.error(`${key} value not provided`);
          return -1;
        }
        value = s.substr(expl_idx+1);
      }
      else {
        value = args[i+1];
        i+=1;
      }
    }

    key = match.vname;
    res[key] = value ? value : true; // Default value for key
  }

  // Checking mandatory arguments ----- //
  let mandatory = conf.options.filter(e => e.mandatory); 
  for (let marg of mandatory) {
    if (!res[marg.vname]) {
      print_help(conf);
      console.log(`missing mandatory argument: ${marg.vname ? marg.vname : marg.name}`)
      return -1;
    }
  }

  res.free_args = free_args;
  return res;
}

class zparser { 
  constructor () {
    this.conf = { 
      options: [ { name: 'h', vname: 'help', help: 'print this message' } ] 
    };
  }

  build (t_options, t_json_path) {
    let options = t_options ? t_options : [];
    let json_path = t_json_path ? t_json_path : "./package.json"; 
    let conf_json = require(json_path);
    // TODO check conf_json is in the correct format
    this.conf = {
      name: conf_json.name,
      author: conf_json.author,
      version: conf_json.version,
      description: conf_json.description,
      options: options
    }
  }

  add (thelp, tvname, tname, thasValue, tmandatory) {
    // TODO check correct format of opt
    this.conf.options.push({ 
      help: thelp,
      name: tname, vname: tvname, 
      hasValue: thasValue, mandatory: tmandatory
    });
  }
  
  parse (t_args) { 
    let args = t_args ? t_args : process.argv;
    return argparse(args, this.conf);
  }
}
module.exports = new zparser();

