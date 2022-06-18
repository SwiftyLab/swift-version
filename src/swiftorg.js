const util = require('util');
const path = require('path');
const process = require('process');
const yaml = require('js-yaml');
const semver = require('semver');
const glob = util.promisify(require('glob'));
const readFile = util.promisify(require('fs').readFile);
const platform = require('./platform');

const buildDir = 'swiftorg/_data/builds';
const betaVerRegex = /latest-(dev|beta)/;
const swiftReleaseRegex = /swift-.*-release/;

async function buildData(version, includeDev) {
  const ver = semver.coerce(version) ? version : null;
  const buildDirPattern = ver ? `swift-${ver.replaceAll('.', '_')}*` : '*';

  let files = await glob(`${buildDir}/${buildDirPattern}/${platform.file}.yml`);
  if (!includeDev && !version.match(betaVerRegex)) {
    files = files.filter((file) => path.basename(path.dirname(file)).match(swiftReleaseRegex));
  }

  if (files.length) {
    const futureDatas = files.map((file) => readFile(path.join(process.cwd(), file), 'utf-8'));
    const datas = await Promise.all(futureDatas);
    return datas.flatMap((data) => yaml.load(data));
  }

  const regex = new RegExp(`${platform.name}(?<version>[0-9]*)(-.*)?`);
  let maxVer, minVer;
  files = await glob(`${buildDir}/${buildDirPattern}/${platform.filePattern}.yml`);
  if (!includeDev && !version.match(betaVerRegex)) {
    files = files.filter((file) => path.basename(path.dirname(file)).match(swiftReleaseRegex));
  }
  files.forEach((file) => {
    const filename = path.basename(file, 'yml');
    const ver = parseInt(filename.match(regex).groups.version);
    if (maxVer === undefined || maxVer < ver) maxVer = ver;
    if (minVer === undefined || minVer > ver) minVer = ver;
  });

  const selectedVer = maxVer ?? minVer;
  if (selectedVer && files.length) {
    files = files.filter((file) => {
      const filename = path.basename(file, 'yml');
      const ver = parseInt(filename.match(regex).groups.version);
      return ver === selectedVer;
    });
    const futureDatas = files.map((file) => readFile(path.join(process.cwd(), file), 'utf-8'));
    const datas = await Promise.all(futureDatas);
    return datas.flatMap((data) => yaml.load(data));
  }
  return [];
}

module.exports = { buildData };