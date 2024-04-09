import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";

const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

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

	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const values = new Map();
	const connection = new Map();

	const seen = new Set();

	for await (const line of rl) {
		if (line.includes(" -> ")) {
			let [parent, children] = line.split(" -> ");
			let [parentName, value] = parent.split(" ");
			value = parseInt(value.substring(1, value.length - 1));

			values.set(parentName, value);
			children = children.split(", ");
			connection.set(parentName, children);

			children.forEach(child => seen.add(child));
		}
	}

	for (const key of connection.keys()) {
		if (!seen.has(key)) {
			console.log(key);
		}
	}

}

processLineByLine();
