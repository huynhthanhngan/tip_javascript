'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler= require('../helpers/asyncHandle')
const { AuthFailureError } = require('../core/error.response')

const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID : 'x-client-id',
    AUTHORIZATION : 'athorization',
    REFRESHTOKEN : 'refreshToken',
}

const createKeyTokenPair = async ( payload, publicKey, privateKey ) => {
    try{
        // accessToken
        const accessToken = await JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refeshToken = await JWT.sign( payload, privateKey, {
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
        return{ accessToken, refeshToken}
    } catch(error) {

    }
}

const authentication = asyncHandler( async ( req, res, next) => {
    /* 1 - check userid misssing ?         2 - get accessToken        3 - verify token        4 - check user in bds?        5 - check keyStore with this userId        6 - OK all => return next()*/
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid Request')

    //2
    const keyStore = await findByUserId (userId)
    if(!keyStore) throw new NotFoundError('Not found keyStore')

    //verify token
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')

    try {
        const decodeUser = JWT.verify (accessToken, keyStore.publicKey)
        if( userId !== decodeUser.userId) throw new AuthFailureError ( 'Invalid Auth')
        req.keyStore = keyStore
        return (next)
    } catch (error) {
        
    }
})

const authenticationV2 = asyncHandler( async ( req, res, next) => {
    /* 1 - check userid misssing ?         2 - get accessToken        3 - verify token        4 - check user in bds?        5 - check keyStore with this userId        6 - OK all => return next()*/
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid Request')

    //2
    const keyStore = await findByUserId (userId)
    if(!keyStore) throw new NotFoundError('Not found keyStore')

    //verify token
    if(req.headers[HEADER.REFESHTOKEN]) {
        try {
            const refeshToken = await require.headers[HEADER.REFRESHTOKEN]
            const decodeUser = JWT.verify(refeshToken, keyStore.privateKey)
            if(userId !== decodeUser.userId) throw new AuthFailureError ('Invalid Userid')
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refeshToken
        } catch (error) {
            throw error
        }
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')

    try {
        const decodeUser = JWT.verify (accessToken, keyStore.publicKey)
        if( userId !== decodeUser.userId) throw new AuthFailureError ( 'Invalid Auth')
        req.keyStore = keyStore
        return (next)
    } catch (error) {
        
    }
})

const verifyJWT = async ( token, keySecret) => {
    return await JWT.verify(token, keySecret)
}
module.exports = {
    createKeyTokenPair, authentication, verifyJWT
}