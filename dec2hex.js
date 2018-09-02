#!/usr/bin/env node
const fs = require("fs");
const yargs = require("yargs").argv;
const margs = require("minimist")(process.argv.slice(2));
let file = "";
let input = "";
let text = "";
let output = ""; 
let t = 0;
if(yargs.file || margs.f) file = yargs.file || margs.f;
if(file == ""){
	console.log("need file");
	return;
}
fs.readFile(file, "utf-8", (err, content) => {
	if(err) throw err;
	let dec2hex = (number) => {
		if (number < 0) number = 0xFFFFFFFF + number + 1;
		return "0x" + number.toString(0x10).toUpperCase();
	}
	let nums = content.match(/\d+/g);
	text = content.replace(/\d+/g, match => {
		/*==============================================================*/
		/*==============================================================*/
		/*==============================================================*/
		output = content.split(match)[0];
		return (
			((output || "").match(/\"/g) || "").length%2 == 1 ||
			((output || "").match(/\'/g) || "").length%2 == 1) ? match : dec2hex(Number(match));
		/*==============================================================*/
		/*==============================================================*/
		/*==============================================================*/
	});
	console.log(text)
	if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
	fs.writeFile(`dist/${file}`, text, function(err, data){
		if (err) console.log(err);
	});
})