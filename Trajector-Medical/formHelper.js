const faker = require('faker');

async function performActionWithWait(page, action) {
    await action();
    await page.waitForTimeout(1000);
}

// 8, 14. Create a helper function that populates the form fields and call it from your script
async function populateForm(page, firstName, lastName, email, phone, state, zipcode) {
    await performActionWithWait(page, async () => await page.fill('input[id="input_33_1_3"]', firstName));
    await performActionWithWait(page, async () => await page.fill('input[id="input_33_1_6"]', lastName));
    await performActionWithWait(page, async () => await page.fill('input[type="email"]', email));
    await performActionWithWait(page, async () => await page.fill('input[id="input_33_13"]', phone));
    await performActionWithWait(page, async () => await page.click('input[id="choice_33_6_0"]'));
    await performActionWithWait(page, async () => await page.click('input[id="choice_33_7_0"]'));
    await performActionWithWait(page, async () => await page.click('input[id="choice_33_10_1"]'));
    await performActionWithWait(page, async () => await page.selectOption('select[id="input_33_14_4"]', { label: state }));
    await performActionWithWait(page, async () => await page.fill('input[id="input_33_14_5"]', zipcode));
}

// 11. Instead of hardcoded value, generate a random First and last name each time the test runs.
async function populateFormWithRandomData(page) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber();
    const state = 'Alabama'; // modify as needed
    const zipcode = '35049'; // modify as needed
    await populateForm(page, firstName, lastName, email, phone, state, zipcode);
}

module.exports = {
    populateForm,
    populateFormWithRandomData
}; 