import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';


const { find_path, single_source_shortest_paths } = dijkstra;
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
	const data = 361527;


	function getAxis(num) {
		let acc = 1;
		let delta = 0;

		while (acc < num) {
			delta += 2;
			acc += delta * 4;
		}

		if (delta === 0) {
			return [0, 0];
		}

		if (acc === num) {
			return [delta/2, delta/2];
		}

		const previous = acc - delta * 4;

		if (previous + delta >= num) {
			return [delta / 2 - 1 - (num - previous - 1), delta / 2];
		} else if (previous + 2 * delta >= num) {
			return [- delta / 2, delta / 2 - (num - previous - delta)];
		} else if (previous + 3 * delta >= num) {
			return [- delta / 2 + (num - previous - 2 * delta), - delta / 2];
		} else {
			return [delta / 2, - delta / 2 + (num - previous - 3 * delta)];
		}
	}


	const map = new Map();

	function getKey(r, c) {
		return `${r},${c}`;
	}

	for (let i = 1; i <= 100; i++) {
		const [r, c] = getAxis(i);
		map.set(getKey(r, c), i);
	}

	const values = new Map();

	values.set(getKey(0, 0), 1);

	let value = 1;
	let num = 1;

	const ds = [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];
	while (value < data) {
		num++;
		const [r, c] = getAxis(num);

		value = ds.reduce((acc, [dr, dc]) => {
			const nr = r + dr;
			const nc = c + dc;
			const key = getKey(nr, nc);

			if (map.has(key)) {
				const value = map.get(key);

				if (value < num) {
					return acc + values.get(key);
				}
			} else {
				console.log("cache not enough", [nr, nc]);
			}

			return acc;
		}, 0);

		values.set(getKey(r, c), value);
		console.log([r, c]);
	}

	console.log(value);
}

processLineByLine();
