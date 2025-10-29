import { colors } from '../src';

describe('blah', () => {
 
  it('works', () => {
    colors.success('FUNCIONANDO');
  });
  it('works', () => {
    colors.error('FUNCIONANDO');
  });
  it('works', () => {
    colors.warn('FUNCIONANDO');
  });
  it('works', () => {
    colors.timeout('FUNCIONANDO');
  });
  it('works', () => {
    colors.system('FUNCIONANDO');
  });
  it('works', () => {
    colors.info('FUNCIONANDO');
  });
});

describe('Visibility Tests', () => {
  it('should display messages without background (default mode)', () => {
    console.log('\n=== MODO POR DEFECTO (SIN FONDO) ===');
    colors.error('Este es un mensaje de error');
    colors.warn('Este es un mensaje de advertencia');
    colors.info('Este es un mensaje de información');
    colors.success('Este es un mensaje de éxito');
    colors.system('Este es un mensaje del sistema');
    colors.timeout('Este es un mensaje de timeout');
  });

  it('should display messages with background when enabled', () => {
    console.log('\n=== MODO CON FONDO ACTIVADO ===');
    colors.error('Este es un mensaje de error con fondo', { useBackground: true });
    colors.warn('Este es un mensaje de advertencia con fondo', { useBackground: true });
    colors.info('Este es un mensaje de información con fondo', { useBackground: true });
    colors.success('Este es un mensaje de éxito con fondo', { useBackground: true });
    colors.system('Este es un mensaje del sistema con fondo', { useBackground: true });
    colors.timeout('Este es un mensaje de timeout con fondo', { useBackground: true });
  });

  it('should respect global background configuration', () => {
    console.log('\n=== CONFIGURACIÓN GLOBAL CON FONDO ===');
    colors.setConfig({ useBackground: true });
    colors.error('Error con configuración global de fondo');
    colors.success('Éxito con configuración global de fondo');

    console.log('\n=== VOLVIENDO A CONFIGURACIÓN SIN FONDO ===');
    colors.setConfig({ useBackground: false });
    colors.error('Error sin fondo (configuración global)');
    colors.success('Éxito sin fondo (configuración global)');
  });
});

describe('Multiple Arguments Tests', () => {
  it('should concatenate multiple string arguments', () => {
    console.log('\n=== CONCATENACIÓN DE MÚLTIPLES ARGUMENTOS ===');
    colors.info('Primer argumento', 'segundo argumento', 'tercer argumento');
    colors.success('Usuario:', 'Juan', 'Edad:', 25);
    colors.error('Error en línea', 42, 'del archivo', 'main.js');
  });

  it('should handle mixed data types', () => {
    console.log('\n=== TIPOS DE DATOS MIXTOS ===');
    const user = { name: 'Ana', age: 30 };
    const numbers = [1, 2, 3, 4, 5];
    
    colors.info('Usuario:', user, 'Números:', numbers);
    colors.warn('Valor booleano:', true, 'Número:', 123.45, 'Null:', null);
    colors.success('Procesando', 'datos...', 'Completado:', '100%');
  });

  it('should work with configuration as last argument', () => {
    console.log('\n=== CONFIGURACIÓN CON MÚLTIPLES ARGUMENTOS ===');
    colors.error('Error crítico', 'en el sistema', 'código:', 500, { useBackground: true });
    colors.success('Operación', 'completada', 'exitosamente', { useBackground: true, dateShow: false });
    colors.info('Información', 'del usuario', { name: 'Pedro' }, { useBackground: false });
  });

  it('should handle empty arguments gracefully', () => {
    console.log('\n=== ARGUMENTOS VACÍOS ===');
    colors.info();
    colors.warn('Solo un argumento');
    colors.error('', 'argumento vacío al inicio');
  });
});
