import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto',
      },
      container: {
        center: true,
        screens: {
          xl: '1280px',
          sp: '1620px'
        }
      },
      colors: {
        main: 'var(--color-main)',
        main700: 'var(--color-main-700)',
        main900: 'var(--color-main-900)',
        secondary: 'var(--color-secondary)',
        white: 'var(--color-white)',
      },
      fontSize: {
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '1xl': '22px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
};
