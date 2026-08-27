import { hash,compare } from 'bcrypt'
import { SALT_ROUND } from '../../config/config.service.js'

export const generateHash = async (plainText , salt=SALT_ROUND)=>{
    const cipherText = await hash(plainText,salt)
    return cipherText
}

export const compareHash = async(plainText,cipherText)=>{
let match = await compare(plainText,cipherText)
return match
}