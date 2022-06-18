const os = require('os');

jest.mock('getos');
const setSystem = require('getos').__setSystem;

describe('fetch tool data based on options', () => {
  it('fetches ubuntu 18.04 latest swift 5.5 tool', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5');
      expect(tool?.dir).toBe('swift-5.5.1-RELEASE');
      done();
    });
  });

  it('fetches ubuntu 18.04 latest swift 5.5 tool including dev snapshot', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5', true);
      expect(tool?.dir).toBe('swift-5.5.1-RELEASE');
      done();
    });
  });

  it('fetches windows 10 latest swift 5.5 tool', done => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5');
      expect(tool?.dir).toBe('swift-5.5.1-RELEASE');
      done();
    });
  });

  it('fetches windows 10 latest swift 5.5 tool including dev snapshot', done => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5', true);
      expect(tool?.dir).toBe('swift-5.5.1-RELEASE');
      done();
    });
  });

  it('handles swift tool version not present by returning null', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool(`${Number.MAX_VALUE}`);
      expect(tool).toBe(null);
      done();
    });
  });

  it('fetches ubuntu 16.04 latest swift 5.6 tool', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '16.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.6.1');
      expect(tool?.dir).toBe('swift-5.6.1-RELEASE');
      done();
    });
  });

  it('fetches ubuntu 20.04 latest swift 5.2 tool', done => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '20.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.2');
      expect(tool?.dir).toBe('swift-5.2.4-RELEASE');
      done();
    });
  });
});