/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            lineClamp: {
                3: '3',
            },
        },
    },
    plugins: [],
};
