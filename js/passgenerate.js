document.addEventListener('DOMContentLoaded', function() {
  const englishWords = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
    "ice", "jackfruit", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya",
    "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon",
    "xigua", "yellow", "zucchini", "apricot", "blackberry", "coconut", "durian",
    "eggplant", "feijoa", "gooseberry", "huckleberry", "jujube", "kumquat", "lychee",
    "mulberry", "nashi", "olive", "persimmon", "quandong", "rambutan", "soursop",
    "tamarillo", "ugli", "voavanga", "wolfberry", "xigua", "yumberry", "zinfandel",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
  ];

  // Function to generate a random password
  function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, easyToSay, easyToRead) {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_-+={}[]|;:<>,.?/~";
    const easyToReadChars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

    let charPool = "";

    if (easyToSay) {
      let password = "";
      while (password.length < length) {
        const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
        password += randomWord;
      }
      return password.slice(0, length);
    } else if (easyToRead) {
      charPool = easyToReadChars;
    } else {
      if (includeUppercase) charPool += uppercaseChars;
      if (includeLowercase) charPool += lowercaseChars;
      if (includeNumbers) charPool += numberChars;
      if (includeSymbols) charPool += symbolChars;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool.charAt(randomIndex);
    }

    return password;
  }

  // Get references to HTML elements
  const passwordLengthSlider = document.getElementById("password-length");
  const passwordLengthOutput = document.getElementById("password-length-output");
  const passwordOutput = document.getElementById("password-output");
  const generatePasswordButton = document.getElementById("generate-password");
  const copyPasswordButton = document.getElementById("copy-password");
  const uppercaseCheckbox = document.getElementById("uppercase");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");
  const easyToReadRadio = document.getElementById("easy-to-read");
  const easyToSayRadio = document.getElementById("easy-to-say");
  const allCharactersRadio = document.getElementById("all-characters");

  // Update password length output when slider changes
  passwordLengthSlider.addEventListener("input", () => {
    passwordLengthOutput.textContent = passwordLengthSlider.value;
  });

  // Update password display when "Generate" button is clicked
  generatePasswordButton.addEventListener("click", () => {
    const length = parseInt(passwordLengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;
    const easyToRead = easyToReadRadio.checked;
    const easyToSay = easyToSayRadio.checked;
    
    const newPassword = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, easyToSay, easyToRead);
    passwordOutput.value = newPassword;
  });

  // Copy password to clipboard when "Copy" button is clicked
  copyPasswordButton.addEventListener("click", () => {
    passwordOutput.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
  });
  
  generatePasswordButton.click();
});
