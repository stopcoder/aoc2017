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

	const registers = new Map();

	const commands = [];

	for await (const line of rl) {
		const parts = line.split(" ");
		if (parts.length === 3 && (parts[2].length > 1 || (parts[2].charCodeAt(0) < "a".charCodeAt(0)
				|| parts[2].charCodeAt(0) > "z".charCodeAt(0)))) {
			parts[2] = parseInt(parts[2]);
		}
		commands.push(parts);
	}

	console.log(commands);

	let curPos = 0;
	let played;

	while (curPos >= 0 && curPos < commands.length) {
		let [opr, reg, value] = commands[curPos];
		console.log(curPos, opr, reg, value);

		if (typeof value === "string") {
			value = registers.get(value) || 0;
		}

		let recovered = false;

		switch (opr) {
			case "set":
				registers.set(reg, value);
				break;
			case "mul":
				registers.set(reg, (registers.get(reg) || 0) * value);
				break;
			case "snd":
				played = registers.get(reg) || 0;
				break;
			case "add":
				registers.set(reg, (registers.get(reg) || 0) + value)
				break;
			case "mod":
				registers.set(reg, (registers.get(reg) || 0) % value)
				break;
			case "rcv":
				if ((registers.get(reg) || 0) !== 0) {
					recovered = true;
					console.log("recovered", played);
				}
				break;
			case "jgz":
				if ((registers.get(reg) || 0) !== 0) {
					curPos += (value - 1);
				}
				break;
		}

		console.log(registers);

		curPos++;

		if (recovered) {
			break;
		}
	}

	console.log();
}

processLineByLine();
