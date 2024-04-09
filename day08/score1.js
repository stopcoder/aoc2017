import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";

const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

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
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const commands = [];

	for await (const line of rl) {
		let [name, inc, value, _, comp, opr, value1] = line.split(" ");
		value = parseInt(value);
		value1 = parseInt(value1);

		inc = (inc === "inc" ? 1 : -1);

		commands.push([name, inc, value, comp, opr, value1]);
	}

	const cache = new Map();
	let max = 0;

	commands.forEach(([name, inc, value, comp, opr, value1]) => {
		let regValue;
		let compValue;

		if (cache.has(name)) {
			regValue = cache.get(name)
		} else {
			regValue = 0;
		}

		if (cache.has(comp)) {
			compValue = cache.get(comp);
		} else {
			compValue = 0;
		}

		let valid = false;

		switch (opr) {
			case "<":
				valid = compValue < value1;
				break;
			case ">":
				valid = compValue > value1;
				break;
			case "<=":
				valid = compValue <= value1;
				break;
			case ">=":
				valid = compValue >= value1;
				break;
			case "==":
				valid = compValue === value1;
				break;
			case "!=":
				valid = compValue !== value1;
				break;
		}

		if (valid) {
			regValue += (inc * value);
		}

		cache.set(name, regValue);
		const result = Math.max.apply(null, [...cache.values()]);

		max = Math.max(result, max);
	});

	console.log(max);
}

processLineByLine();
