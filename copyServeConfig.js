// copyServeConfig.js
import { copyFileSync } from 'fs';

// Copiar o arquivo serve.json para a pasta dist
try {
  copyFileSync('serve.json', 'dist/serve.json');
  console.log('serve.json copiado para a pasta dist');
} catch (err) {
  console.error('Erro ao copiar serve.json:', err);
}
