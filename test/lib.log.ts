/**
 * Created by user on 2018/9/23/023.
 */

import { Console as ConsoleNode } from 'console';
import { console as console2, Console2 } from 'debug-color2';

export const consoleLog = new Console2(new ConsoleNode(console._stdout, console._stdout), {
	label: true,
	inspectOptions: {
		colors: true,
	},
});

export { console2 }

export default consoleLog
