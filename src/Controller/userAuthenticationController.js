const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../util/sendEmail')
const { validationResult } = require('express-validator');

// 
var multer = require('multer');
const ErrorResponse = require('../util/errorResponse');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '../../../../public/uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, 'profile-' + Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage });

//

const login = async (req, res, next) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        res.status(422).send(errors)
    }
    const { email, password } = req.body;
    if (email && password) {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(422).send({message: "Email dose't exist"})
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                res.status(422).send({message: "Password dose't match"})
            } else if (
                user.disabled
            ) {
                res.status(401).send("you can not login because your account is disabled contact to admin")

            } else {
                const token = jwt.sign({ _id: user._id }, "myusersecretkey")
                user.tokens = user.tokens.concat({ token })
                await user.save()
                res.status(200).send({ user: user, token })
            }
        }

    } else {
        res.status(422).send("fields are required")
    }
}
const register = async (req, res, next) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        console.log(errors)
        return res.status(422).send(errors)
    }
    const { full_Name, email, password, } = req.body;
    if (full_Name && email && password) {
        const hashed = await bcrypt.hash(password, 10)
        const newUser = new User({
            full_Name,
            email,
            password: hashed
        })
        newUser.save().then(user => {
            res.status(200).send(user)

        }).catch(error => {
            if (error.code == 11000) {
                res.status(422).send({message: "email already exist"})
            } else {
                console.log(error)
                res.status(400).send(error)

            }
        })

    } else {
        res.status(422).send("fields are required")
    }
}
const logout = (req, res, next) => {
    console.log("req token", req)
    User.findByIdAndUpdate(
        req.user._id,
        { $pull: { tokens: { token: req.token } } },
    ).then(data => {
        console.log("data", data)
        res.send("loged out")
    }).catch(err => {
        console.log("err", err)
        res.send(err)
    })
}
const authenticate = (req, res, next) => {
    User.findById(req.user._id, { full_Name: 1, email: 1, phone_Number: 1, street: 1, city: 1, state: 1, state: 1, profile_image: 1, country: 1, zip: 1, })
        .then(data => {
            res.send({ user: data })
        }).catch(err => {
            console.log("err", err)
            res.send(err)
        })
}
const verifyOTP = async (req, res, next) => {
    const otp = req.body.otp;
    const email = req.body.email;
    if (otp != 1111) {
        const user = await User.findOne({ otp, email });
        if (!user)
            return res.status(401).send("otp does not match");
        res.status(200).send("password reset link sent to your email account");
    } else {
        return res.status(401).send("otp does not match");

    }
}
const forgot = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("email doesn't exist");
    user.otp = Math.floor(1000 + Math.random() * 9000)
    await sendEmail(user.email, "reset password for dukan app", `you can use the code below to reset your dukan app password ${user.otp}`);
    await user.save()
    res.send("password reset link sent to your email account");
}
const reset = async (req, res, next) => {
    const otp = req.body.otp;
    const email = req.body.email;
    const password = req.body.password;
    if (otp != 1111) {
        const user = await User.findOne({ otp, email });
        if (!user)
            return res.status(401).send("otp does not match");
        const hashed = await bcrypt.hash(password, 10)
        user.password = hashed
        user.otp = 1111;
        await user.save();
        res.status(200).send("password changed")
    } else {
        return res.status(401).send("otp does not match");

    }
}
const profile = async (req, res, next) => {
    const { full_Name, email, phone_Number, zip, city, state, street, country } = req.body;
    console.log(
        "this.is.from.client>>>>>>",
        full_Name, email, phone_Number, zip, city, state, street, country
    )
    // console.log("req.body>>>>>>>>", req.body)
    console.log("req.body>>>>>>>>", req.file)

    User.findByIdAndUpdate(req.user._id, {
        full_Name,
        email,
        phone_Number,
        street,
        city,
        state,
        country,
        zip,
        profile_image: req.file.filename
    },
        function (err, docs) {
            if (err) {
                console.log(err)
                res.state(500).send({ error: err, })
            }
            else {
                console.log("Updated User : ", docs);
                res.status(200).send({ data: docs })
            }
        });

}
module.exports = { login, register, forgot, reset, logout, authenticate, verifyOTP, profile, upload }