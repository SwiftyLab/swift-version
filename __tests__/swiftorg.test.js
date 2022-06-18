const os = require('os');

jest.mock('getos');
const setSystem = require('getos').__setSystem;

describe('fetch all matching tool data based on options', () => {
  it('fetches ubuntu 18.04 latest swift 5.5 tools', async () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      tools = await require('../src/swiftorg').buildData('5.5');
      expect(tools.length).toBe(4);
    });
  });

  it('fetches ubuntu 18.04 latest swift 5.5 tools including dev snapshot', async () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      tools = await require('../src/swiftorg').buildData('5.5', true);
      expect(tools.length).toBe(103);
    });
  });

  it('fetches windows 10 latest swift 5.5 tools', async () => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      tools = await require('../src/swiftorg').buildData('5.5');
      expect(tools.length).toBe(4);
    });
  });

  it('fetches windows 10 latest swift 5.5 tools including dev snapshot', async () => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      tools = await require('../src/swiftorg').buildData('5.5', true);
      expect(tools.length).toBe(34);
    });
  });

  it('fetches ubuntu 16.04 latest swift 5.6 tools', async () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '16.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      tools = await require('../src/swiftorg').buildData('5.6.1');
      expect(tools.length).toBe(2);
    });
  });

  it('fetches ubuntu 20.04 latest swift 5.2 tools', async () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '20.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      tools = await require('../src/swiftorg').buildData('5.2');
      expect(tools.length).toBe(2);
    });
  });
});