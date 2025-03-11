
# ColorsLog

A utility for logging colored messages to the console with different system message types.

## Installation

Install the package via npm:

```bash
npm install @gamastudio/colorslog
```

```bash
pnpm i @gamastudio/colorslog
```

## Usage

### Import the module

First, import the `colors` instance from the module:

```typescript
import { colors, SystemMessageType } from '@gamastudio/colorslog';
```


### Configuración Global con `setConfig`

El método `setConfig` permite definir opciones globales para personalizar cómo se muestran los mensajes en la consola. Estas opciones incluyen la zona horaria y si se muestra la fecha.

#### Tipo de `setConfig`:

```typescript
setConfig(config: LogConfig): void
```

#### Parámetros:

- `config`: Un objeto con las siguientes propiedades opcionales:
  - `zoneHour`: Número que representa la zona horaria (en horas) respecto a UTC. Por ejemplo:
    - `-3` para Argentina (UTC-3).
    - `+2` para España (UTC+2).
    - Por defecto: `0` (UTC).
  - `dateShow`: Booleano que indica si se debe mostrar la fecha en los mensajes.
    - `true`: Muestra la fecha.
    - `false`: Oculta la fecha.
    - Por defecto: `true`.

#### Ejemplo de uso:

```typescript
// Configuración global
colors.setConfig({
  zoneHour: -3, // Zona horaria de Argentina (UTC-3)
  dateShow: true, // Mostrar la fecha
});

// Cambiar configuración dinámicamente
colors.setConfig({ dateShow: false }); // Ocultar la fecha en todos los mensajes
```

#### Sobrescribir configuración individualmente:

Cada método de logging (`info`, `success`, `error`, etc.) acepta un parámetro opcional `config` que sobrescribe la configuración global para esa llamada específica.

```typescript
colors.info("Información importante", { dateShow: false }); // Ocultar la fecha solo para este mensaje
colors.warn("Advertencia", { zoneHour: +2 }); // Usar zona horaria de España (UTC+2) solo para este mensaje
```

---

### Ejemplo completo:

```typescript
import { colors } from './colors';

// Configuración global
colors.setConfig({
  zoneHour: -3, // Zona horaria de Argentina (UTC-3)
  dateShow: true, // Mostrar la fecha
});

// Mensajes con configuración global
colors.success("Operación exitosa"); // Muestra la fecha con la zona horaria de Argentina
colors.error("Algo salió mal"); // Muestra la fecha con la zona horaria de Argentina

// Sobrescribir configuración individualmente
colors.info("Información importante", { dateShow: false }); // Oculta la fecha solo para este mensaje
colors.warn("Advertencia", { zoneHour: +2 }); // Usa la zona horaria de España (UTC+2) solo para este mensaje

// Cambiar configuración global dinámicamente
colors.setConfig({ dateShow: false });
colors.timeout("Tiempo de espera agotado"); // No muestra la fecha
```




### Logging Messages

You can log messages of different types using the provided methods:

```typescript
colors.system('System message');
colors.info('Information message');
colors.success('Success message');
colors.error('Error message');
```

### Custom Logging

You can also use the `sys` method to log messages with custom types:

```typescript
colors.sys(SystemMessageType.WARNING, 'Warning message');
colors.sys(SystemMessageType.TIMEOUT, 'Timeout message');
```

### Clear Console

You can clear the console using the `clear` method:

```typescript
colors.clear();
```

### Show/Hide Date

You can choose to show or hide the date in the logs:

```typescript
colors.info('Information message without date', false);
colors.error('Error message with date', true);
```

## SystemMessageType

The `SystemMessageType` enumeration provides predefined types of messages:

```typescript
enum SystemMessageType {
  SYS = 'SYS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  TIMEOUT = 'TIMEOUT',
  
}
```

## Colors Class

### Propertiess
- `colors`: `{ [key: string]: string }` - Map of ANSI escape codes for various colors and styles.

### Methods

- `log(color: string, text: string, showDate: boolean = true)`: Logs a message to the console with the specified color.
- `sys(type: string, text: string | object | any, showDate: boolean = true)`: Logs a system message with a color based on the type.
- `system(text: string, showDate: boolean = true)`: Logs a system message of type `SYS`.
- `info(text: string, showDate: boolean = true)`: Logs an informational message.
- `success(text: string, showDate: boolean = true)`: Logs a success message.
- `error(text: string | any, showDate: boolean = true)`: Logs an error message.
- `clearConsole()`: Clears the console.

## Example

Here's an example of how to use the `colorslog` package:

```typescript
import { colors } from '@gamastudio/colorslog';

colors.success('Success message');
colors.timeout('Success message');
colors.system('System message');
colors.info('Information message');
colors.error('Error message');
colors.warn('Custom warning message');
colors.clearConsole();
colors.info('Information message without date', false);
colors.error('Error message with date', true);
```

![Terminal Example](./screenshot/colors.png)

## License
This project

 is licensed under the MIT License.
```

Con estas mejoras, tu librería tendrá más funcionalidad y flexibilidad, permitiendo a los usuarios personalizar aún más sus mensajes en consola. ¿Te gustaría añadir algo más o tienes alguna otra idea específica en mente?