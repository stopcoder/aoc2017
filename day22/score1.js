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

	const grid = new Map();
	let index = 0;

	for await (const line of rl) {
		const chars = line.split("");

		const rowMap = new Map();
		chars.forEach((c, i) => {
			rowMap.set(i, c);
		});

		grid.set(index, rowMap);
		index++;
	}

	console.log(grid.size);
	console.log(grid.get(0).size);

	const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	let dir = 0;
	let r = Math.floor(grid.size / 2);
	let c = Math.floor(grid.get(0).size / 2);

	let count = 0;

	for (let i = 0; i < 10000000; i++) {
		let delta;
		if (!grid.has(r)) {
			grid.set(r, new Map());
		} 

		const row = grid.get(r);
		if (!row.has(c)) {
			row.set(c, ".");
		}

		const value = row.get(c);
		if (value === "#") {
			delta = 1;
			row.set(c, "F");
		} else if (value === ".") {
			delta = -1;
			row.set(c, "W");
		} else if (value === "W") {
			delta = 0;
			row.set(c, "#");
			count++;
		} else {
			delta = 2;
			row.set(c, ".");
		}

		dir = ((dir + delta) % 4 + 4) % 4;
		r += dirs[dir][0];
		c += dirs[dir][1];
	}

	console.log(count);
}

processLineByLine();
