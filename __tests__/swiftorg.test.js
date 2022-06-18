const os = require('os');

jest.mock('getos');
const setSystem = require('getos').__setSystem;

describe('fetch all matching tool data based on options', () => {
  it('fetches ubuntu 18.04 latest swift 5.5 tools', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      const { buildData } = require('../src/swiftorg');
      tools = await buildData('5.5');
      expect(tools.length).toBe(4);
      done();
    });
  });

  it('fetches ubuntu 18.04 latest swift 5.5 tools including dev snapshot', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      const { buildData } = require('../src/swiftorg');
      tools = await buildData('5.5', true);
      expect(tools.length).toBe(103);
      done();
    });
  });

  it('fetches windows 10 latest swift 5.5 tools', done => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      const { buildData } = require('../src/swiftorg');
      tools = await buildData('5.5');
      expect(tools.length).toBe(4);
      done();
    });
  });

  it('fetches windows 10 latest swift 5.5 tools including dev snapshot', done => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      const { buildData } = require('../src/swiftorg');
      tools = await buildData('5.5', true);
      expect(tools.length).toBe(34);
      done();
    });
  });

  it('fetches ubuntu 16.04 latest swift 5.6 tools', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '16.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      const { buildData } = require('../src/swiftorg');
      tools = await buildData('5.6.1');
      expect(tools.length).toBe(2);
      done();
    });
  });

  it('fetches ubuntu 20.04 latest swift 5.2 tools', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '20.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tools;
    jest.isolateModules(async () => {
      const { buildData } = require('../src/swiftorg');
      tools = await buildData('5.2');
      expect(tools.length).toBe(2);
      done();
    });
  });
});