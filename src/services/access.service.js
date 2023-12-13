'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const { createKeyTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailureError} = require("../core/error.response")
const { findByEmail } = require("./shop.service")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService{
    /*
        1 - check email address in dbs
        2 - match password 
        3 - create AT vs RT and save
        4 - generate tokens
        5 - get data return login
    */

    static login = async( {email, password, refreshToken = null} ) => {

        //1
        const foundShop = await findByEmail({ email})
        if(!foundShop) throw new BadRequestError('Shop not registered')

        //2
        const match = bcrypt.compare(password, foundShop.password)
        if(!match) throw new AuthFailureError('Authentication failed')

        //3
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        //4 generate tokens
        const tokens = await createKeyTokenPair({userId: shop._id, email}, publicKeyString, privateKey)
        return{
            code: 201,
            metadata: {
                shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop}), 
                tokens
            }
        }  
    }
    static signUp = async ({name, email, password}) => {
        try{
            // step1: check email exists ?

            const holeShop = await shopModel.findOne({email}).lean()
            if(holeShop){
                // return{
                //     code: 'xxxx',
                //     message: 'Shop already register!'                    
                // }
                throw new BadRequestError('Error: Shop already registered!')
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password, passwordHash, roles: [RoleShop.SHOP]
            })

            if (newShop){
                // created privateKey, publicKey 
                const{ privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4896,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })
                // Public key CryptoGraphy Standards 

                console.log({privateKey, publicKey}) // save collection KeyStore 

                const publicKeyString = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })

                if (!publicKeyString){
                    return{
                        code: 'xxxx',
                        message: 'publicKeyString error'
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString)
                // create token pair
                const tokens = await createKeyTokenPair({userId: newShop._id, email}, publicKeyString, privateKey)
                console.log(`Created Token Success::`, tokens)

                return{
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop}), 
                        tokens
                    }
                }
                //const tokens = await 
            }

            return{
                code: 201,
                metadata: null
            }
        }catch(error){
            return{
                code: 'xxxx',
                message: error.message,
                status: 'error'
            }
        }
    }
    
}

module.exports = AccessService