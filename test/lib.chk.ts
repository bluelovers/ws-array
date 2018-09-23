/**
 * Created by user on 2018/9/23/023.
 */

import { array_unique as array_hyper_unique } from '..';
import { equals } from '..';
//import { lazy_unique } from '../index';
//import * as lazy_unique from '../index';
import lazy_unique = require('../index');
import getTestcase from './_data';
import arrayUniq = require('array-uniq');
import arrayUnique = require('array-unique');

import console, { console2 } from './lib.log';

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

console.dir(_stat);
