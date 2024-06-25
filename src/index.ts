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
  private TIMEOUT: string;
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
      // Nuevos colores
      brightRed: '\x1b[91m',
      brightGreen: '\x1b[92m',
      brightYellow: '\x1b[93m',
      brightBlue: '\x1b[94m',
      brightMagenta: '\x1b[95m',
      brightCyan: '\x1b[96m',
      brightWhite: '\x1b[97m',
      bgBrightRed: '\x1b[101m',
      bgBrightGreen: '\x1b[102m',
      bgBrightYellow: '\x1b[103m',
      bgBrightBlue: '\x1b[104m',
      bgBrightMagenta: '\x1b[105m',
      bgBrightCyan: '\x1b[106m',
      bgBrightWhite: '\x1b[107m',
    };
  }

  private log(color: string, text: string, showDate: boolean = true) {
    let formattedText = text;

    if (this.colors[color]) {
      if (showDate) {
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
        formattedText = `${this.colors['orange']}[DATE: ${this.colors['red']}${formattedDate}] ${this.colors[color]}${text}${this.TIMEOUT}`;
      } else {
        formattedText = `${this.colors[color]}${text}${this.TIMEOUT}`;
      }
    }

    console.log(formattedText);
  }

  private sys(
    type: string,
    text: string | object | any,
    showDate: boolean = true
  ) {
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
    this.log(colorKey, `${prefix} ${text}`, showDate);
  }

  system(text: string, showDate: boolean = true) {
    this.sys('SYS', text, showDate);
  }

  info(text: string, showDate: boolean = true) {
    this.sys('INFO', text, showDate);
  }

  warn(text: string, showDate: boolean = true) {
    this.sys('WARNING', text, showDate);
  }

  success(text: string, showDate: boolean = true) {
    this.sys('SUCCESS', text, showDate);
  }

  timeout(text: string, showDate: boolean = true) {
    this.sys('TIMEOUT', text, showDate);
  }

  error(text: string | any, showDate: boolean = true) {
    this.sys('ERROR', text, showDate);
  }

  clear() {
    console.clear();
  }
}

export const colors = new Colors();
