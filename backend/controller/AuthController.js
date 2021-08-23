'use strict'

const UserModel = require('./../Model/User')
const validate = require('./../Utils/Validation')
const constant = require('./../Constant/index')
const jwt = require('jsonwebtoken')
const mailer = require('./../service/emailservice')
const responseService = require('./../service/responseService')
const bcrypt = require('bcryptjs');

module.exports = {
    register: function (req, res) {
        return new Promise((resolve, reject) => {
            const email = req.body.email ? req.body.email : '';
            if (email && validate.emailIsValid(req.body.email)) {
                if (req.body.password != null && req.body.password != undefined) {
                    let passwordhash = bcrypt.hashSync(req.body.password, 10)
                    UserModel.create({ email: email, password: passwordhash, Verifytoken: Math.random().toString(36).replace('0.', ''), managerName: req.body.managerName }, function (err, users) {
                        if (err) {
                            res.status(404)
                            const response = responseService.error({msg: 'this email already used'})
                            resolve(response);
                        } else if (users == null || users == undefined) {
                            res.status(401)
                            const response = responseService.error({msg: 'user not register'})
                            resolve(response)
                        } else {
                            let token = jwt.sign({ email: users.email, _id: users._id, restaurantId: users.restaurantId }, 'secret', { expiresIn: '24h' }, constant.secret);
                            res.status(201)
                            const response = responseService.success({msg: 'registration successfully', payload: users, tokendata: token})
                            resolve(response);
                        }
                    })
                } else {
                    const response = responseService.error({msg: 'Please Enter Valid Password'})
                    resolve(response)
                }
                
            } else {
                const response = responseService.error({msg: 'Please Enter Valid Password'})
                resolve(response);
            }
        })

    },
    login: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body.email != null && req.body.email != undefined && validate.emailIsValid(req.body.email)) {
                UserModel.findOne({ email: req.body.email }, function (err, users) {
                    if (err) {
                        const response = responseService.error({msg: err})
                        resolve(response)
                    } else if (users == null || users == undefined) {
                        const response = responseService.error({msg: 'user not register'})
                        resolve(response)
                    } else {
                        if (bcrypt.compareSync(req.body.password, users.password)) {
                            if (users.isverified == true) {
                                users.password = null
                                let token = jwt.sign({ email: req.body.email, _id: users._id, restaurantId: users.restaurantId }, 'secret', { expiresIn: '24h' }, constant.secret);
                                res.status(200)
                                const response = responseService.success({msg: 'login successfully', payload: users, tokendata: token});
                                resolve(response);
                            } else {
                                const response = responseService.error({msg: 'Please  confirm   Email'})
                                res.status(401)
                                resolve(response);
                            }
                        } else {
                            res.status(401)
                            const response = responseService.error({msg: 'Please Enter correct Password'})
                            resolve(response);
                        }
                    }
                })
            }
        })

    },
    update: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body.email != null && req.body.email != undefined && validate.emailIsValid(req.body.email)) {
                UserModel.findOne({ email: req.body.email }, function (err, users) {
                    if (err) {
                        resolve(err)
                    } else if (users == null || users == undefined) {
                        res.status(401)
                        resolve('user not register')
                    }
                    else {
                        if (bcrypt.compareSync(req.body.password, users.password)) {
                            if (req.body.phone != null && req.body.phone != undefined) {
                                if (validate.PhonenumberValidate(req.body.phone)) {
                                    res.status(200)
                                    users.phone = req.body.phone
                                } else {
                                    res.status(401)
                                    resolve('Please Enter Currect Phone No.')
                                }
                            }

                            if (req.body.firstname != null && req.body.firstname != undefined) {
                                users.firstname = req.body.firstname
                            }
                            if (req.body.lastname != null && req.body.lastname != undefined) {
                                users.lastname = req.body.lastname
                            }
                            users.save().then(data => {
                                data.password = null
                                let updateresponce = {
                                    email: users.email,
                                    firstname: users.firstname,
                                    lastname: users.lastname,
                                    phone: users.phone
                                }
                                res.status(200)
                                resolve(updateresponce)
                            })
                        } else {
                            res.status(401)
                            resolve('Please Enter Correct Password')
                        }
                    }
                })
            }
        })
    },
    updateCompanyName: function (req, res) {
        return new Promise((resolve, reject) => {
            const { companyName, id } = req.body;
            if (companyName && id) {
                UserModel.updateOne({ _id: id }, {restaurantName: companyName}, function (err, company) {
                    if (err) {
                        res.status(400)
                        const response = responseService.error({msg: err})
                        resolve(response);
                    } else {
                        res.status(200)
                        const response = responseService.success({msg: 'company Name updated', payload: company})
                        resolve(response);
                    }
                })
            } else {
                res.status(401)
                const response = responseService.error({msg: 'Please enter company name'})
                resolve(response);
            }
        })
    },
}

