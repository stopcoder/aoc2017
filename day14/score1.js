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
	const base = "hxtvlmkl";

	function knotHash(s) {
		const steps = s.split("").map(c => c.charCodeAt(0));

		[17, 31, 73, 47, 23].forEach(n => steps.push(n));

		const list = Array.from({length: 256}, (any, index) => index);

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
		for (let i = 0; i < 64; i++) {
			steps.forEach((step, index) => {
				const skip = i * steps.length + index;
				reverse(pos, step);
				pos = (pos + step + skip) % list.length;
				//console.log(list);
			});
		}

		const densed = list.reduce((acc, n, index) => {
			if (index % 16 === 0) {
				acc.push(n);
			} else {
				acc[acc.length - 1] = acc[acc.length - 1] ^ n;
			}

			return acc;
		}, []);


		const result = densed.map(n => {
			let hex = n.toString(16);
			if (hex.length === 1) {
				hex = '0' + hex;
			}

			return hex;
		}).join("");

		return result;
	}

	let map = [];
	for (let r = 0; r < 128; r++) {
		const s = base + "-" + r;
		const hash = knotHash(s);

		const row = hash.split("").reduce((acc, c) => {
			const bits = parseInt(c, 16).toString(2).split("").map((c) => parseInt(c));

			for (let i = 0; i < 4; i++) {
				if (i < 4 - bits.length) {
					acc.push(0);
				} else {
					acc.push(bits[i - (4 - bits.length)]);
				}
			}

			return acc;
		}, []);

		map.push(row);
	}

	const groups= [];

	function genKey(r, c) {
		return `${r},${c}`;
	}

	function contains(r, c) {
		const key = genKey(r, c);

		return groups.some((g) => g.has(key));
	}

	function findGroup(r, c) {
		const queue = [[r, c]];
		const key = genKey(r, c);

		const seen = new Set([key]);

		while (queue.length) {
			const [cr, cc] = queue.shift();

			[[0,1],[1,0],[0,-1],[-1,0]].forEach(([dr,dc]) => {
				const nr = cr + dr;
				const nc = cc + dc;

				const newKey = genKey(nr, nc);

				if (nr >= 0 && nr < map.length && nc >= 0 && nc < map[nr].length && !seen.has(newKey) && map[nr][nc] === 1) {
					seen.add(newKey);
					queue.push([nr, nc]);
				}
			})
		}

		groups.push(seen);

		console.log(r, c, seen);
	}

	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			const value = map[r][c];

			if (value === 1 && !contains(r, c)) {
				findGroup(r, c);
			}
		}
	}

	console.log(groups.length);

}

processLineByLine();
