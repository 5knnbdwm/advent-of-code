import minimist from 'minimist';
import * as prompts from 'prompts';

const args = minimist(process.argv.slice(2));
const year = args.year || args._[0]; // This will cover both --year and the default argument
const task = args.task || args._[1]; // This will cover both --task and the default argument




