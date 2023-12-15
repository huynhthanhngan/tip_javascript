'use strict';

const AccessService = require("../services/access.service");

const { OK, CREATED, SuccessResponse } = require('../core/success.response')

class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    // new SuccessResponse({
    //   message: 'get token successfully',
    //   metadata: await AccessService.handleRefreshToken( req.body.refreshToken)
    // }).send(res);

    //fixed v2
    new SuccessResponse({
       message: 'get token successfully',
       metadata: await AccessService.handleRefreshTokenV2( {
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore
       })
     }).send(res);
  }

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login( req.body)
    }).send(res);
  }

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout successful',
      metadata: await AccessService.logout( req.keyStore)
    }).send(res);
  }

  signUp = async ( req, res, next) => {
    // try {
    //   console.log(`(P):: signUp::`, req.body)
    new CREATED({
      message: 'Regiserted OK!',
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10
      }
    }).send(res)
      // return res.status(201).json(await AccessService.signUp(req.body))
    // } catch (error) {
    //   next(error)
    // }
  }
}

module.exports = new AccessController()