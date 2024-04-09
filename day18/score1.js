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

class Program {
	#commands;
	#curPos;
	otherProgram;
	#buffer;
	#registers;
	#name;
	#sendCount;

	constructor(commands, name) {
		this.#commands = commands;
		this.#curPos = 0;
		this.#buffer = [];
		this.#registers = new Map();
		this.#name = name;
		this.#sendCount = 0;

		if (name === "p1") {
			this.#registers.set("p", 0);
		} else {
			this.#registers.set("p", 1);
		}
	}

	get bufferLength() {
		return this.#buffer.length;
	}

	get nextValue() {
		return this.#buffer.shift();
	}

	get pos() {
		return this.#curPos;
	}

	get sendCount() {
		return this.#sendCount;
	}

	next() {
		if (this.#curPos >= 0 && this.#curPos < this.#commands.length) {
			let [opr, reg, value] = this.#commands[this.#curPos];
			// console.log(this.#name, this.#curPos, opr, reg, value);

			if (typeof value === "string") {
				value = this.#registers.get(value) || 0;
			}

			switch (opr) {
				case "set":
					this.#registers.set(reg, value);
					break;
				case "mul":
					this.#registers.set(reg, (this.#registers.get(reg) || 0) * value);
					break;
				case "add":
					this.#registers.set(reg, (this.#registers.get(reg) || 0) + value)
					break;
				case "mod":
					this.#registers.set(reg, (this.#registers.get(reg) || 0) % value)
					break;
				case "jgz":
					let check;

					if (typeof reg === "number") {
						check = reg;
					} else {
						check = this.#registers.get(reg) || 0;
					}

					if (check > 0) {
						this.#curPos += (value - 1);
					}
					break;
				case "snd":
					this.#buffer.push(this.#registers.get(reg) || 0);
					this.#sendCount++;
					console.log("send", this.#name, this.#buffer.length);
					break;
				case "rcv":
					if (this.otherProgram.bufferLength === 0) {
						console.log("wait", this.#name, this.#curPos);
						return "wait";
					} else {
						const value = this.otherProgram.nextValue;
						this.#registers.set(reg, value);
						console.log("receive", this.#name, value, this.#curPos);
					}
					break;
			}

			// console.log(this.#name, this.#registers);
			this.#curPos++;
		} else {
			return "terminated";
		}
	}
}

async function processLineByLine() {
	const fileStream = fs.createReadStream(filename);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const commands = [];

	for await (const line of rl) {
		const parts = line.split(" ");

		if (parts[1].length > 1 || (parts[1].charCodeAt(0) < "a".charCodeAt(0)
				|| parts[1].charCodeAt(0) > "z".charCodeAt(0))) {
			parts[1] = parseInt(parts[1]);
		}

		if (parts.length === 3 && (parts[2].length > 1 || (parts[2].charCodeAt(0) < "a".charCodeAt(0)
				|| parts[2].charCodeAt(0) > "z".charCodeAt(0)))) {
			parts[2] = parseInt(parts[2]);
		}
		commands.push(parts);
	}

	const p1 = new Program(commands, "p1");
	const p2 = new Program(commands, "p2");

	p1.otherProgram = p2;
	p2.otherProgram = p1;

	let end1;
	let end2;
	let r1;
	let r2;
	let wait1;
	let wait2;

	do {
		r1 = p1.next();
		r2 = p2.next();
		end1 = r1 === "terminated";
		end2 = r2 === "terminated";
		wait1 = r1 === "wait";
		wait2 = r2 === "wait";
	} while (!((end1 && (end2 || wait2)) || (end2 && (end1 || wait1)) || (wait1 && wait2)));

	console.log("p1 end pos", p1.pos);
	console.log("p2 end pos", p2.pos);
	console.log("p1 buffer size", p1.bufferLength);
	console.log("p2 buffer size", p1.bufferLength);
	console.log(end1, end2, wait1, wait2);
	console.log(p1.sendCount);
	console.log(p2.sendCount);
}

processLineByLine();
