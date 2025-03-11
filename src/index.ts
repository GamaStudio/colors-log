export enum SystemMessageType {
  SYS = 'SYS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  TIMEOUT = 'TIMEOUT',
  // Añade más tipos según necesites
}

interface LogConfig {
  zoneHour?: number; // Zona horaria (ej: -3 para Argentina, +2 para España)
  dateShow?: boolean; // Mostrar u ocultar la fecha
}

class Colors {
  private TIMEOUT: string;
  private globalConfig: LogConfig;
  colors: { [key: string]: string };

  constructor() {
    this.TIMEOUT = '\x1b[0m';
    this.globalConfig = {
      zoneHour: 0, // Por defecto, sin ajuste de zona horaria
      dateShow: true, // Por defecto, mostrar la fecha
    };
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

  private getFormattedDate(zoneHour: number): string {
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset() + zoneHour * 60; // Ajuste de zona horaria
    const adjustedDate = new Date(currentDate.getTime() + offset * 60 * 1000);

    return `${adjustedDate
      .getDate()
      .toString()
      .padStart(2, '0')}-${(adjustedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${adjustedDate
          .getFullYear()
          .toString()
          .slice(-2)} ${adjustedDate
            .getHours()
            .toString()
            .padStart(2, '0')}:${adjustedDate
              .getMinutes()
              .toString()
              .padStart(2, '0')}`;
  }

  private log(color: string, text: string, config?: LogConfig) {
    let formattedText = text;

    if (this.colors[color]) {
      const { dateShow = this.globalConfig.dateShow, zoneHour = this.globalConfig.zoneHour } = config || {};
      if (dateShow) {
        const formattedDate = this.getFormattedDate(zoneHour || 0);
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
    config?: LogConfig
  ) {
    let colorKey: string;
    let bgColorKey: string;
    switch (type) {
      case SystemMessageType.SYS:
        colorKey = 'cyan';
        bgColorKey = 'bgCyan';
        break;
      case SystemMessageType.ERROR:
        colorKey = 'red';
        bgColorKey = 'bgRed';
        break;
      case SystemMessageType.WARNING:
        colorKey = 'yellow';
        bgColorKey = 'bgYellow';
        break;
      case SystemMessageType.INFO:
        colorKey = 'blue';
        bgColorKey = 'bgBlue';
        break;
      case SystemMessageType.SUCCESS:
        colorKey = 'green';
        bgColorKey = 'bgGreen';
        break;
      case SystemMessageType.TIMEOUT:
        colorKey = 'orange';
        bgColorKey = 'bgOrange';
        break;

      default:
        colorKey = ''; // Sin color si el tipo no se reconoce
        bgColorKey = '';
    }

    const prefix = `${this.colors[bgColorKey]}[${type}]${this.TIMEOUT}`;
    this.log(colorKey, `${prefix} ${text}`, config);
  }

  system(text: string, config?: LogConfig) {
    this.sys('SYS', text, config);
  }

  info(text: string, config?: LogConfig) {
    this.sys('INFO', text, config);
  }

  warn(text: string, config?: LogConfig) {
    this.sys('WARNING', text, config);
  }

  success(text: string, config?: LogConfig) {
    this.sys('SUCCESS', text, config);
  }

  timeout(text: string, config?: LogConfig) {
    this.sys('TIMEOUT', text, config);
  }

  error(text: string | any, config?: LogConfig) {
    this.sys('ERROR', text, config);
  }

  clear() {
    console.clear();
  }

  setConfig(config: LogConfig) {
    this.globalConfig = { ...this.globalConfig, ...config };
  }
}

export const colors = new Colors();