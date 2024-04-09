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

	const weights = new Map();
	const connection = new Map();

	const seen = new Set();

	for await (const line of rl) {
		if (line.includes(" -> ")) {
			let [parent, children] = line.split(" -> ");
			let [parentName, value] = parent.split(" ");
			value = parseInt(value.substring(1, value.length - 1));
			weights.set(parentName, value);
			children = children.split(", ");
			connection.set(parentName, children);
			children.forEach(child => seen.add(child));
		} else {
			let [parentName, value] = line.split(" ");
			value = parseInt(value.substring(1, value.length - 1));
			weights.set(parentName, value);
		}
	}

	console.log(weights);

	let start;
	for (const key of connection.keys()) {
		if (!seen.has(key)) {
			console.log(key);
			start = key;
		}
	}

	const memo = new Map();

	function accumulatedWeight(node) {
		if (memo.has(node)) {
			return memo.get(node);
		}

		if (!connection.has(node)) {
			if (weights.has(node)) {
			return weights.get(node);
			} else {
				console.log("node weight found for ", node);
			}
		}

		const children = connection.get(node);

		const weight = weights.get(node) + children.reduce((acc, child) => acc + accumulatedWeight(child), 0);

		memo.set(node, weight);
		return weight;
	}

	let diff;
	while (true) {
		const children = connection.get(start);

		const map = new Map();
		children.forEach((child) => {
			const weight = accumulatedWeight(child);
			if (map.has(weight)) {
				const value = map.get(weight);
				value.push(child);
				map.set(weight, value);
			} else {
				map.set(weight, [child]);
			}
		});

		const values = [...map.keys()];
		if (values.length === 1) {
			console.log(start);
			break;
		} else {
			console.log("Child of ", start);
			values.forEach((value) => {
				console.log(value, map.get(value));
			});
			const value = Math.max.apply(null, values);
			diff = Math.abs(values[0] - values[1]);
			start = map.get(value)[0];
		}
	}

	console.log(diff);
	console.log(weights.get(start) - diff);
}

processLineByLine();
