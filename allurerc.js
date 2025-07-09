import { defineConfig } from '@playwright/test';

export default defineConfig({
    name: "Allure Report",
    output: "./allure-report",
    historyPath: "./history.json",
    plugins: {
        awesome: {
            options: {
                singleFile: false,
                reportLanguage: "en",
            },
        },
    },
});
