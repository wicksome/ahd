const fs = require('fs-extra'),
	writeln = require("./utils").writeln,
    execSync = require("child_process").execSync,
	config = require("../../config"),
    columnify = require('columnify');

const list = module.exports = {};
const func = {};
const status = {
	ENABLE: "  +".bold.green,
	DISABLE: "  -".bold.red
}

// get annotation
// annotation=$(head -n 1 annotation.test) && if [[ $annotation =~ ^# ]] ; then echo $annotation; fi

list.exec = function(args, opt) {
    
    let list = [];

	if ("enable" in opt) {
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		enableHeaders.forEach(header => {
            list.push({
                "status": status.ENABLE,
                "header": header,
                "desc": func.getDesc(header)
            });
		});
	} else if ("disable" in opt) {
		const headers = fs.readdirSync(config._saveDir);
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		headers.forEach(header => {
			if (!enableHeaders.includes(header)) {
                list.push({
                    "status": status.DISABLE,
                    "header": header,
                    "desc": func.getDesc(header)
                });
			}
		});
	} else {
		const headers = fs.readdirSync(config._saveDir);
		const enableHeaders = fs.readFileSync(config._ahdStatus, "utf8").toString().split("\n").filter(Boolean);
		headers.forEach(header => {
            list.push({
                "status": enableHeaders.includes(header) ? status.ENABLE : status.DISABLE,
                "header": enableHeaders.includes(header) ? header.white : header.gray,
                "desc": func.getDesc(header)
            });
		});
	}

    console.log(columnify(list, {
        showHeaders: false,
        config: {
            status: {
                align: "center"
            }
        }
    }));
};

func.getDesc = function(headerFileName) {
    const desc = execSync(`head -n 1 ~/.ahd/${headerFileName}`).toString().replace(/\n$/, '');
    return /^#/.test(desc) ? desc.gray : "";
}
