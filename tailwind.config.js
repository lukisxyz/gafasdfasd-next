const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindCssAnimate = require('tailwindcss-animate')

module.exports = {
    content: ['./src/**/*.js'],
    darkMode: 'media',
    theme: {
        extend: {
            animation: {
                blink: 'blink 1.4s infinite both',
            },
            boxShadow: {
                menu:
                    '0px 1px 9px 1px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(18, 24, 38, 0.08), 0px 1px 2px rgba(18, 24, 38, 0.12)',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                purple: {
                    normal: '#B568F1',
                    darker: '#8B3DFF',
                },
                blue: {
                    normal: '#26C0F1',
                    darker: '#1C8FC3',
                },
                red: {
                    normal: '#D30000',
                    darker: '#B10000',
                },
                green: {
                    normal: '#0CBC8B',
                    darker: '#09A872',
                },
                slate: {
                    normal: '#E3E3E3',
                    dark: '#858585',
                    darker: '#C9C9C9',
                },
            },
            keyframes: {
                blink: {
                    '0%': {
                        opacity: '0.2',
                    },
                    '20%': {
                        opacity: '1',
                    },
                    '100%': {
                        opacity: ' 0.2',
                    },
                },
            },
            spacing: {
                4.5: '1.125rem',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), tailwindCssAnimate],
}
