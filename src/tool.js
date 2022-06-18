const semver = require('semver');
const { buildData } = require('./swiftorg');

async function swiftTool(version, includeDev) {
  let data = await buildData(version, includeDev);
  return data.sort((item1, item2) => item1.date > item2.date).at(0) ?? null;
}

module.exports = { swiftTool };