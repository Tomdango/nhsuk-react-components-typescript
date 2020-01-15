import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import sass from 'rollup-plugin-sass';

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    sass(),
  ],
};
