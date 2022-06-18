const semver = require('semver');
const { buildData } = require('./swiftorg');

async function swiftTool(version, includeDev) {
  let data = await buildData(version, includeDev);
  if (!Array.isArray(data)) { return null }
  return data.sort((item1,item2) => item1.date > item2.date).at(0);
}

module.exports = { swiftTool };