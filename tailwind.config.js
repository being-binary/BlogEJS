/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.ejs', // Add this line to scan all .ejs files in the views directory
    './public/**/*.html', // Optional: You can include other file types, like HTML
    './src/**/*.js',],
  theme: {
    extend: {},
  },
  plugins: [],
}

