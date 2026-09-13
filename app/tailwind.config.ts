// import type { Config } from 'tailwindcss';

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         border: 'var(--color-border)',
//         input: 'var(--color-input)',
//         ring: 'var(--color-ring)',
//         background: 'var(--color-background)',
//         foreground: 'var(--color-foreground)',
//         primary: {
//           DEFAULT: 'var(--color-primary)',
//           foreground: 'var(--color-primary-foreground)',
//         },
//         secondary: {
//           DEFAULT: 'var(--color-secondary)',
//           foreground: 'var(--color-secondary-foreground)',
//         },
//         destructive: {
//           DEFAULT: 'var(--color-destructive)',
//           foreground: 'var(--color-destructive-foreground)',
//         },
//         muted: {
//           DEFAULT: 'var(--color-muted)',
//           foreground: 'var(--color-muted-foreground)',
//         },
//         accent: {
//           DEFAULT: 'var(--color-accent)',
//           foreground: 'var(--color-accent-foreground)',
//         },
//         popover: {
//           DEFAULT: 'var(--color-popover)',
//           foreground: 'var(--color-popover-foreground)',
//         },
//         card: {
//           DEFAULT: 'var(--color-card)',
//           foreground: 'var(--color-card-foreground)',
//         },
//       },
//       borderRadius: {
//         lg: 'var(--radius-lg)',
//         md: 'var(--radius-md)',
//         sm: 'var(--radius-sm)',
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

// export default config;

































import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // <-- added: lets next-themes toggle dark mode by adding/removing a class, instead of only following OS preference
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;