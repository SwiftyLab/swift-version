const { buildData } = require('./swiftorg');

async function swiftTool(version, includeDev) {
  const data = await buildData();
  if (!Array.isArray(data)) { return null }
  return data.sort((item1,item2) => item1.date < item2.date).at(0);
}

module.exports = { swiftTool };