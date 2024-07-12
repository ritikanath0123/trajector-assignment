// const { chromium } = require('playwright');
// const faker = require('faker');

class TrajectorMedicalPage {
    constructor(page) {
        this.page = page;
    }

    // 7. Create a page object model for the page
    async navigate() {
        await this.page.goto('https://www.trajectormedical.com/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isOnHomePage() {
        const currentUrl = this.page.url();
        const expectedUrl = 'https://www.trajectormedical.com/';
        return currentUrl === expectedUrl;
    }

    async clickFreeMedicalEvaluation() {
        await this.page.getByRole('link', { name: 'FREE Medical Evaluation' }).click();
    }

    async waitForForm() {
        await this.page.waitForSelector('form');
    }
}

module.exports = TrajectorMedicalPage;