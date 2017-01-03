import fs from 'fs';

import command from './command';

export default (nextSemverTag) => {
  if (fs.existsSync('./package.json')) {
    const bumpNpmVersionCommand = `npm --no-git-tag-version version ${nextSemverTag}`;
    command(bumpNpmVersionCommand);
  }
};
