var generateName = require('sillyname');
var sillyName = generateName();
console.log(sillyName);

// --------------------------------------------------------------

const { scanQRCode, generateQRCode } = require('qr-code-scanner-sumzai');

// Generate a QR Code from a link
const link = 'https://www.google.com';
const qrCode = generateQRCode(link);

console.log(`Generated QR Code for ${link}`);
console.log(qrCode);

// Scan a QR Code image and extract the link
const imageData = qrCode.bitmap;
try {
  const scannedLink = scanQRCode(imageData);
  console.log(`Scanned QR Code Link: ${scannedLink}`);
} catch (error) {
  console.error(error.message);
}

// --------------------------------------------------------------

import {randomSuperhero} from 'superheroes';

var me = randomSuperhero();
console.log(me);