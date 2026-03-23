import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: 'e2e-tests',

    fullyParallel: false,

    workers: 1,

   forbidOnly: false,

   reporter: [
        ['list'],
        ['html', {outputFile: 'test artifacts/executionReport.html'}]
   ],

   outputDir: 'test-artifacts',

   timeout: 1000 * 60 * 60,

   expect: {
    timeout: 10000
   },

   testMatch: 'e2e-tests/*.ts',

   use:{
    baseURL: '/',

    colorScheme: 'dark',

    screenshot: 'on',

    trace: 'off',

    video: 'off',

    actionTimeout: 3000,

    launchOptions: {
        'headless': false
    }
   },

   projects: [
    {
        name: 'Chromium_browser',
        use: {

            baseURL: 'https://playwright.dev/',

            ...devices['Desktop Chrome'],
             
            colorScheme: 'dark',

            screenshot: 'on',

            viewport: { width: 1280, height: 720}
        }
    },
    {
        name: 'Firefox_browser',
        use: {

            baseURL: 'https://playwright.dev/',

            ...devices['Desktop Firefox'],
             
            colorScheme: 'dark',

            screenshot: 'on',

            viewport: { width: 1280, height: 720}
        }
    },
    {
        name: 'Webkit_browser',
        use: {
            ...devices['Desktop Safari'],
             
            colorScheme: 'dark',

            screenshot: 'on',

            viewport: { width: 1280, height: 720}
        }
    },
    {
        name: 'Edge_browser',
        use: {

            baseURL: 'https://playwright.dev/',

            channel: 'msedge',
             
            colorScheme: 'light',

            screenshot: 'on'
        },
        grepInvert: [
            /@flaky/
        ]
    },
    {
        name: 'IPhone_Mobile',
        use: {
            baseURL: 'https://www.browserstack.com/',

            ...devices['iPhone 13 Pro Max'],

            colorScheme: 'light',

            screenshot: 'on'

        }
    },
    {
        name: 'IPhone_Landscape',
        use: {
            baseURL: 'https://www.browserstack.com/',

            ...devices['iPhone 13 Pro Max landscape'],

            colorScheme: 'light',

            screenshot: 'on'
        }
    }
   ]

})
