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

	let chars;

	for await (const line of rl) {
		chars = line.split("");
	}

	let garbage = false;
	let ignore = false;

	const stack = [];

	let result = 0;
	chars.forEach((c) => {
		if (garbage) {
			if (ignore) {
				ignore = false;
				return;
			}
			if (c === ">") {
				garbage = false;
				return;
			}
			if (c === "!") {
				ignore = true;
				return;
			}
		} else {
			if (c === "<") {
				garbage = true;
				return;
			}

			if (c === "{") {
				const level = stack.length === 0 ? 1 : stack[stack.length - 1] + 1;
				stack.push(level);
			} else if (c === "}") {
				const level = stack.pop();
				result += level;
			}
		}
	});

	console.log(result);
}

processLineByLine();
