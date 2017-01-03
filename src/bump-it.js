#! /usr/bin/env node

import commander from 'commander';
import fs from 'fs';
import semver from 'semver';

import { version, description } from '../package.json';
import command from './lib/command';

commander
  .description(description)
  .version(version);

commander
  .option(
    '-i --increment [increment]',
    'Version to increment [major|minor|patch] (default: patch)',
    /^(major|minor|patch)$/i,
    'patch',
  );

commander.parse(process.argv);

// list all tag: git tag -l --sort=-v:refname
const lastTagCommand = 'git describe --abbrev=0 --tags';
const lastTagCommandResult = command(lastTagCommand);
const lastTag = lastTagCommandResult.split('\n')[0];

// Get last tag and last semver
const lastTagSemver = lastTag.substring(1);

// bump version
const nextTagSemver = semver.inc(lastTagSemver, commander.increment);

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
