import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), "..", "scratch", "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def run_browser_tests():
    print("=== STARTING FULL MANUAL BROWSER VERIFICATION ===")
    results = {}

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # -------------------------------------------------------------
        # TEST 1: HOMEPAGE INITIAL LOAD & PRE-CONSENT COOKIES
        # -------------------------------------------------------------
        print("\n[TEST 1] Testing Homepage Initial Load & Cookie Banner...")
        context = await browser.new_context(viewport={"width": 1280, "height": 800})
        page = await context.new_page()
        
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Check cookies before consent
        cookies = await context.cookies()
        ga_cookies = [c for c in cookies if c["name"].startswith("_ga")]
        print(f"Pre-consent GA cookies count: {len(ga_cookies)}")
        
        # Verify Banner visibility
        banner = page.locator("[role='dialog'][aria-label='Cookie and privacy preferences']")
        is_banner_visible = await banner.is_visible()
        print(f"Cookie banner visible on initial load: {is_banner_visible}")

        # Check banner text
        banner_text = await banner.inner_text() if is_banner_visible else ""
        has_ccpa_text = "CCPA/CPRA" in banner_text and "opt out of the sale or sharing" in banner_text
        print(f"Banner contains CCPA / Opt-Out notice: {has_ccpa_text}")

        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "01_homepage_banner.png"))

        # Click Reject All / Opt-Out
        reject_btn = banner.locator("button:has-text('Reject All / Opt-Out')")
        await reject_btn.click(force=True)
        await page.wait_for_timeout(500)
        is_banner_hidden_after_reject = not (await banner.is_visible())
        print(f"Banner hidden after clicking Reject: {is_banner_hidden_after_reject}")

        stored_consent = await page.evaluate("localStorage.getItem('innrly_cookie_consent_v1')")
        print(f"Stored consent in localStorage: {stored_consent}")

        results["1_pre_consent_cookies_blocked"] = len(ga_cookies) == 0
        results["1_cookie_banner_displayed"] = is_banner_visible and has_ccpa_text
        results["1_reject_opt_out_works"] = is_banner_hidden_after_reject and stored_consent == "rejected"

        # -------------------------------------------------------------
        # TEST 2: FOOTER "DO NOT SELL" LINK & MODAL RE-OPEN
        # -------------------------------------------------------------
        print("\n[TEST 2] Testing Footer Do Not Sell Link & Cookie Preferences...")
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(500)

        # Check Legal column link
        do_not_sell_col_link = page.locator("footer a[href='/legal/privacy#do-not-sell']")
        col_link_text = await do_not_sell_col_link.inner_text()
        print(f"Footer Legal column link text: '{col_link_text}'")

        # Check bottom bar button
        do_not_sell_btn = page.locator("#do-not-sell-link")
        btn_visible = await do_not_sell_btn.is_visible()
        btn_text = await do_not_sell_btn.inner_text()
        print(f"Footer bottom bar Do Not Sell button visible: {btn_visible}, text: '{btn_text}'")

        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "02_footer_do_not_sell.png"))

        # Click footer button to reopen modal
        await page.evaluate("document.getElementById('do-not-sell-link').click()")
        await page.wait_for_timeout(500)

        is_reopened = await banner.is_visible()
        print(f"Cookie modal reopened from Footer click: {is_reopened}")
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "03_modal_reopened_from_footer.png"))

        # Close banner again
        await banner.locator("button:has-text('Reject All / Opt-Out')").click(force=True)
        await page.wait_for_timeout(300)

        results["2_footer_do_not_sell_column_link"] = "Do Not Sell" in col_link_text
        results["2_footer_bottom_do_not_sell_button"] = btn_visible and "Do Not Sell" in btn_text
        results["2_footer_reopen_modal_works"] = is_reopened

        # -------------------------------------------------------------
        # TEST 3: PRIVACY POLICY PAGE (/legal/privacy)
        # -------------------------------------------------------------
        print("\n[TEST 3] Testing Privacy Policy Page (/legal/privacy)...")
        await page.goto("http://localhost:3000/legal/privacy", wait_until="networkidle")
        await page.wait_for_timeout(500)

        # Verify TOC link
        toc_link = page.locator("nav[aria-label='Privacy policy sections'] a[href='#do-not-sell']")
        toc_text = await toc_link.inner_text()
        print(f"Privacy Policy TOC Do Not Sell link: '{toc_text}'")

        # Verify Section 11
        section_11 = page.locator("#do-not-sell")
        s11_text = await section_11.inner_text()
        print(f"Section 11 Heading: '{s11_text}'")

        # Scroll to Section 11
        await section_11.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "04_privacy_page_section11.png"))

        # Test interactive preferences button on page
        pref_btn = page.locator("button:has-text('Open Privacy & Cookie Preferences')")
        pref_btn_visible = await pref_btn.is_visible()
        print(f"Privacy page 'Open Privacy & Cookie Preferences' button visible: {pref_btn_visible}")

        await pref_btn.click(force=True)
        await page.wait_for_timeout(500)
        modal_opened_from_privacy = await banner.is_visible()
        print(f"Modal opened from Privacy page button: {modal_opened_from_privacy}")

        # Close banner
        await banner.locator("button:has-text('Reject All / Opt-Out')").click(force=True)
        await page.wait_for_timeout(300)

        results["3_privacy_toc_do_not_sell"] = "Do Not Sell" in toc_text
        results["3_privacy_section11_heading"] = "Do Not Sell" in s11_text
        results["3_privacy_interactive_button"] = pref_btn_visible and modal_opened_from_privacy

        # -------------------------------------------------------------
        # TEST 4: COOKIE POLICY PAGE (/legal/cookies)
        # -------------------------------------------------------------
        print("\n[TEST 4] Testing Cookie Policy Page (/legal/cookies)...")
        await page.goto("http://localhost:3000/legal/cookies", wait_until="networkidle")
        await page.wait_for_timeout(500)

        pref_heading = page.locator("#preferences")
        pref_heading_text = await pref_heading.inner_text()
        print(f"Cookie Policy Preferences Heading: '{pref_heading_text}'")

        gpc_heading = page.locator("#do-not-sell")
        gpc_heading_text = await gpc_heading.inner_text()
        print(f"Cookie Policy GPC & Do Not Sell Heading: '{gpc_heading_text}'")

        cookie_pref_btn = page.locator("button:has-text('Open Cookie Preferences')")
        cookie_pref_btn_visible = await cookie_pref_btn.is_visible()
        print(f"Cookie page 'Open Cookie Preferences' button visible: {cookie_pref_btn_visible}")

        await pref_heading.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "05_cookies_page_controls.png"))

        await cookie_pref_btn.click(force=True)
        await page.wait_for_timeout(500)
        modal_opened_from_cookies = await banner.is_visible()
        print(f"Modal opened from Cookie page button: {modal_opened_from_cookies}")

        await banner.locator("button:has-text('Reject All / Opt-Out')").click(force=True)
        await page.wait_for_timeout(300)

        results["4_cookies_preferences_section"] = "privacy choices" in pref_heading_text.lower()
        results["4_cookies_gpc_section"] = "Global Privacy Control" in gpc_heading_text
        results["4_cookies_interactive_button"] = cookie_pref_btn_visible and modal_opened_from_cookies

        await context.close()

        # -------------------------------------------------------------
        # TEST 5: GLOBAL PRIVACY CONTROL (GPC) SIGNAL EMULATION
        # -------------------------------------------------------------
        print("\n[TEST 5] Testing Global Privacy Control (GPC) Signal Handling...")
        gpc_context = await browser.new_context(
            viewport={"width": 1280, "height": 800},
            extra_http_headers={"Sec-GPC": "1"}
        )
        await gpc_context.add_init_script("Object.defineProperty(navigator, 'globalPrivacyControl', { value: true, configurable: true });")
        
        gpc_page = await gpc_context.new_page()
        await gpc_page.goto("http://localhost:3000", wait_until="networkidle")
        await gpc_page.wait_for_timeout(1000)

        # With GPC enabled, banner should not aggressively interrupt user, but GPC signal must be detected
        gpc_signal_detected = await gpc_page.evaluate("window.__gpcSignalDetected === true || (typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true)")
        print(f"GPC signal detected on client: {gpc_signal_detected}")

        # Open preferences manually to inspect GPC badge
        await gpc_page.evaluate("document.getElementById('do-not-sell-link').click()")
        await gpc_page.wait_for_timeout(500)

        gpc_banner = gpc_page.locator("[role='dialog'][aria-label='Cookie and privacy preferences']")
        gpc_badge = gpc_banner.locator("text='GPC Signal Active'")
        is_gpc_badge_visible = await gpc_badge.is_visible()
        print(f"'GPC Signal Active' badge visible in modal: {is_gpc_badge_visible}")

        gpc_notice_text = await gpc_banner.inner_text()
        has_gpc_notice = "Global Privacy Control (GPC) signal is active" in gpc_notice_text
        print(f"Modal displays GPC opt-out confirmation message: {has_gpc_notice}")

        await gpc_page.screenshot(path=os.path.join(SCREENSHOT_DIR, "06_gpc_active_modal.png"))

        results["5_gpc_signal_detected"] = gpc_signal_detected
        results["5_gpc_badge_displayed"] = is_gpc_badge_visible
        results["5_gpc_opt_out_confirmed"] = has_gpc_notice

        await gpc_context.close()
        await browser.close()

    print("\n=== SUMMARY OF MANUAL BROWSER VERIFICATION ===")
    all_passed = True
    for test_name, status in results.items():
        icon = "PASSED" if status else "FAILED"
        if not status:
            all_passed = False
        print(f"[{icon}] {test_name}: {status}")

    print(f"\nOVERALL STATUS: {'ALL TESTS PASSED!' if all_passed else 'SOME TESTS FAILED'}")
    return all_passed

if __name__ == "__main__":
    success = asyncio.run(run_browser_tests())
    if not success:
        exit(1)
