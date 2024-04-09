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

	const registers = new Map([["a", 1]]);

	const commands = [];

	for await (const line of rl) {
		const parts = line.split(" ");
		if (parts[1].length > 1 || (parts[1].charCodeAt(0) < "a".charCodeAt(0)
				|| parts[1].charCodeAt(0) > "z".charCodeAt(0))) {
			parts[1] = parseInt(parts[1]);
		}

		if (parts.length === 3 && (parts[2].length > 1 || (parts[2].charCodeAt(0) < "a".charCodeAt(0)
				|| parts[2].charCodeAt(0) > "z".charCodeAt(0)))) {
			parts[2] = parseInt(parts[2]);
		}
		commands.push(parts);
	}

	console.log(commands);


	let h = 0;
	let g;
	for (let b = 105700; b <= 122700; b += 17) {
		let f = 1;
		for (let d = 2; d <= b; d++) {
			if (b % d === 0 && b / d >= 2) {
				f = 0;
			}
		}

		if (f === 0) {
			h++;
		}
	}
	console.log(h);
}

processLineByLine();
