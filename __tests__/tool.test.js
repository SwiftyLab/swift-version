const os = require('os');
const { hasUncaughtExceptionCaptureCallback } = require('process');

jest.mock('getos');
const setSystem = require('getos').__setSystem;

describe('fetch tool data based on options', () => {
  it('fetches ubuntu 18.04 latest swift 5.5 tool', async () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5');
      expect(tool.dir).toBe('swift-5.5.1-RELEASE');
    });
  });

  it('fetches ubuntu 18.04 latest swift 5.5 tool including dev snapshot', async () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5', true);
      expect(tool.dir).toBe('swift-5.5.1-RELEASE');
    });
  });

  it('fetches windows 10 latest swift 5.5 tool', async () => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5');
      expect(tool.dir).toBe('swift-5.5.1-RELEASE');
    });
  });

  it('fetches windows 10 latest swift 5.5 tool including dev snapshot', async () => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let tool;
    jest.isolateModules(async () => {
      tool = await require('../src/tool').swiftTool('5.5', true);
      expect(tool.dir).toBe('swift-5.5.1-RELEASE');
    });
  });
});