const express = require("express");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const frSendMail = async (req, res) => {
    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        secureConnection: false,
        auth: {
            user: 'rizviadnan72@gmail.com',
            pass: 'fnvq dgpe qmfv lsdw'
        }
    });
    // Generate confirmation code
    function generateConfirmationCode() {
        return crypto.randomBytes(10).toString('hex');
    }

    // Database to store confirmation codes
    const confirmations = {};

    // Route to send confirmation email
    
        const { email } = req.body;
        console.log(email);

        const confirmationCode = generateConfirmationCode();
        confirmations[email] = confirmationCode;

        let mailDetails = {
            from: 'rizviadnan72@gmail.com',
            to: email,
            subject: 'Email-Verificaion',
            html:  `<a href="http://localhost:8080/reset/username-password/${confirmationCode}">Reset-Password/username</a>`
        }
        transporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully');
            }
        });
        return confirmationCode;
}
module.exports = frSendMail;