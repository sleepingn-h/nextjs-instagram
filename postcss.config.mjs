/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nested',
  },
};

export default config;
