#! /usr/bin/env node

import inquirer from 'inquirer';
import semver from 'semver';

import bumpNpmVersion from './lib/bump-npm-version';
import gitTagAndPush from './lib/git-tag-and-push';
import lastSemverTag from './lib/last-semver-tag';

const semverVersionTypes = ['patch', 'minor', 'major'];
const semverVersionTypeChoices = semverVersionTypes.map(item => ({
  name: `${item} v${semver.inc(lastSemverTag, item)}`,
  value: item,
}));

inquirer.prompt([{
  type: 'list',
  name: 'increment',
  message: 'Which version number do you want to bump?',
  choices: semverVersionTypeChoices,
}]).then((answers) => {
  const nextSemverTag = semver.inc(lastSemverTag, answers.increment);

  bumpNpmVersion(nextSemverTag);

  gitTagAndPush(nextSemverTag);
});
