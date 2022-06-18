const util = require('util');
const path = require('path');
const process = require('process');
const yaml = require('js-yaml');
const semver = require('semver');
const glob = util.promisify(require('glob'));
const readFile = util.promisify(require('fs').readFile);
const platform = require('./platform');

const buildDir = 'swiftorg/_data/builds';

async function buildData(version, includeDev) {
  const ver = semver.valid(version) ?? semver.valid(semver.coerce(version));
  const buildDirPattern = ver ? `swift-${ver.replaceAll('.', '_')}*` : '*';

  let files = await glob(`${buildDir}/${buildDirPattern}/${platform.file}.yml`);
  if (!includeDev || version.match(/latest-(dev|beta)/)) {
    files = files.filter((file) => path.basename(path.dirname(file)).match(/swift-.*-release/));
  }

  if (files.length) {
    const futureDatas = files.map((file) => readFile(path.join(process.cwd(), file)));
    const datas = await Promise.all(futureDatas);
    return datas.flatMap((data) => yaml.load(data));
  }

  const regex = new RegExp(`${platform.name}(?<version>[0-9]*)(-.*)?`);
  let maxVer, minVer;
  files = await glob(`${buildDir}/${buildDirPattern}/${platform.filePattern}.yml`);
  files.forEach((file) => {
    const filename = path.basename(file, 'yml');
    const ver = parseInt(filename.match(regex).groups.version);
    if (maxVer === null || maxVer < ver) maxVer = ver;
    if (minVer === null || minVer > ver) minVer = ver;
  });

  const selectedVer = maxVer ?? minVer;
  if (selectedVer && files.length) {
    files = files.filter((file) => {
      const filename = path.basename(file, 'yml');
      const ver = parseInt(filename.match(regex).groups.version);
      if (!includeDev || version.match(/latest-(dev|beta)/)) {
        return ver === selectedVer &&
         path.basename(path.dirname(file)).match(/swift-.*-release/);
      }
      return ver === selectedVer;
    });
    const futureDatas = files.map((file) => readFile(path.join(process.cwd(), file)));
    const datas = await Promise.all(futureDatas);
    return datas.flatMap((data) => yaml.load(data));
  }
}

module.exports = { buildData };