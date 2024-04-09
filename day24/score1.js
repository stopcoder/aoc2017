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

	const map = new Map();

	for await (const line of rl) {
		const parts = line.split("/").map((c) => parseInt(c));

		if (map.has(parts[0])) {
			map.get(parts[0]).add(parts[1]);
		} else {
			map.set(parts[0], new Set([parts[1]]));
		}

		if (map.has(parts[1])) {
			map.get(parts[1]).add(parts[0]);
		} else {
			map.set(parts[1], new Set([parts[0]]));
		}
	}

	const seen = new Set();
	let max = 0;
	let maxLength = 0;

	function sum() {
		let res = 0;
		for (const key of seen) {
			const parts = key.split(",").map((c) => parseInt(c));
			res += (parts[0] + parts[1]);
		}
		return res;
	}

	function genKey(p1, p2) {
		if (p1 > p2) {
			return `${p2},${p1}`;
		} else {
			return `${p1},${p2}`;
		}
	}

	function dfs(port) {
		const nextPorts = map.get(port);

		if (!nextPorts) {
			if (seen.size > maxLength) {
				maxLength = seen.size;
				max = sum();
			} else if (seen.size === maxLength) {
				max = Math.max(max, sum());
			}
			return;
		}

		let found = false;
		for (const next of nextPorts) {
			const key = genKey(port, next);

			if (!seen.has(key)) {
				found = true;
				seen.add(key);
				dfs(next);
				seen.delete(key);
			}
		}

		if (!found) {
			if (seen.size > maxLength) {
				maxLength = seen.size;
				max = sum();
			} else if (seen.size === maxLength) {
				max = Math.max(max, sum());
			}
		}
	}

	console.log(map);
	dfs(0);

	console.log(max);
}

processLineByLine();
