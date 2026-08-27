import crypto from 'node:crypto'
import { ENC_IV_LENGTH, ENC_KEY } from "../../config/config.service.js"

export const Encrypt = async(plainText)=>{
    const iv = Buffer.from(crypto.randomBytes(ENC_IV_LENGTH))
    const cipherIv = crypto.createCipheriv('aes-256-cbc',ENC_KEY,iv) 
    let cipherText = cipherIv.update(plainText,"utf-8",'hex')
    cipherText += cipherIv.final('hex')
    return `${iv.toString('hex')}:${cipherText}`
}

export const Decrypt = async(cipherText)=>{
    const [iv,cipherData] = cipherText.split(":")
    const ivLikeBinary = Buffer.from(iv,'hex')
    let decipherIv = crypto.createDecipheriv("aes-256-cbc",ENC_KEY,ivLikeBinary)
    let plainText = decipherIv.update(cipherData,'hex','utf-8')
    plainText += decipherIv.final('utf-8')
    return plainText
}