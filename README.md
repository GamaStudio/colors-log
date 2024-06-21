# ColorsLog

A utility for logging colored messages to the console with different system message types.

## Installation

Install the package via npm:

```bash
npm install @gamastudio/colorslog
```

## Usage

### Import the module

First, import the `colors` instance from the module:

```typescript
import { colors, SystemMessageType } from '@gamastudio/colorslog';
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
  // Add more types as needed
}
```

## Colors Class

### Properties

- `TIMEOUT`: `string` - Code to reset the color (not used currently).
- `colors`: `{ [key: string]: string }` - Map of ANSI escape codes for various colors and styles.

### Methods

- `log(color: string, text: string)`: Logs a message to the console with the specified color.
- `sys(type: string, text: string | object | any)`: Logs a system message with a color based on the type.
- `system(text: string)`: Logs a system message of type `SYS`.
- `info(text: string)`: Logs an informational message.
- `success(text: string)`: Logs a success message.
- `error(text: string | any)`: Logs an error message.

## Example

Here's an example of how to use the `colorslog` package:

```typescript
import { colors } from '@gamastudio/colorslog';

colors.system('System message');
colors.info('Information message');
colors.success('Success message');
colors.error('Error message');
colors.sys('WARNING', 'Custom warning message');
```

## License

This project is licensed under the MIT License.
