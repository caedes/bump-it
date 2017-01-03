#! /usr/bin/env node

// import commander from 'commander';
import fs from 'fs';
import inquirer from 'inquirer';
import semver from 'semver';

import command from './lib/command';

// list all tag: git tag -l --sort=-v:refname
const lastTagCommand = 'git describe --abbrev=0 --tags';
const lastTagCommandResult = command(lastTagCommand);
const lastTag = lastTagCommandResult.split('\n')[0];

// Get last tag and last semver
const lastTagSemver = lastTag.substring(1);

inquirer.prompt([
  {
    type: 'list',
    name: 'increment',
    message: 'Which version number do you want to bump?',
    choices: ['patch', 'minor', 'major'].map(item => (
      {
        name: `${item} v${semver.inc(lastTagSemver, item)}`,
        value: item,
      }
    )),
  },
]).then((answers) => {
  const nextTagSemver = semver.inc(lastTagSemver, answers.increment);

  // create CHANGELOG.md if no exists
  // create changelogs
  // write changelogs into CHANGELOG

  // write version into package.json if exists
  if (fs.existsSync('./package.json')) {
    const bumpNpmVersionCommand = `npm --no-git-tag-version version ${nextTagSemver}`;
    command(bumpNpmVersionCommand);
  }

  // git commit
  command(`git commit -am "Bump version to v${nextTagSemver}"`);
  const currentGitBranch = command('git rev-parse --abbrev-ref HEAD');
  command(`git push origin ${currentGitBranch}`);

  // git tag
  command(`git tag v${nextTagSemver}`);

  // git push --tags
  command('git push --tags');
});
