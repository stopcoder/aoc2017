import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";
import {rotate, flipH} from "./transform.js";

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

	const map = new Map();

	for await (const line of rl) {
		const parts = line.split(" => ");
		map.set(parts[0], parts[1]);
	}

	function genKey(grid) {
		return grid.map((row) => row.join("")).join("/");
	}

	function clone(grid) {
		return grid.map((row) => row.slice());
	}

	// extend the map with the potential 8 variants after rotation and flipping
	for (const gridString of map.keys()) {
		let grid = gridString.split("/").map((s) => s.split(""));

		for (let i = 0; i < 4; i++) {
			grid = rotate(grid, 1);
			let key = genKey(grid);
			map.set(key, map.get(gridString));

			const flipGrid = flipH(clone(grid));
			key = genKey(flipGrid);
			map.set(key, map.get(gridString));
		}
	}

	let g = [".#.", "..#", "###"].map((s) => s.split(""));
	let k = genKey(g);

	console.log(k);
	console.log(map.get(k));

	function extend(g) {
		const parts = [];
		let count;
		let subSize;
		if (g.length % 2 === 0) {
			count = g.length / 2;
			subSize = 2;
		} else if (g.length % 3 === 0) {
			count = g.length / 3;
			subSize = 3;
		} else {
			console.log(`unexpected grid length: ${g.length}`);
		}

		for (let row = 0; row < count; row++) {
			for (let column = 0; column < count; column++) {
				const subGrid = [];
				for (let i = 0 ; i < subSize; i++) {
					subGrid.push(g[row * subSize + i].slice(column * subSize, column * subSize + subSize));
				}

				const key = genKey(subGrid);
				const transformed = map.get(key);

				if (!transformed) {
					console.error(`can't transform ${key}`);
				}

				const newGrid = transformed.split("/");

				for (let i = 0 ; i < newGrid.length; i++) {
					parts[row * newGrid.length + i] ??= "";
					parts[row * newGrid.length + i] += newGrid[i];
				}
			}
		}

		parts.forEach((p, i) => parts[i] = p.split(""));
		return parts;
	}

	//console.log(g)
	for (let i = 0; i < 18; i++) {
		g = extend(g);
		//console.log(g);
	}

	const result = g.reduce((acc, row) => {
		return acc + row.reduce((acc, char) => {
			return acc + (char === "#" ? 1 : 0);
		}, 0);
	}, 0);

	console.log(result);

}

processLineByLine();
