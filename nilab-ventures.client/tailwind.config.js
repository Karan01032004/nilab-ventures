/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // ✅ Screens ko yahan rakha hai taake Bootstrap breakpoints poore project mein chalein
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",   // 16px
                sm: "1.25rem",    // 20px
                md: "1.5rem",     // 24px
                lg: "2rem",       // 32px
                xl: "2rem",
                "2xl": "2rem",
            },
        },
        extend: {
            fontFamily: {
                primary: ["Figtree", "ui-sans-serif", "system-ui"],
                secondary: ["Playfair Display", "ui-serif", "Georgia"],
            },
            spacing: {
                30: "var(--space-30)",
                50: "var(--space-50)",
                70: "var(--space-70)",
                100: "var(--space-100)",
                200: "var(--space-200)",
            },
            fontSize: {
                xxs: ['0.625rem', '1rem'], //10px
                xs: ['0.75rem', '1.125rem'], //12px
                sm: ['0.875rem', '1.5rem'], //14px
                base: ['1rem', '1.5rem'], //16px
                lg: ['1.125rem', '1.75rem'], //18px
                xl: ['1.25rem', '2rem'], //20px
                '1xl': ['1.375rem', '2rem'], //22px
                '2xl': ['1.5rem', '2.125rem'], //24px
                '3xl': ['2rem', '2.75rem'], //32px
                '3.5xl': ['2.25rem', '3rem'], //36px
                '4xl': ['2.5rem', '3.5rem'], //40px
                '5xl': ['3rem', '4.125rem'], //48px
                '6xl': ['3.5rem', '4.75rem'], //56px
                '7xl': ['4rem', '5rem'], //64px
                '8xl': ['4.5rem', '6.125rem'], //72px
                '9xl': ['5rem', '6.625rem'], //80px
            },
            colors: {
                'gray-f2f2f2': '#F2F2F2',
                'gray-555555': '#555555',
                'gray-6e6e6e': '#6E6E6E',
                'gray-9e9e9e': '#9E9E9E',
                'gray-404040': '#404040',
                'yellow-ffb200': '#FFB200',
            },
        },
    },
    plugins: [],
}