import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js does not require React to be in scope
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars, but ignore those starting with _
      quotes: ['error', 'single'], // Enforce single quotes
    },
  }),
]

export default eslintConfig;
