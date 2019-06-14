
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'src/StyledComponents/index.js',
    output: {
      file: 'dist/StyledComponents.js',
      format: 'cjs'
    },
    external: [
      'react', 
      'react-proptypes',
      'styled-components'
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
    ]
  },
  {
    input: 'src/Emotion/index.js',
    output: {
      file: 'dist/Emotion.js',
      format: 'cjs'
    },
    external: [
      'react', 
      'react-proptypes'
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
    ]
  },
  {
    input: 'src/Styletron/index.js',
    output: {
      file: 'dist/Styletron.js',
      format: 'cjs'
    },
    external: [
      'react', 
      'react-proptypes'
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
    ]
  }
];