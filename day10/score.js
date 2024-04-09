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

	let steps;

	for await (const line of rl) {
		steps = line.split(",").map(c => parseInt(c));
	}

	const list = Array.from({length: 256}, (any, index) => index);
	console.log(list);

	function reverse(start, count) {
		for (let i = 0; i < Math.floor(count / 2); i++) {
			const a = (start + i) % list.length;
			const b = (start + count - 1 - i) % list.length;

			const temp = list[a];
			list[a] = list[b];
			list[b] = temp;
		}
	};

	let pos = 0;

	steps.forEach((step, skip) => {
		reverse(pos, step);
		pos = (pos + step + skip) % list.length;
		console.log(list);
	});



	console.log(list[0] * list[1]);
}

processLineByLine();
