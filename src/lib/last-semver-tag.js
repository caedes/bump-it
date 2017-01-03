import command from './command';

const lastTagCommand = 'git describe --abbrev=0 --tags';
const lastTagCommandResult = command(lastTagCommand);
const lastTag = lastTagCommandResult.split('\n')[0];

const lastTagSemver = lastTag.substring(1);

export default lastTagSemver;
