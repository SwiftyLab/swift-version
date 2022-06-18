const os = require('os');
const getos = require('getos');

class Platform {
  constructor(name, version, arch) {
    this.name = name;
    this.version = version;
    this.arch = arch;
  }

  fileForVersion(version) {
    switch (this.name) {
      case 'xcode':
        return this.name
      default:
        return this.name
          + (version ? version : '')
          + (this.arch === 'x86_64' ? '' : `-${this.arch}`);
    }
  }

  get file() {
    return this.fileForVersion(this.version);
  }

  get filePattern() {
    return this.fileForVersion('*');
  }
}

let _os;
getos((e, os) => {
  if (e) console.error(e);
  _os = os;
});

let arch;
switch (os.arch()) {
  case 'x64':
    arch = 'x86_64';
    break;
  case 'arm64':
    arch = 'aarch64';
    break;
  default:
    arch = os.arch();
    break;
}

let platform;
switch (_os.os) {
  case 'darwin':
    platform = new Platform('xcode', null, arch);
    break;
  case 'win32':
    platform = new Platform('windows', 10, arch);
    break;
  case 'linux':
    let version = _os.release.replaceAll(/[^0-9]/g, '');
    platform = new Platform(_os.dist.toLowerCase(), parseInt(version), arch);
    break;
  default:
    console.error(`OS ${_os.os} unsupported for swift`);
}

module.exports = platform;