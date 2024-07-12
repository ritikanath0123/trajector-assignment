// 13. Create a data fixture to use in populating the form fields

const faker = require('faker');

// Generating random first and last name
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

// Generating random email address
const email = faker.internet.email();

// Generating random phone number
const phone = faker.phone.phoneNumber();

// State and zipcode
const state = 'Alabama';
const zipcode = '35049';

// Defining the data fixture object
const dataFixture = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    state: state,
    zipcode: zipcode
};

// Exporting the data fixture object
module.exports = dataFixture;