import download from "./download.mjs";
import parse from "./parse.mjs";
import generate from "./generate.mjs";

(async () => {
	await download();
	console.log("");
	await parse();
	console.log("");
	await generate();
})();
