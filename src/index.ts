export enum SystemMessageType {
  SYS = 'SYS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  TIMEOUT = 'TIMEOUT',
  // Añade más tipos según necesites
}

class Colors {
  TIMEOUT: string;
  colors: { [key: string]: string };
  constructor() {
    this.TIMEOUT = '\x1b[0m';
    this.colors = {
      bright: '\x1b[1m',
      dim: '\x1b[2m',
      underscore: '\x1b[4m',
      blink: '\x1b[5m',
      reverse: '\x1b[7m',
      hidden: '\x1b[8m',
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
      gray: '\x1b[90m',
      orange: '\x1b[38;5;208m',
      bgOrange: '\x1b[48;5;208m',
      bgBlack: '\x1b[40m',
      bgRed: '\x1b[41m',
      bgGreen: '\x1b[42m',
      bgYellow: '\x1b[43m',
      bgBlue: '\x1b[44m',
      bgMagenta: '\x1b[45m',
      bgCyan: '\x1b[46m',
      bgWhite: '\x1b[47m',
      bgGray: '\x1b[100m',
    };
  }

  private log(color: string, text: string) {
    if (this.colors[color]) {
      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate
        .getFullYear()
        .toString()
        .slice(-2)} ${currentDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      console.log(
        `${this.colors['orange']}[DATE:`,
        `${this.colors['red']}${formattedDate}]`,
        `${this.colors[color]}${text}`
      );
    } else {
      console.log(text);
    }
  }

  private sys(type: string, text: string | object | any) {
    let colorKey: string;
    switch (type) {
      case SystemMessageType.SYS:
        colorKey = 'cyan';
        break;
      case SystemMessageType.ERROR:
        colorKey = 'red';
        break;
      case SystemMessageType.WARNING:
        colorKey = 'yellow';
        break;
      case SystemMessageType.INFO:
        colorKey = 'blue';
        break;
      case SystemMessageType.SUCCESS:
        colorKey = 'green';
        break;
      case SystemMessageType.TIMEOUT:
        colorKey = 'orange';
        break;

      default:
        colorKey = ''; // Sin color si el tipo no se reconoce
    }

    const prefix = `[${type}]`;
    this.log(colorKey, `${prefix} ${text}`);
  }

  system(text: string) {
    this.sys('SYS', text);
  }
  info(text: string) {
    this.sys('INFO', text);
  }
  warn(text: string) {
    this.sys('WARNING', text);
  }
  success(text: string) {
    this.sys('SUCCESS', text);
  }
  timeout(text: string) {
    this.sys('TIMEOUT', text);
  }

  error(text: string | any) {
    this.sys('ERROR', text);
  }
}

export const colors = new Colors();
