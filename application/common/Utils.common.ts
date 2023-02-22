import crypto from 'crypto'

import { keyEncript } from '../../../../keys'

/**
 * SA text string is encrypted
 * @param {string} data Data to encrypt
 * @returns
 */
export async function encryptFunction(data: crypto.BinaryLike) {
    // The md5 hash is created using the key
    const passwordHash = crypto.createHash('md5').update(keyEncript, 'utf-8').digest('hex').toUpperCase()

    // Generating the initialization vector
    // eslint-disable-next-line new-cap
    const initVector = Buffer.alloc(16)

    // Encrypting the data
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(passwordHash), initVector)
    let encrypted = cipher.update(data)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
}

/**
 * Decrypt a text string
 * @param {string} data Data to decrypt
 * @returns
 */
export async function decryptFunction(data: string) {
    // The md5 hash is created using the key
    const passwordHash = crypto.createHash('md5').update(keyEncript, 'utf-8').digest('hex').toUpperCase()

    // Generating the initialization vector
    // eslint-disable-next-line new-cap
    const initVector = Buffer.alloc(16)

    // Data is decrypted
    const encryptedText = Buffer.from(data, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(passwordHash), initVector)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
