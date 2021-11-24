/**
 * Created by user on 2018/9/23/023.
 */

import { lazy_unique, array_unique as array_hyper_unique } from '../src/index';
import { equals } from '../src/index';
import getTestcase from './_data';
import { createWriteStream } from 'fs';
import stripAnsi from 'strip-ansi';

import console, { console2 } from './lib.log';
import { join } from 'path';

let io = createWriteStream(join(__dirname, '../lib.chk.md'));

//console._stdout.on('data', (data) => io.write(data));
//console._stderr.on('data', (data) => io.write(data));

//process.stdout.pipe(io);
//process.stderr.pipe(io);

//console._stdout.pipe(io);
//console._stderr.pipe(io);

io.write(`\`\`\`\n`);

// @ts-ignore
hook_writestream(console._stdout, (data) => io.write(stripAnsi(data)));
//// @ts-ignore
//hook_writestream(console._stderr, (data) => io.write(stripAnsi(data)));

function hook_writestream(stream, callback) {
	var old_write = stream.write;

	stream.write = (function(write) {
		return function(string, encoding, fd) {
			write.apply(stream, arguments);
			callback(string, encoding, fd);
		};
	})(stream.write);

	return function() {
		stream.write = old_write;
	};
}

lazy_unique([], []);

let _stat = {} as {
	[k: string]: {
		success: number,
		fail: number,
		error: number,
	}
};

getTestcase()
	.forEach(function (testcase)
	{
		console.log(testcase.label);
		console2.grey(`--------------`);

		[
			{
				name: 'array-hyper-unique',
				fn: array_hyper_unique,
			},
			{
				name: 'array-uniq',
				//fn: require('array-uniq'),
			},
			{
				name: 'array-unique',
				//fn: require('array-unique'),
			},
			{
				name: '@arr/unique',
				//fn: require('@arr/unique'),
			},
			{
				name: 'tfk-unique-array',
			},
			{
				name: 'just-unique',
			},
			{
				name: 'arr-unique',
			},
			{
				name: 'array-unique-deep',
			},
			{
				name: 'lodash.uniq',
			},
			{
				name: 'lodash/uniq',
			},
		].forEach(function (lib_data)
		{
			// @ts-ignore
			const fn = lib_data.fn || require(lib_data.name);

			let ret;
			let err;

			_stat[lib_data.name] = _stat[lib_data.name] || {
				success: 0,
				fail: 0,
				error: 0,
			};

			try
			{
				ret = fn(testcase.data)
			}
			catch (e)
			{
				// @ts-ignore
				console.magentaBright.error(lib_data.name, e.message);
				err = true;

				_stat[lib_data.name].error++;
			}

			if (!err)
			{
				let bool = equals(ret, testcase.expected);

				if (bool)
				{
					console.success(lib_data.name);
					_stat[lib_data.name].success++;
				}
				else
				{
					console.fail(lib_data.name);
					_stat[lib_data.name].fail++;
				}
			}

		});

		console2.log(`\n`);
	})
;

_stat = Object.keys(_stat)
	.sort(function (a, b)
	{
		return _stat[b].success - _stat[a].success
		|| _stat[a].fail - _stat[b].fail
	})
	.reduce(function (a, name)
	{
		a[name] = _stat[name];

		return a;
	}, {})
;

io.write(`\`\`\`\n\n---\n\n`);

io.write(`\`\`\`js\n`);

console.dir(_stat);

io.write(`\`\`\`\n`);

io.end();
