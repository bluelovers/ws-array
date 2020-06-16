import _m0 = require('../');
import _m1 from '../';
import _m2 = require('../core');

test(`import check`, () =>
{

	let actual = Object.keys(_m0).sort();
	let expected = Object.keys(_m1).sort();
	let expected2 = Object.keys(_m2).sort();

	expect(actual).toStrictEqual(expected);
	expect(actual).toStrictEqual(expected2);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`__esModule`, () =>
{

	expect(_m0).toHaveProperty('__esModule', true);
	expect(_m1).toHaveProperty('__esModule', true);

});
