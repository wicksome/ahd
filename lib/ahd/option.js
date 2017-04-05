const option = module.exports = {};

const optList = {
	"help" : {
		shortcut : "h",
		desc : "Output usage information."
	},
	"version" : {
		shortcut : "v",
		desc : "Output the version number"
	},
	"enable" : {
		shortcut : "e",
		arg_name : "header",
		arg_type : String,
		desc : "Enable header"
	},
	"enable-only" : {
		shortcut : "eo",
		arg_name : "header",
		arg_type : String,
		desc : "Enable headers matched and disable other headers"
	},
	"disable" : {
		shortcut : "d",
		arg_name : "header",
		arg_type : String,
		desc : "Disable header"
	},
	"enable-all" : {
		shortcut : "ea",
		desc : "Enable all header"
	},
	"disable-all" : {
		shortcut : "da",
		desc : "Disable all header"
	}
};

let known = {},
	shortcut = {};

Object.keys(optList).forEach(function(key) {
	known[key] = optList[key].arg_type ? optList[key].arg_type : Boolean;
	shortcut[optList[key].shortcut] = "--" + key;
});

option.optlist = optList;
option.known = known;
option.shortcut = shortcut;