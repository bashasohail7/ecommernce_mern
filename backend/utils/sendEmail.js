const nodeMailer=require('nodemailer')

const sendEmail=async(options)=>{
const transporter=nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false, // use SSL
    auth: {
        user:"shlbsh000@gmail.com",
            pass:"!123Nadiridinna"
    },
    service:"gmail",
    
})
const mailOptions={
    from:process.env.SMPT_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message

}
await transporter.sendMail(mailOptions)
}
module.exports=sendEmail


// const nodemailer = require("nodemailer");
// const sendEmail = async (options) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       sendMail: true,
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user:process.env.SMPT_MAIL,
//         pass:process.env.SMPT_PASSWORD
//       },
//     });

//     transporter.verify(function (error, success) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Server is ready to take our messages");
//       }
//     });

//     // const linkUrl = `${urlName}/resetpassword/token=${token}`;

//     const mailOptions = {
//         from:process.env.SMPT_MAIL,
//             to:options.email,
//             subject:options.subject,
//             html:options.message
//     //   html: `<a href=${linkUrl} >reset password Click Here</a> `,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Mail has been sent", info.response);
//       }
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// };
// module.exports = sendEmail;
