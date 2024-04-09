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

	let result = 0;
	for (let row = 0; row < 128; row++) {
		const s = base + "-" + row;
		const hash = knotHash(s);

		result += hash.split("").reduce((acc, c) => {
			acc += parseInt(c, 16).toString(2).split("").reduce((acc, c) => {
				if (c === "1") {
					acc++;
				}

				return acc;
			}, 0);
			return acc;
		}, 0);
	}

	console.log(result);
}

processLineByLine();
