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

	let banks;

	for await (const line of rl) {
		banks = line.split(" ").map(b => parseInt(b));
	}

	function getKey(banks) {
		return banks.join(",");
	}

	const seen = new Set();

	let key = getKey(banks);
	let count = 0;
	console.log(banks);
	let repeatKey;
	do {
		seen.add(key);
		const maxIndex = banks.reduce((acc, b, i) => banks[i] > banks[acc] ? i : acc, 0);

		let value = banks[maxIndex];
		banks[maxIndex] = 0;

		let start = (maxIndex + 1) % banks.length;

		while (value > 0) {
			banks[start]++;
			value--;
			start = (start + 1) % banks.length;
		}

		console.log(banks);

		key = getKey(banks);

		if (!repeatKey) {
			if (seen.has(key)) {
				repeatKey = key;
			}
		} else {
			count++;
			if (key === repeatKey) {
				break;
			}
		}
	} while (true);

	console.log(count);
}

processLineByLine();
