const nodemailer = require('nodemailer') 
const dotenv = require('dotenv');

module.exports = async (email,subject,text)=>{
    console.log(email)
    console.log(subject)
    console.log(text)
    console.log(process.env.USER)
    console.log(process.env.PASS)
    try {
        console.log('88888')
        const transporter =  nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth :{
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        console.log('jdjdjdj')
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log('Email sent successfully')
    } catch (error) {
        console.log('Email not sent => ',error)
    }
}