#!/usr/bin/env node
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const beta = args[0] === 'beta';

if (args.some(a => a !== 'beta' && a !== '--dry-run')) {
  console.error('usage: node scripts/publish.js [beta] [--dry-run]');
  process.exit(1);
}

const pkgDir = path.resolve(__dirname, '..');
const pkgPath = path.join(pkgDir, 'package.json');

const run = (cmd, cmdArgs) => {
  const r = spawnSync(cmd, cmdArgs, { stdio: 'inherit', cwd: pkgDir });
  if (r.status !== 0) {
    process.exit(r.status || 1);
  }
};

const whoami = spawnSync('npm', ['whoami'], { encoding: 'utf8' });
if (whoami.status !== 0) {
  console.error('error: not logged in to npm. Run `npm login` first.');
  process.exit(1);
}
console.log(`npm user: ${whoami.stdout.trim()}`);

run('node', ['scripts/check-note-names.mjs']);
run('npm', ['run', 'build']);

if (beta) {
  const version = require(pkgPath).version;
  if (dryRun) {
    console.log(`dry-run: would bump ${version} to a -beta.N prerelease and publish with --tag beta`);
    run('npm', ['publish', '--tag', 'beta', '--dry-run']);
  } else {
    const originalPkg = fs.readFileSync(pkgPath, 'utf8');
    run('npm', ['version', 'prerelease', '--preid=beta', '--no-git-tag-version']);
    const pub = spawnSync('npm', ['publish', '--tag', 'beta'], { stdio: 'inherit', cwd: pkgDir });
    if (pub.status !== 0) {
      fs.writeFileSync(pkgPath, originalPkg);
      console.error('publish failed; package.json version restored');
      process.exit(pub.status || 1);
    }
  }
} else {
  const version = require(pkgPath).version;
  if (version.includes('-')) {
    console.error(`error: package.json version "${version}" is a prerelease. Restore a stable version number before a stable publish (or use \`node scripts/publish.js beta\`).`);
    process.exit(1);
  }
  run('npm', ['publish', ...(dryRun ? ['--dry-run'] : [])]);
}
