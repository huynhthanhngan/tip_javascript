'use strict';

const AccessService = require("../services/access.service");

const { OK, CREATED, SuccessResponse } = require('../core/success.response')

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login( req.body)
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