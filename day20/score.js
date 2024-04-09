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

	const particles = [];

	for await (const line of rl) {
		const parts = line.split(", ").map((s) => s.substring(3, s.length - 1).split(",").map((s) => parseInt(s)));
		particles.push(parts);
	}

	while (true) {
		let min = Number.MAX_SAFE_INTEGER;
		let minIndex;
		particles.forEach((p, index) => {
			p[1].forEach((_, i) => {
				p[1][i] = p[1][i] + p[2][i];
				p[0][i] = p[0][i] + p[1][i];
			});

			const distance = p[0].reduce((acc, axis) => acc + Math.abs(axis), 0);
			if (distance < min) {
				min = distance;
				minIndex = index;
			}
		});

		console.log(minIndex);
	}
}

processLineByLine();
