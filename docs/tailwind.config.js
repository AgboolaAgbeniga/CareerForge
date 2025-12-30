/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        slate: {
          850: '#151e32', // Custom dark shade
          950: '#020617',
        },
        // Status colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(37, 99, 235, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.25' }],
        '3xl': ['30px', { lineHeight: '1.2' }],
        '4xl': ['36px', { lineHeight: '1.1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      animation: {
        'sidebar-collapse': 'sidebar-collapse 0.2s ease-out',
        'page-transition': 'page-transition 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out'
      },
      keyframes: {
        'sidebar-collapse': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'page-transition': {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.text.primary.light'),
            '[class~="lead"]': {
              color: theme('colors.text.secondary.light')
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'underline',
              fontWeight: '500'
            },
            strong: {
              color: theme('colors.text.primary.light'),
              fontWeight: '600'
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha'
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha'
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha'
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha'
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman'
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman'
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman'
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman'
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal'
            },
            'ol > li': {
              position: 'relative'
            },
            'ol > li::before': {
              content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
              position: 'absolute',
              fontWeight: '400',
              color: theme('colors.text.secondary.light'),
              left: '0'
            },
            'ul > li': {
              position: 'relative'
            },
            'ul > li::before': {
              content: '""',
              position: 'absolute',
              backgroundColor: theme('colors.text.secondary.light'),
              borderRadius: '50%',
              width: '0.375rem',
              height: '0.375rem',
              top: 'calc(0.875rem - 0.1875rem)',
              left: '0.25rem'
            },
            hr: {
              borderColor: theme('colors.surface.light'),
              borderTopWidth: 1
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: theme('colors.text.primary.light'),
              borderLeftWidth: '0.25rem',
              borderLeftColor: theme('colors.surface.light'),
              quotes: '"\\201C""\\201D""\\2018""\\2019"'
            },
            h1: {
              color: theme('colors.text.primary.light'),
              fontWeight: '600'
            },
            h2: {
              color: theme('colors.text.primary.light'),
              fontWeight: '600'
            },
            h3: {
              color: theme('colors.text.primary.light'),
              fontWeight: '600'
            },
            h4: {
              color: theme('colors.text.primary.light'),
              fontWeight: '600'
            },
            'figure figcaption': {
              color: theme('colors.text.secondary.light')
            },
            code: {
              color: theme('colors.text.primary.light'),
              backgroundColor: theme('colors.surface.light'),
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              fontSize: '0.875em',
              fontWeight: '600'
            },
            'a code': {
              color: theme('colors.primary.DEFAULT')
            },
            pre: {
              backgroundColor: theme('colors.code.background.light'),
              color: theme('colors.code.foreground.light')
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit'
            },
            'pre code::before': {
              content: 'none'
            },
            'pre code::after': {
              content: 'none'
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em'
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.surface.light')
            },
            'thead th': {
              color: theme('colors.text.primary.light'),
              fontWeight: '600',
              verticalAlign: 'bottom'
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.surface.light')
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0'
            },
            'tbody td': {
              verticalAlign: 'top'
            }
          }
        },
        invert: {
          css: {
            color: theme('colors.text.primary.dark'),
            '[class~="lead"]': {
              color: theme('colors.text.secondary.dark')
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'underline',
              fontWeight: '500'
            },
            strong: {
              color: theme('colors.text.primary.dark'),
              fontWeight: '600'
            },
            'ol > li::before': {
              color: theme('colors.text.secondary.dark')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.text.secondary.dark')
            },
            hr: {
              borderColor: theme('colors.surface.dark')
            },
            blockquote: {
              color: theme('colors.text.primary.dark'),
              borderLeftColor: theme('colors.surface.dark')
            },
            h1: {
              color: theme('colors.text.primary.dark')
            },
            h2: {
              color: theme('colors.text.primary.dark')
            },
            h3: {
              color: theme('colors.text.primary.dark')
            },
            h4: {
              color: theme('colors.text.primary.dark')
            },
            'figure figcaption': {
              color: theme('colors.text.secondary.dark')
            },
            code: {
              color: theme('colors.text.primary.dark'),
              backgroundColor: theme('colors.surface.dark'),
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              fontSize: '0.875em',
              fontWeight: '600'
            },
            'a code': {
              color: theme('colors.primary.DEFAULT')
            },
            pre: {
              backgroundColor: theme('colors.code.background.dark'),
              color: theme('colors.code.foreground.dark')
            },
            thead: {
              borderBottomColor: theme('colors.surface.dark')
            },
            'tbody tr': {
              borderBottomColor: theme('colors.surface.dark')
            }
          }
        }
      })
    }
  },
  plugins: [
    // require('@tailwindcss/typography'), // TODO: Install @tailwindcss/typography package
    // require('@tailwindcss/forms'), // TODO: Install @tailwindcss/forms package
    // require('@tailwindcss/aspect-ratio'), // TODO: Install @tailwindcss/aspect-ratio package
    function({ addBase }) {
      addBase({
        ':root': {
          '--color-background': '#FFFFFF',
          '--color-surface': '#F8FAFC',
          '--color-text-primary': '#0F172A',
          '--color-text-secondary': '#334155',
          '--color-primary': '#2563EB',
          '--color-accent': '#22D3EE',
          '--color-code-background': '#f6f8fa',
          '--color-code-foreground': '#24292e'
        },
        '.dark': {
          '--color-background': '#0B0F1A',
          '--color-surface': '#0F172A',
          '--color-text-primary': '#F1F5F9',
          '--color-text-secondary': '#E5E7EB',
          '--color-code-background': '#1a1b26',
          '--color-code-foreground': '#c0caf5'
        }
      })
    }
  ]
}