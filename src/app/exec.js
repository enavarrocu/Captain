import {exec} from "child_process";

// Fix PATH to find "docker" binary.
process.env.PATH = process.env.PATH + ":/usr/local/bin";

export const escapeShell = (arg) => `'${arg.replace(/(["\s'$\`\\])/g, "\\$1")}'`;

export const execPromise = (command) => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error || stderr) {
				reject(error || new Error(stderr));
			} else {
				resolve(stdout.split("\n"));
			}
		});
	});
};