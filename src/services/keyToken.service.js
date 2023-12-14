'use strict'

// const { token } = require("morgan")
const keytokenModel = require("../models/keytoken.model")

class KeyTokenService{

    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try{
            //level 0
            // const publicKeyString = publicKey.toString()
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString
            // })

            // return token ? tokens.publicKey : null

            //level xx
            const fitler = { user: userId}, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true }

            const tokens = await keytokenModel.findOneAndUpdate(fitler, options, update)

            return tokens ? tokens.publicKey : null
        } catch (error){
            return error
        }
    }
}

module.exports = KeyTokenService