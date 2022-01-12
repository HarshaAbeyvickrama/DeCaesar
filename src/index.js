import alphabet from "alphabet";

var lowercase = alphabet.lower.join("");
const alphabetFreq = {
  a: 8.167,
  b: 1.492,
  c: 2.782,
  d: 4.253,
  e: 12.702,
  f: 2.228,
  g: 2.015,
  h: 6.094,
  i: 6.966,
  j: 0.153,
  k: 0.772,
  l: 4.025,
  m: 2.406,
  n: 6.749,
  o: 7.507,
  p: 1.929,
  q: 0.095,
  r: 5.987,
  s: 6.327,
  t: 9.056,
  u: 2.758,
  v: 0.978,
  w: 2.36,
  x: 0.15,
  y: 1.974,
  z: 0.074,
};

// Enter the cipher text here
var string =
  "L'p lq oryh zlwk wkh vkdsh ri brx Zh sxvk dqg sxoo olnh d pdjqhw gr Dowkrxjk pb khduw lv idoolqj wrr L'p lq oryh zlwk brxu ergb Dqg odvw qljkw brx zhuh lq pb urrp Dqg qrz pb ehgvkhhwv vphoo olnh brx Hyhub gdb glvfryhulqj vrphwklqj eudqg qhz L'p lq oryh zlwk brxu ergb Rk—L—rk—L—rk—L—rk—L L'p lq oryh zlwk brxu ergb Rk—L—rk—L—rk—L—rk—L L'p lq oryh zlwk brxu ergb Rk—L—rk—L—rk—L—rk—L L'p lq oryh zlwk brxu ergb Hyhub gdb glvfryhulqj vrphwklqj eudqg qhz L'p lq oryh zlwk wkh vkdsh ri brx";
string = string.toLowerCase();
var LETTERS = lowercase.split("");

// Brute force Method
for (var i = 1; i < 26; i++) {
  console.log("Key --> " + i + "\nText : " + deCipher(string, i));
  console.log("");
}

// statistical Analysis
// statisticalDecipher(string, alphabetFreq);

function isALetter(char) {
  return /[a-zA-Z]/.test(char);
}
function deCipher(string, key) {
  var decipheredText = [];
  var stringArray = string.split("");
  stringArray.forEach((letter, i) => {
    if (isALetter(letter)) {
      var index = LETTERS.indexOf(letter);
      var decipheredIndex = (index - key) % 26;
      decipheredIndex < 0 ? (decipheredIndex += 26) : decipheredIndex;
      // console.log('Index --> ' + index + ' DI --> ' + decipheredIndex);
      decipheredText.push(LETTERS[decipheredIndex]);
    } else {
      decipheredText.push(letter);
    }
  });
  return decipheredText.join("");
}

function calculateFrequency(string) {
  var frequency = {};
  var length = string.length;
  string.split("").forEach((letter) => {
    if (isALetter(letter)) {
      if (frequency[letter]) {
        frequency[letter] += 1;
      } else {
        frequency[letter] = 1;
      }
    }
  });
  console.log(sortByFrequency(frequency));
  //   calculate relative frequency
  for (var key in frequency) {
    frequency[key] = ((frequency[key] / length) * 100).toFixed(3);
  }
  console.log(sortByFrequency(frequency));

  return frequency;
}

function sortByFrequency(frequency) {
  var sorted = {};
  var keys = Object.keys(frequency);
  keys.sort(function (a, b) {
    return frequency[b] - frequency[a];
  });
  keys.forEach(function (key) {
    sorted[key] = frequency[key];
  });

  return sorted;
}

function statisticalDecipher(string, alphabetFreq) {
  var frequency = calculateFrequency(string);
  var sortedString = sortByFrequency(frequency);
  var alphabetFreqSorted = sortByFrequency(alphabetFreq);
  //   console.log(sortedString);
  //     console.log(alphabetFreqSorted);
  var text = deCipher(string, getShift(sortedString[0], alphabetFreqSorted[0]));
  getMostFrequentShift(sortedString, alphabetFreqSorted);
}

function getShift(char1, char2) {
  var index1 = LETTERS.indexOf(char1);
  var index2 = LETTERS.indexOf(char2);
  return index1 - index2;
}

// Calculate most frequent shift
function getMostFrequentShift(sortedString, alphabetFreqSorted) {
  var shifts = [];
  for (var i = 0; i < Object.keys(sortedString).length; i++) {
    shifts.push(
      getShift(Object.keys(sortedString)[i], Object.keys(alphabetFreqSorted)[i])
    );
  }
  shifts.sort();
  //   console.log(shifts);
}
