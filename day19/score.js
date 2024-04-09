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


	const grid = [];
	let sc;
	for await (const line of rl) {
		const row = line.split("");
		grid.push(row);
		if (!sc) {
			sc = row.indexOf("|");
		}
	}

	let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
	let dir = [1, 0];

	let r = 0;
	let c = sc;
	let go = true;
	let result = "";
	let count = 1;
	while (go) {
		let nr = r + dir[0];
		let nc = c + dir[1];

		if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[nr].length && grid[nr][nc] !== " ") {
		} else {
			let i = 0;
			for (i = 0; i < dirs.length; i++) {
				if (Math.abs(dirs[i][0]) === Math.abs(dir[0]) && Math.abs(dirs[i][1]) === Math.abs(dir[1])) {
					continue;
				}

				nr = r + dirs[i][0];
				nc = c + dirs[i][1];

				if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[nr].length && grid[nr][nc] !== " ") {
					dir = dirs[i];
					break;
				}
			}
			if (i === 4) {
				break;
			}
		}

		if (grid[nr][nc] !== "+" && grid[nr][nc] !== "-" && grid[nr][nc] !== "|") {
			result += grid[nr][nc];
		}
		r = nr;
		c = nc;
		count++;
	}

	console.log(result);
	console.log(count);
}

processLineByLine();
