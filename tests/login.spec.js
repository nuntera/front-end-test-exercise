import { test, expect } from '@playwright/test';

/* test('has title', async ({ page }) => {
  await page.goto('https://playground-drab-six.vercel.app/login');

  await expect(page).toHaveTitle('Playground page');
}); */


test('login sucessed', async ({ page }) => {
    await page.goto('https://playground-drab-six.vercel.app/');
    await expect(page).toHaveTitle('Playground page');

    await page.getByRole('link', { name: 'LOGIN' }).click();
    await expect(page).toHaveURL('https://playground-drab-six.vercel.app/login');

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.getByPlaceholder('Digite seu usuário').fill('teste');

    await page.getByPlaceholder('Digite sua senha').fill('password123');

    await page.getByRole('button', { name: 'Logar' }).click();

    await expect(page).toHaveURL('https://playground-drab-six.vercel.app/dashboard');
});

test('login failed', async ({ page }) => {
    await page.goto('https://playground-drab-six.vercel.app/');
    await expect(page).toHaveTitle('Playground page');

    await page.getByRole('link', { name: 'LOGIN' }).click();
    await expect(page).toHaveURL('https://playground-drab-six.vercel.app/login');

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    for (let index = 0; index < 3; index++) {
        await page.getByPlaceholder('Digite seu usuário').fill('teste');
        await page.getByPlaceholder('Digite sua senha').fill('password1');
        await page.getByRole('button', { name: 'Logar' }).click();

        if (index < 2) {
            await expect(page).toHaveURL('https://playground-drab-six.vercel.app/login');
            await expect(page.getByText('Usuário ou senha estão')).toBeVisible();
        } else {
            await expect(page.getByText('Usuário bloqueado')).toBeVisible();
        }
    }

});