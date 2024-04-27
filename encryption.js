const crypto = require('crypto');

// Function to generate an AES key
function generateKey() {
  return crypto.randomBytes(32); // 32 bytes = 256 bits
}

// Function to generate an IV (Initialization Vector)
function generateIV() {
  return crypto.randomBytes(16); // IV length is 16 bytes for AES
}

// Function to encrypt plaintext using AES-CBC
function encrypt(text, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Function to decrypt ciphertext using AES-CBC
function decrypt(encryptedText, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Plain text to encrypt
const plaintext = "Hello, world!";

// Generate a random AES key
const key = generateKey();

// Generate a random IV (Initialization Vector)
const iv = generateIV();

// Encrypt the plaintext
const encryptedText = encrypt(plaintext, key, iv);

console.log("Plaintext:", plaintext);
console.log("Encrypted text:", encryptedText);
console.log("Key:", key.toString('hex'));
console.log("IV:", iv.toString('hex'));

const decryptedText = decrypt(encryptedText, key, iv);

console.log("Decrypted text:", decryptedText);
