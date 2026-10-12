import { test, expect } from '@playwright/test';

test.describe('Merge Sort Visualizer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('generates array and shows original step', async ({ page }) => {
    await page.getByTestId('array-input').fill('38,12,27,43');
    await page.getByTestId('generate-btn').click();
    await expect(page.getByTestId('tree-container')).toContainText('38');
    await expect(page.getByTestId('step-counter')).toHaveText('Step 0 / 2');
    await expect(page.getByTestId('explanation')).toHaveText(/Original array/);
  });

  test('next step shows split explanation', async ({ page }) => {
    await page.getByTestId('array-input').fill('38,12,27,43');
    await page.getByTestId('generate-btn').click();
    await page.getByTestId('next-btn').click();
    await expect(page.getByTestId('step-counter')).toHaveText('Step 1 / 2');
    await expect(page.getByTestId('explanation')).toHaveText(/Split/);
  });

  test('previous step returns to original', async ({ page }) => {
    await page.getByTestId('array-input').fill('38,12,27,43');
    await page.getByTestId('generate-btn').click();
    await page.getByTestId('next-btn').click();
    await page.getByTestId('prev-btn').click();
    await expect(page.getByTestId('step-counter')).toHaveText('Step 0 / 2');
    await expect(page.getByTestId('explanation')).toHaveText(/Original array/);
  });

  test('page loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    expect(errors).toEqual([]);
  });
});
