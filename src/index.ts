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
  useBackground?: boolean; // Usar colores de fondo en los prefijos (por defecto false para mejor compatibilidad)
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
      useBackground: false, // Por defecto, sin colores de fondo para mejor compatibilidad con servidores
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

  private formatArguments(args: any[]): string {
    return args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
  }

  private extractConfig(args: any[]): LogConfig | undefined {
    // Buscar si el último argumento es un objeto de configuración
    const lastArg = args[args.length - 1];
    if (lastArg && typeof lastArg === 'object' && !Array.isArray(lastArg)) {
      // Verificar si tiene propiedades de LogConfig
      const configKeys = ['zoneHour', 'dateShow', 'useBackground'];
      const hasConfigProps = configKeys.some(key => key in lastArg);
      if (hasConfigProps) {
        return lastArg as LogConfig;
      }
    }
    return undefined;
  }

  private filterArgs(args: any[]): any[] {
    const config = this.extractConfig(args);
    if (config) {
      // Remover el último argumento si es configuración
      return args.slice(0, -1);
    }
    return args;
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
    config?: LogConfig,
    ...args: any[]
  ) {
    let colorKey: string;
    let bgColorKey: string;
    let brightColorKey: string; // Para colores más brillantes y visibles
    
    switch (type) {
      case SystemMessageType.SYS:
        colorKey = 'cyan';
        bgColorKey = 'bgCyan';
        brightColorKey = 'brightCyan';
        break;
      case SystemMessageType.ERROR:
        colorKey = 'red';
        bgColorKey = 'bgRed';
        brightColorKey = 'brightRed';
        break;
      case SystemMessageType.WARNING:
        colorKey = 'yellow';
        bgColorKey = 'bgYellow';
        brightColorKey = 'brightYellow';
        break;
      case SystemMessageType.INFO:
        colorKey = 'blue';
        bgColorKey = 'bgBlue';
        brightColorKey = 'brightBlue';
        break;
      case SystemMessageType.SUCCESS:
        colorKey = 'green';
        bgColorKey = 'bgGreen';
        brightColorKey = 'brightGreen';
        break;
      case SystemMessageType.TIMEOUT:
        colorKey = 'orange';
        bgColorKey = 'bgOrange';
        brightColorKey = 'orange'; // Orange no tiene versión bright, usamos el normal
        break;

      default:
        colorKey = ''; // Sin color si el tipo no se reconoce
        bgColorKey = '';
        brightColorKey = '';
    }

    // Usar configuración local o global para determinar si usar fondo
    const { useBackground = this.globalConfig.useBackground } = config || {};
    
    let prefix: string;
    if (useBackground) {
      // Modo original con fondo de color
      prefix = `${this.colors[bgColorKey]}[${type}]${this.TIMEOUT}`;
    } else {
      // Modo mejorado: usar colores brillantes sin fondo para mejor visibilidad
      prefix = `${this.colors['bright']}${this.colors[brightColorKey]}[${type}]${this.TIMEOUT}`;
    }
    
    // Formatear todos los argumentos
    const formattedText = this.formatArguments(args);
    this.log(colorKey, `${prefix} ${formattedText}`, config);
  }

  system(...args: any[]) {
    const config = this.extractConfig(args);
    const filteredArgs = this.filterArgs(args);
    this.sys('SYS', config, ...filteredArgs);
  }

  info(...args: any[]) {
    const config = this.extractConfig(args);
    const filteredArgs = this.filterArgs(args);
    this.sys('INFO', config, ...filteredArgs);
  }

  warn(...args: any[]) {
    const config = this.extractConfig(args);
    const filteredArgs = this.filterArgs(args);
    this.sys('WARNING', config, ...filteredArgs);
  }

  success(...args: any[]) {
    const config = this.extractConfig(args);
    const filteredArgs = this.filterArgs(args);
    this.sys('SUCCESS', config, ...filteredArgs);
  }

  timeout(...args: any[]) {
    const config = this.extractConfig(args);
    const filteredArgs = this.filterArgs(args);
    this.sys('TIMEOUT', config, ...filteredArgs);
  }

  error(...args: any[]) {
    const config = this.extractConfig(args);
    const filteredArgs = this.filterArgs(args);
    this.sys('ERROR', config, ...filteredArgs);
  }

  clear() {
    console.clear();
  }

  setConfig(config: LogConfig) {
    this.globalConfig = { ...this.globalConfig, ...config };
  }
}

export const colors = new Colors();