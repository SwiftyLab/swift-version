const os = require('os');

jest.mock('getos');
const setSystem = require('getos').__setSystem;

describe('platform detection', () => {
  it('detects macOS', () => {
    setSystem({ os: 'darwin', dist: 'macOS', release: 'latest' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('xcode');
  });

  it('detects ubuntu', () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('ubuntu');
    expect(platform.version).toBe(1804);
    expect(platform.arch).toBe('x86_64');
  });

  it('detects ubuntu with arm arch', () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('arm64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('ubuntu');
    expect(platform.version).toBe(1804);
    expect(platform.arch).toBe('aarch64');
  });

  it('detects windows', () => {
    setSystem({ os: 'win32', dist: 'Windows', release: 'latest' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('windows');
    expect(platform.version).toBe(10);
    expect(platform.arch).toBe('x86_64');
  });
});