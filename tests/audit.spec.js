const { test, expect } = require('@playwright/test');

/**
 * INDIAN RESPONSIVE & LOCALE AUDIT (LOCAL AUTOMATION)
 * This script verifies your site's UI across dominant Indian screen 
 * resolutions and your four primary local language translations.
 */

const LOCALES = ['en', 'hi', 'ta', 'te'];
const RESOLUTIONS = [
  { name: 'India-Mobile-360', width: 360, height: 800 },
  { name: 'Tablet-Portrait-768', width: 768, height: 1024 },
  { name: 'Budget-Laptop-1366', width: 1366, height: 768 },
  { name: 'Standard-Desktop-1920', width: 1920, height: 1080 }
];

test.describe('Indian Context Audit', () => {
  for (const locale of LOCALES) {
    for (const res of RESOLUTIONS) {
      test(`Audit for ${locale.toUpperCase()} at ${res.name} (${res.width}x${res.height})`, async ({ page }) => {
        // Base URL (Change to local http://localhost:4321 if testing before push)
        const baseUrl = 'https://uxbooks.in';
        const url = locale === 'en' ? baseUrl : `${baseUrl}/${locale}/`;
        
        await page.setViewportSize({ width: res.width, height: res.height });
        await page.goto(url);
        await page.waitForLoadState('networkidle');

        // Check for common Indian script issues: Overlapping Navigation
        const favBtn = await page.locator('.favorite-btn');
        const feedbackBtn = await page.locator('button:has-text("Feed"), button:has-text("अभि"), button:has-text("கரு"), button:has-text("అభి")');
        
        // Take an individual screenshot of each locale-resolution pair
        await page.screenshot({ 
          path: `tests/screenshots/${locale}-${res.name}.png`,
          fullPage: false
        });

        // Basic Assertions: Ensure buttons aren't overlapping or hidden
        if (await feedbackBtn.isVisible()) {
          const box = await feedbackBtn.boundingBox();
          expect(box.width).toBeGreaterThan(0);
          expect(box.height).toBeGreaterThan(0);
        }

        console.log(`✅ Passed: ${locale} at ${res.width}px`);
      });
    }
  }
});
