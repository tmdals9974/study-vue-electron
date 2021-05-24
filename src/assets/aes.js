const Rijndael = require('rijndael-js');
const padder = require('pkcs7-padding');
const key = '_dhqxlak2010_';
const iv = key;

export const encrypt = str => {
	const plainText = Buffer.from(str, 'utf8');
	const padded = padder.pad(plainText, 16);
	const cipher = new Rijndael(key, 'cbc');
	const encrypted = Buffer.from(cipher.encrypt(padded, 128, iv));
	return encrypted.toString('base64');
};

export const decrypt = str => {
	const byteArr = Buffer.from(str, 'base64');
	const decipher = new Rijndael(key, 'cbc');
	const decryptedPadded = Buffer.from(decipher.decrypt(byteArr, 128, iv));
	const decrypted = padder.unpad(decryptedPadded, 16);
	return decrypted.toString('utf8');
};

//#region rijindael-block.js
// const Rijndael = require('./rijndael');
// const Utils = require('./utils');

// // Available sizes, modes
// const SIZES = [16, 24, 32];
// const MODES = ['ecb', 'cbc'];

// //==============================================================================

// class RijndaelBlock {
// 	constructor(key, mode) {
// 		let keySize = key.length;
// 		let byteArr;
// 		if (!SIZES.includes(keySize)) {
// 			if (keySize === 13) {
// 				//dev_sm
// 				byteArr = Utils.toArray(key);
// 				byteArr.push(0);
// 				byteArr.push(0);
// 				byteArr.push(0);
// 			} else throw new Error(`Unsupported key size: ${keySize * 8} bit`);
// 		}

// 		if (!MODES.includes(mode)) throw new Error(`Unsupported mode: ${mode}`);

// 		this.key = byteArr || Utils.toArray(key); //dev_sm
// 		this.keySize = keySize;
// 		this.mode = mode;
// 	}

// 	encrypt(_plaintext, blockSize, _iv) {
// 		blockSize = parseInt(blockSize);

// 		if (blockSize <= 32 && !SIZES.includes(blockSize))
// 			throw new Error(`Unsupported block size: ${blockSize * 8} bit`);
// 		else if (32 < blockSize) {
// 			blockSize /= 8;

// 			if (!SIZES.includes(blockSize))
// 				throw new Error(`Unsupported block size: ${blockSize} bit`);
// 		}

// 		if (this.mode === 'cbc') {
// 			if (!_iv) throw new Error(`IV is required for mode ${this.mode}`);

// 			if (_iv.length !== blockSize) {
// 				if (_iv.length !== 13)
// 					//dev_sm
// 					throw new Error(
// 						`IV size should match with block size (${blockSize * 8} bit)`
// 					);
// 			}
// 		}

// 		const plaintext = Utils.toArray(_plaintext);
// 		let padLength = plaintext.length % blockSize;

// 		if (padLength !== 0) padLength = blockSize - padLength;
// 		while (padLength-- > 0) plaintext.push(0);

// 		const blockCount = plaintext.length / blockSize;
// 		const ciphertext = new Array(plaintext.length);

// 		const cipher = new Rijndael(this.key);

// 		switch (this.mode) {
// 			case 'ecb':
// 				for (let i = 0; i < blockCount; i++) {
// 					const start = i * blockSize;
// 					const end = (i + 1) * blockSize;
// 					const block = plaintext.slice(start, end);

// 					const encrypted = cipher.encrypt(block);

// 					for (let j = 0; j < blockSize; j++)
// 						ciphertext[start + j] = encrypted[j];
// 				}

// 				break;

// 			case 'cbc':
// 				let iv = Utils.toArray(_iv);
// 				if (_iv.length === 13) {
// 					//dev_sm
// 					iv.push(0);
// 					iv.push(0);
// 					iv.push(0);
// 				}

// 				for (let i = 0; i < blockCount; i++) {
// 					const start = i * blockSize;
// 					const end = (i + 1) * blockSize;
// 					const block = plaintext.slice(start, end);

// 					for (let j = 0; j < blockSize; j++) block[j] ^= iv[j];

// 					const encrypted = cipher.encrypt(block);

// 					for (let j = 0; j < blockSize; j++)
// 						ciphertext[start + j] = encrypted[j];

// 					iv = encrypted.slice();
// 				}

// 				break;
// 		}

// 		return ciphertext;
// 	}

// 	decrypt(_ciphertext, blockSize, _iv) {
// 		blockSize = parseInt(blockSize);

// 		if (blockSize <= 32 && !SIZES.includes(blockSize))
// 			throw new Error(`Unsupported block size: ${blockSize * 8} bit`);
// 		else if (32 < blockSize) {
// 			blockSize /= 8;

// 			if (!SIZES.includes(blockSize))
// 				throw new Error(`Unsupported block size: ${blockSize} bit`);
// 		}

// 		if (this.mode === 'cbc') {
// 			if (!_iv) throw new Error(`IV is required for mode ${this.mode}`);

// 			if (_iv.length !== blockSize)
// 				if (_iv.length !== 13)
// 					//dev_sm
// 					throw new Error(
// 						`IV size should match with block size (${blockSize * 8} bit)`
// 					);
// 		}

// 		const ciphertext = Utils.toArray(_ciphertext);
// 		if (ciphertext.length % blockSize !== 0)
// 			throw new Error(
// 				`Ciphertext length should be multiple of ${blockSize *
// 					8} bit, cipherText.length = ${ciphertext.length}`
// 			);

// 		const blockCount = ciphertext.length / blockSize;
// 		const plaintext = new Array(ciphertext.length);

// 		const cipher = new Rijndael(this.key);

// 		switch (this.mode) {
// 			case 'ecb':
// 				for (let i = 0; i < blockCount; i++) {
// 					const start = i * blockSize;
// 					const end = (i + 1) * blockSize;
// 					const block = ciphertext.slice(start, end);

// 					const decrypted = cipher.decrypt(block);

// 					for (let j = 0; j < blockSize; j++)
// 						plaintext[start + j] = decrypted[j];
// 				}

// 				break;

// 			case 'cbc':
// 				let iv = Utils.toArray(_iv);
// 				if (_iv.length === 13) {
// 					//dev_sm
// 					iv.push(0);
// 					iv.push(0);
// 					iv.push(0);
// 				}

// 				for (let i = 0; i < blockCount; i++) {
// 					const start = i * blockSize;
// 					const end = (i + 1) * blockSize;
// 					const block = ciphertext.slice(start, end);

// 					const decrypted = cipher.decrypt(block);

// 					for (let j = 0; j < blockSize; j++)
// 						plaintext[start + j] = decrypted[j] ^ iv[j];

// 					iv = block.slice();
// 				}

// 				break;
// 		}

// 		return plaintext;
// 	}
// }

// module.exports = RijndaelBlock;
//#endregion
