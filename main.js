// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
validateCred = creditArray => {
  let tempArray = creditArray; // Temp array to preserve original array values
  let droppedValue = creditArray[creditArray.length - 1]; // Stores dropped array value for later addition in CC validation equation
  tempArray.pop(); // Pops off last value of array
  tempArray.reverse(); // Reverses the array in order to perform Luhn's algorithm
  let creditSum = 0; // Adds individual CC numbers to determine value
  let numberSum = 0; // Adds array values % 2 != 0 to variable
  let evenSum = 0; // Array for even # slot within array (non-reversed)
  // Loop to iterate throughout the array
  for(let arrayTraverse = 0; arrayTraverse < tempArray.length; arrayTraverse++) {
    // Loop to only multiple odd (non-reversed) elements within the array
    if(arrayTraverse % 2 == 0)
    {
      let number = tempArray[arrayTraverse] * 2; // Multiply odd array elements by 2
      if(number > 9) {number = number - 9}; // Because CC numbers cannot be greater than 9, anything larger is subtracted by 9
      numberSum += number; // Temporarily holds single CC digit to be added to validator equation
    }
    // Conditional to target specific array elements
    if(arrayTraverse % 2 != 0) {
      evenSum += tempArray[arrayTraverse]; // Adds together array elements (non-reversed) that do not get multiplied
    }
  }
  creditSum = droppedValue + evenSum + numberSum; // Final equation to get value before modulo check
  tempArray.reverse(); // Puts array back to normal
  tempArray.push(droppedValue); // Puts dumped value back
  return (creditSum % 10 == 0) ? 'Valid' : 'Invalid'; // Returns validity of CC number
}
const findInvalidCards = batchArray => {
  let invalidCred = []; // New array to hold invalid CC arrays
  // Loop through the batch to test the nested CC arrays and validate them
  for(let batchLoop = 0; batchLoop < batchArray.length; batchLoop++) {
    if(validateCred(batchArray[batchLoop]) != 'Valid') {invalidCred.push(batchArray[batchLoop])}; // Pushes invalid CC numbers to new array
  }
  return invalidCred; // Return invalid CC array
}
const idInvalidCardCompanies = (batchArray) => {
  let companyCheck = []; // Array that holds CC to be verified with CC company
  let companies = []; // Array that holds company names for invalid CC
  // Call the findInvalidCards function to target invalid cards in order to check their CC companies
  companyCheck = findInvalidCards(batchArray);
  // For...of loop to iterate through invalidArray and compare first value - needed for nested array
  for(const firstNum of companyCheck) {
    // Switch conditional to determine which companies issues invalid cards
    switch(firstNum[0]) {
      case 3:
        // Checks for single entry of CC companies and pushes it to companies array for output
        if(companies.indexOf('Amex') === -1) companies.push('Amex');
        break;
      case 4:
        if(companies.indexOf('Visa') === -1) companies.push('Visa');
        break;
      case 5:
        if(companies.indexOf('Mastercard') === -1) companies.push('Mastercard');
        break;
      case 6:
        if(companies.indexOf('Discover') === -1) companies.push('Discover');
        break;
      default:
        console.log('Company not found!'); // Default message if CC is unknown
        break;
    }
  }
  return companies; // Returns list of CC comapnies with invalid CC's
}