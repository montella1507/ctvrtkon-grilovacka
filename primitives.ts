const rules = /^[a-z](?:[a-z]+\d*|\d{2,})$/i;
const username = "pepa";

// Validace validity username
if (rules.test(username)) {
  console.log("Validace: Validní");
} else {
  console.log("Validace: Nevalidní");
}


// Porovnávání usernamu
const usernameA = "pepa";
const usernameB = "pePa";

console.log("Simple porovnání:" + usernameA === usernameB);

const normalizedA = usernameA.trim().toUpperCase();
const normalizedB = usernameB.trim().toUpperCase();

console.log({normalizedA, normalizedB})
console.log("Normalizované porovnání:" + normalizedA == normalizedB);
