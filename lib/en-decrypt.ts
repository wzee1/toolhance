import {
  createCipheriv, createDecipheriv,
  randomBytes, scryptSync
} from "crypto"

const algorithm = "aes-256-cbc"
const iv = randomBytes(16);  // Initialization vector
const key = scryptSync(
  process.env.ENCRYPTION_SECRET!, "salt", 32)  // 256-bit key

export async function encrypt(text: string) {
  const cipher = createCipheriv(algorithm, key, iv)

  const encrypted = Buffer.concat(
    [cipher.update(text), cipher.final()]
  )

  return iv.toString("hex") + ":" + encrypted.toString("hex")
}

export async function decrypt(text: string) {
  const textParts = text.split(":")
  const iv = Buffer.from(textParts.shift()!, "hex")
  const encryptedText = Buffer.from(textParts.join(":"), "hex")
  const decipher = createDecipheriv(algorithm, key, iv)

  const decrypted = Buffer.concat(
    [decipher.update(encryptedText), decipher.final()]
  )

  return decrypted.toString()
}
