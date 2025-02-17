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

	const layers = new Map();
	let max;

	for await (const line of rl) {
		const parts = line.split(": ").map((s) => parseInt(s));
		layers.set(parts[0], parts[1]);
		max = parts[0];
	}

	const registry = new Map();

	for (const key of layers.keys()) {
		const divider = layers.get(key) * 2 - 2;
		const rest = (divider - key % divider) % divider;

		if (registry.has(divider)) {
			const aRests = registry.get(divider);
			aRests.add(rest);
		} else {
			registry.set(divider, new Set([rest]));
		}
	}

	console.log(registry);

	let delay = 0;

	while (true) {
		let pass = true;
		for (let i = 0; i <= max; i++) {
			if (layers.has(i) && (i + delay) % (2 * layers.get(i) - 2) === 0) {
				pass = false;
				break;
			}
		}

		if (pass) {
			console.log(delay);
			break;
		} else {
			console.log("not pass", delay);
		}

		delay += 1;
	}

}

processLineByLine();
