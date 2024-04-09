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

	const edges = new Map();

	for await (const line of rl) {
		const [start, end] = line.split(" <-> ");
		const nexts = end.split(", ");

		edges.set(start, nexts);
	}

	function findGroup(start) {
		const seen = new Set([start]);
		const queue = [start];

		while (queue.length) {
			const v = queue.shift();
			const nexts = edges.get(v);

			if (nexts) {
				nexts.forEach((nv) => {
					if (!seen.has(nv)) {
						seen.add(nv);
						queue.push(nv);
					}
				});
			}
		}

		return seen;
	}

	const groups = [];

	for (const v of edges.keys()) {
		const contained = groups.some((group) => group.has(v));

		if (!contained) {
			groups.push(findGroup(v));
		}
	}

	console.log(groups.length);
}

processLineByLine();
