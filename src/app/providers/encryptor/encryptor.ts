// import * as crypto from "node:crypto";

// import { config, validateEnvVariable } from "../../../core";
// import { EncryptionAlgorithm } from "./encryption.algorithm";
// import { IEncryptor } from "./encryption.interface";

// export class Encryptor implements IEncryptor {
//   private readonly _algorithm: EncryptionAlgorithm =
//     EncryptionAlgorithm.AES_256_CBC;
//   private readonly _key: string = config.app.encryption.key;
//   private readonly _iv: Buffer = crypto.randomBytes(16);

//   decrypt(encryptedText: string, key?: string): string {
//     try {
//       if (!key) {
//         key = this._key;
//       }

//       const textParts = encryptedText.split(":");
//       const iv = Buffer.from(textParts.shift()!, "hex");
//       const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");

//       const decipher = crypto.createDecipheriv(this._algorithm, key, iv);
//       const decryptedText = Buffer.concat([
//         decipher.update(encryptedTextBuffer),
//         decipher.final(),
//       ]);

//       return decryptedText.toString();
//     } catch (err) {
//       return "";
//     }
//   }

//   encrypt(plainText: string, key?: string): string {
//     if (!key) {
//       key = this._key;
//     }

//     const cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv);
//     const encryptedText = Buffer.concat([
//       cipher.update(plainText),
//       cipher.final(),
//     ]);

//     return `${this._iv.toString("hex")}:${encryptedText.toString("hex")}`;
//   }
// }

import * as crypto from "node:crypto";
import { config } from "../../../core";
import { EncryptionAlgorithm } from "./encryption.algorithm";
import { IEncryptor } from "./encryption.interface";

export class Encryptor implements IEncryptor {
  private readonly _algorithm: EncryptionAlgorithm =
    EncryptionAlgorithm.AES_256_CBC;
  private readonly _key: Buffer;
  private readonly _iv: Buffer = crypto.randomBytes(16);

  constructor() {
    const key = config.app.encryption.key;

    if (!key) {
      throw new Error(
        "Encryption key is not defined. Please check your environment variables."
      );
    }

    // Decode the key from hexadecimal to a Buffer
    const decodedKey = Buffer.from(key, "hex");

    if (decodedKey.length !== 32) {
      throw new Error(
        "Encryption key must be a 32-byte buffer. Please check your configuration."
      );
    }

    this._key = decodedKey; // Use the decoded buffer
  }

  decrypt(encryptedText: string, key?: string): string {
    try {
      const decryptionKey = key ? Buffer.from(key, "utf-8") : this._key;

      const textParts = encryptedText.split(":");
      const iv = Buffer.from(textParts.shift()!, "hex");
      const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");

      const decipher = crypto.createDecipheriv(
        this._algorithm,
        decryptionKey,
        iv
      );
      const decryptedText = Buffer.concat([
        decipher.update(encryptedTextBuffer),
        decipher.final(),
      ]);

      return decryptedText.toString();
    } catch (err) {
      console.error("Decryption error:", err);
      return "";
    }
  }

  encrypt(plainText: string, key?: string): string {
    const encryptionKey = key ? Buffer.from(key, "utf-8") : this._key;

    const cipher = crypto.createCipheriv(
      this._algorithm,
      encryptionKey,
      this._iv
    );
    const encryptedText = Buffer.concat([
      cipher.update(plainText),
      cipher.final(),
    ]);

    return `${this._iv.toString("hex")}:${encryptedText.toString("hex")}`;
  }
}
