const { join } = require('path');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
