'use strict'

const { token } = require("morgan")
const keytokenModel = require("../models/keytoken.model")

class keyTokenService{

    static createKeyToken = async ({ user, publicKey }) => {
        try{
            const publicKeyString = publicKey.toString()
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })

            return token ? tokens.publicKey : null
        } catch (error){
            return error
        }
    }
}

module.exports = keyTokenService