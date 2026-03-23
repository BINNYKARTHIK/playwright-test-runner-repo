import { test, expect, chromium, Browser, Page, firefox, webkit } from '@playwright/test'

let browser: Browser;
let page: Page;

test.beforeAll(async ({}, testInfo) => {
    switch (testInfo.project.name) {
        case 'Chromium_browser':
            browser = await chromium.launch()
            break;
        case 'Firefox_browser':
            browser = await firefox.launch()
            break;
        case 'Webkit_browser':
            browser = await webkit.launch()
            break;
        default:
            browser = await chromium.launch()
    }
    page = await browser.newPage()
})

test.describe("All E2E Tests", async () => {
    test.describe.configure({ mode: "serial" })
    test.describe("Practice 1", async () => {
        test.describe.configure({ mode: "serial" })
        test('Opening the practice website and validating the header', { tag: '@InitialTest', annotation: { type: 'category', description: 'report' } }, async () => {
            test.info().annotations.push({
                type: 'browser version',
                description: browser.version(),
            });
            await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: "load", timeout: 10000 })
            console.log(test.info().project.name)
            if(test.info().project.name !== 'IPhone_Mobile' && test.info().project.name !== 'IPhone_Landscape')
                await page.setViewportSize({ width: 1920, height: 1080 })
            await page.getByText("PlaywrightPractice").click()
            await page.waitForLoadState("domcontentloaded", { timeout: 5000 })
            await expect(page.locator("h3").filter({ hasText: ' PlaywrightPractice' }), "Able to see the header").toBeVisible()
        });

        test('Performing basic actions like click fill and check', async () => {
            await page.getByRole("button", { name: "Primary Action" }).click()
            await page.getByRole("textbox", { name: "Username:" }).fill("TestUser")
            await page.getByRole("checkbox", { name: "Accept terms" }).check()
            await page.getByText("List item 2 with ").getByText("link").click()
            await page.getByLabel("Email Address:").fill("abc@none.com")
        });
    });


    test('Complex actions like hover drag and drop shadow dom', async () => {
        await expect(page.getByAltText("logo image")).toBeVisible()
        await page.getByText("Point Me").hover()
        await page.getByText("Drag me to my target").dragTo(page.getByText("Drop here"))
        await expect(page.getByText("Dropped!")).toBeVisible()
        await page.getByRole('cell', { name: 'ShadowDOM Mobiles Laptops' }).getByRole('textbox').fill('shadow text');
        await page.keyboard.press('Tab')
        await page.mouse.click(500, 500, { button: "right" })
        await page.getByRole('cell', { name: 'ShadowDOM Mobiles Laptops' }).getByRole('textbox').click({ button: "right" })
    });

    test('Handling dialogs and windows', { tag: '@flaky' }, async () => {
        test.slow()
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe("alert")
            expect(dialog.message()).toBe("I am an alert box!")
            await dialog.accept()
        })
        await page.getByRole("button", { name: "Simple Alert" }).click()
        page.off('dialog', async dialog => {
            expect(dialog.type()).toBe("alert")
            expect(dialog.message()).toBe("I am an alert box!")
            await dialog.accept()
        })
        await page.getByRole("button", { name: "Popup Windows" }).click()
        await page.waitForEvent("popup")
        // await page.waitForTimeout(8000)
        const pageArr: Page[] = page.context().pages()
        for (const page of pageArr) {
            console.log("Page title: " + (await page.title()).toString())
            if ((await page.title()).toString() === "Selenium") {
                await page.bringToFront()
                await pageArr[0].bringToFront()
                await page.close()
            }
        }

        await page.screenshot({ path: 'screenshot.png', fullPage: true });
    });

});