const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { populateFormWithRandomData } = require('./formHelper');
const TrajectorMedicalPage = require('./TrajectorMedicalPage');

(async () => {
    // Defining the path of the log file
    const logFilePath = path.join(__dirname, 'test.log'); // Define log file path
    // 10, 16. Capture the test log in a file
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); // Create a write stream

    const logMessage = (message) => {
        const log = `[${new Date().toLocaleString()}] ${message}\n`;
        console.log(log);
        logStream.write(log);
    };

    const browser = await chromium.launch();
    const context = await browser.newContext({
        // 6, 12. Record a video of your run
        recordVideo: {
            dir: './videos',
            name: 'video.mp4'
        },
        // 9, 15. Change the screen size to a mobile viewport size
        viewport: { width: 375, height: 812 }
    });
    const page = await context.newPage();
    const trajectorPage = new TrajectorMedicalPage(page);

    try {
        logMessage('Starting test script.');

        // 1. Navigated to trajectormedical.com
        await trajectorPage.navigate();
        logMessage("Navigated to https://www.trajectormedical.com/ website");

        // 2. Confirm you've landed on trajectormedical.com
        const onHomePage = await trajectorPage.isOnHomePage();
        if (onHomePage) {
            logMessage('Successfully landed on Trajector Medical home page.');
        } else {
            logMessage('Did not land on Trajector Medical home page as expected.');
        }

        // 4. Click the “Free Medical Evaluation” button
        await trajectorPage.clickFreeMedicalEvaluation();
        logMessage('Clicked the "FREE Medical Evaluation" button successfully.');

        // Waiting for the form
        await trajectorPage.waitForForm();
        logMessage('Form is ready for population.');

        // 5. Fill in the form using a randomly generated name each time the test will run
        await populateFormWithRandomData(page);
        logMessage('Form populated successfully with random data.');

        //Taking a screenshot for debugging
        await page.screenshot({ path: 'screenshot.png' });
        logMessage('Screenshot taken.');

        // Adding a wait time after form population
        await page.waitForTimeout(5000);
        logMessage('Waiting for 5 seconds.');

    } catch (error) {
        logMessage(`Error: ${error}`);
        // Log error message
        console.error('Error:', error);
    } finally {
        await browser.close();
        logMessage('Browser closed.');
        // Close the log stream
        logStream.end(); 
    }
})();