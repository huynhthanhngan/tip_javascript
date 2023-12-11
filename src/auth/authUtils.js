'use strict'

const JWT = require('jsonwebtoken')

const createKeyTokenPair = async ( payload, publicKey, privateKey ) => {
    try{
        // accessToken
        const accessToken = await JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refesToken = await JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        // 

        JWT.verify( accessToken, publicKey, (err, decode) => {
            if(err){
                console.error(`error verify::`, err)
            } else {
                console.log(`decode verify::`, decode)
            }
        })
        return{ accessToken, refesToken}
    } catch(error) {

    }
}

module.exports = {
    createKeyTokenPair
}