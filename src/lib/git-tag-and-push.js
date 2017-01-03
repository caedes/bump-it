import command from './command';

export default (nextSemverTag) => {
  command(`git commit -am "Bump version to v${nextSemverTag}"`);

  const currentGitBranch = command('git rev-parse --abbrev-ref HEAD');
  command(`git push origin ${currentGitBranch}`);

  command(`git tag v${nextSemverTag}`);

  command('git push --tags');
};
