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
	const steps = 12964419;

	const bps = {
		A: [[1, 1, "B"], [0, 1, "F"]],
		B: [[0, -1, "B"], [1, -1, "C"]],
		C: [[1, -1, "D"], [0, 1, "C"]],
		D: [[1, -1, "E"], [1, 1, "A"]],
		E: [[1, -1, "F"], [0, -1, "D"]],
		F: [[1, 1, "A"], [0, -1, "E"]],
	}

	let state = "A";
	let pos = 0;
	let sum = 0;
	const tape = new Map();

	for (let i = 0; i < steps; i++) {
		const value = tape.has(pos) ? tape.get(pos) : 0;
		const ins = bps[state][value];

		if (value === 0 && ins[0] === 1) {
			sum++;
		} else if (value === 1 && ins[0] === 0) {
			sum--;
		}
		tape.set(pos, ins[0]);
		pos += ins[1];
		state = ins[2];
	}

	console.log(sum);
}

processLineByLine();
