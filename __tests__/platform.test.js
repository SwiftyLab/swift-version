const os = require('os');

jest.mock('getos');
const setSystem = require('getos').__setSystem;

describe('platform detection', () => {
  it('detects macOS', () => {
    setSystem({ os: 'darwin', dist: 'macOS', release: '21' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('xcode');
    expect(platform.file).toBe('xcode');
    expect(platform.filePattern).toBe('xcode');
  });

  it('detects ubuntu', () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('ubuntu');
    expect(platform.version).toBe(1804);
    expect(platform.arch).toBe('x86_64');
    expect(platform.file).toBe('ubuntu1804');
    expect(platform.filePattern).toBe('ubuntu*');
  });

  it('detects ubuntu with arm arch', () => {
    setSystem({ os: 'linux', dist: 'Ubuntu', release: '18.04' });
    jest.spyOn(os, 'arch').mockReturnValue('arm64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('ubuntu');
    expect(platform.version).toBe(1804);
    expect(platform.arch).toBe('aarch64');
    expect(platform.file).toBe('ubuntu1804-aarch64');
    expect(platform.filePattern).toBe('ubuntu*-aarch64');
  });

  it('detects windows', () => {
    setSystem({ os: 'win32', dist: 'Windows', release: '10.0.17063' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    jest.isolateModules(() => platform = require('../src/platform'));
    expect(platform.name).toBe('windows');
    expect(platform.version).toBe(10);
    expect(platform.arch).toBe('x86_64');
    expect(platform.file).toBe('windows10');
    expect(platform.filePattern).toBe('windows*');
  });

  it('throws error for unsupported os', () => {
    expect.assertions(1);
    setSystem({ os: 'unknown', dist: 'unknown', release: '1' });
    jest.spyOn(os, 'arch').mockReturnValue('x64');
    let platform;
    try {
      jest.isolateModules(() => platform = require('../src/platform'));
    } catch (e) {
      expect(e).toEqual(new Error(`OS unknown unsupported for swift`));
    }
  });
});