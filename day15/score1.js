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
	const start = (new Date()).getTime();
	let valueA = 618;
	let valueB = 814;

	const factorA = 16807;
	const factorB = 48271;

	const divider = 2147483647;

	let result = 0;
	let count = 0;
	let submitA = null;
	let submitB = null;

	while (count < 5000000) {
		if (submitA !== null && submitB !== null) {
			count++;

			let binaryA = valueA.toString(2);
			binaryA = binaryA.substring(binaryA.length - 16);

			let binaryB = valueB.toString(2);
			binaryB = binaryB.substring(binaryB.length - 16);

			if (binaryA === binaryB) {
				result++;
			}

			submitA = null;
			submitB = null;
		}
		if (submitA === null) {
			valueA *= factorA;
			valueA %= divider;

			if (valueA % 4 === 0) {
				submitA = valueA;
			}
		}

		if (submitB=== null) {
			valueB *= factorB;
			valueB %= divider;

			if (valueB % 8 === 0) {
				submitB = valueB;
			}
		}
	}

	console.log(result);
	console.log((new Date()).getTime() - start);
}

processLineByLine();
