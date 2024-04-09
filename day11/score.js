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

	const dirs = ["n", "ne", "se", "s", "sw", "nw"];

	let steps;
	for await (const line of rl) {
		steps = line.split(",").map(s => dirs.indexOf(s));
		console.log(steps);

		let start = 0;
		do {
			let length = steps.length;

			for (let i = start + 1; i < steps.length; i++) {
				const distance = Math.abs(steps[i] - steps[start]);
				if (distance === 3) {
					steps.splice(i, 1);
					steps.splice(start, 1);
					break;
				} else if (distance === 2 || distance === 4) {
					let target;
					if (distance === 2) {
						target = (steps[i] + steps[start]) / 2;
					} else {
						target = ((steps[i] + steps[start] + 6) / 2) % 6;
					}

					steps[start] = target;
					steps.splice(i, 1);
					break;
				}
			}

			let newLength = steps.length;

			if (newLength === length) {
				start++;
			} else {
				start = 0;
			}
		} while (start < steps.length)


		console.log(steps.length);
	}

}

processLineByLine();
