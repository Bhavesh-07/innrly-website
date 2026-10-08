import asyncio
from playwright.async_api import async_playwright

async def test():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Listen to page console logs
        page.on("console", lambda msg: print(f"[CONSOLE {msg.type}] {msg.text}"))
        
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(1000)
        
        banner = page.locator('[role="dialog"][aria-label="Cookie and privacy preferences"]')
        print('Initial banner visible:', await banner.is_visible())
        
        # Check if button exists in DOM
        btn_exists = await page.evaluate("Boolean(document.getElementById('do-not-sell-link'))")
        print('Do not sell link exists in DOM:', btn_exists)
        
        # Check if window.openCookieConsent exists
        has_helper = await page.evaluate("typeof window.openCookieConsent")
        print('window.openCookieConsent type:', has_helper)
        
        # Click reject on banner
        await banner.locator("button:has-text('Reject All / Opt-Out')").click(force=True)
        await page.wait_for_timeout(500)
        print('After reject visible:', await banner.is_visible())
        
        # Click footer button
        print('Clicking footer button via page.evaluate...')
        await page.evaluate("document.getElementById('do-not-sell-link').click()")
        await page.wait_for_timeout(500)
        print('After footer button click visible:', await banner.is_visible())
        
        # Test legal/privacy
        await page.goto('http://localhost:3000/legal/privacy', wait_until='networkidle')
        await page.wait_for_timeout(500)
        print('Privacy page loaded. Clicking Open Privacy & Cookie Preferences...')
        await page.click("button:has-text('Open Privacy & Cookie Preferences')", force=True)
        await page.wait_for_timeout(500)
        print('Privacy page banner visible:', await banner.is_visible())
        
        # Test legal/cookies
        await page.goto('http://localhost:3000/legal/cookies', wait_until='networkidle')
        await page.wait_for_timeout(500)
        print('Cookies page loaded. Clicking Open Cookie Preferences...')
        await page.click("button:has-text('Open Cookie Preferences')", force=True)
        await page.wait_for_timeout(500)
        print('Cookies page banner visible:', await banner.is_visible())
        
        await browser.close()

asyncio.run(test())
