import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // GitHub Pages-এর জন্য আপনার রিপোজিটরির নাম এখানে যুক্ত করা হয়েছে
    base: '/magical-diary-task-app/',
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(), // React সাপোর্ট দেওয়ার জন্য প্লাগইনটি যুক্ত করা হলো
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
