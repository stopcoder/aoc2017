import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";

const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;
const filename = "input";

/*
const arr = [1, 2, 3, 4, 5];
const que = new PriorityQueue(
    // initialize the incoming arr, the complexity of doing so is O(n)
    arr,
    // this will create a small root heap, the default is a large root heap
    (x, y) => x - y
);
console.log(que.pop());
*/

/*
const graph = {
	a: {b: 10, c: 100, d: 1},
	b: {c: 10},
	d: {b: 1, e: 1},
	e: {f: 1},
	f: {c: 1},
	g: {b: 1}
};
// All paths from 'a'
const paths = single_source_shortest_paths(graph, 'a');
console.log(paths);
*/

async function processLineByLine() {
	const fileStream = fs.createReadStream(filename);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const steps = [];

	for await (const line of rl) {
		const parts = line.split(",");

		parts.forEach((part) => {
			const rest = part.substring(1);
			if (part[0] === "s") {
				steps.push(["s", parseInt(rest)]);
			} else if (part[0] === "x") {
				const result = rest.split("/").map((s) => parseInt(s));
				result.unshift("x");

				steps.push(result);
			} else {
				const result = rest.split("/");
				result.unshift("p");

				steps.push(result);
			}
		});
	}


	const map = new Map();
	let chars = [];
	for (let i = 0; i < 16; i++) {
		const char = String.fromCharCode("a".charCodeAt(0) + i);
		map.set(char, i);
		chars.push(char);
	}

	const cache = new Map();


	let key = chars.join("");
	let index = 0;
	while (!cache.has(key)) {
		cache.set(key, index);
		steps.forEach((step) => {
			if (step[0] === "s") {
				for (let i = 0; i < step[1]; i++) {
					const char = chars.pop();
					chars.unshift(char);
				}
			} else if (step[0] === "x") {
				const char = chars[step[1]];
				chars[step[1]] = chars[step[2]];
				chars[step[2]] = char;
			} else {
				const i1 = chars.indexOf(step[1]);
				const i2 = chars.indexOf(step[2]);
				const char = chars[i1];
				chars[i1] = chars[i2];
				chars[i2] = char;
			}
		});
		index++;
		key = chars.join("");
	}

	console.log(index);
	console.log(cache.get(key));

	const length = index - cache.get(key);
	const rest = 1000000000 % length;

	chars = [];
	for (let i = 0; i < 16; i++) {
		const char = String.fromCharCode("a".charCodeAt(0) + i);
		chars.push(char);
	}

	for (let i = 0; i < rest; i++) {
		steps.forEach((step) => {
			if (step[0] === "s") {
				for (let i = 0; i < step[1]; i++) {
					const char = chars.pop();
					chars.unshift(char);
				}
			} else if (step[0] === "x") {
				const char = chars[step[1]];
				chars[step[1]] = chars[step[2]];
				chars[step[2]] = char;
			} else {
				const i1 = chars.indexOf(step[1]);
				const i2 = chars.indexOf(step[2]);
				const char = chars[i1];
				chars[i1] = chars[i2];
				chars[i2] = char;
			}
		});
	}

	console.log(chars.join(""));
}

processLineByLine();
