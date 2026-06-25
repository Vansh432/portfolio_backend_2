import nodemailer from 'nodemailer'
import { configDotenv } from 'dotenv';

configDotenv()
// console.log(process.env.EMAIL)
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

async function sendMail({email,to,subject,html}){
    try{
    const info=await transporter.sendMail({
        from:email,
        to,
        subject,
        html
    })
    console.log("Email send successfull: ",info?.messageId)
    }catch(err){
        console.log("Sending mail show the error: ",err);
    }
}

export const sendEnquiryMail=async(data)=>{
    try{ 
 
        const html=`
            <h1>Enquiry details</h1>
            <hr/>
            <h3><b>Name:  </b> ${data.fullName}</h3>
            <h3><b>phone: </b> ${data.phone}</h3>
            <h3><b>email: </b> ${data.email}</h3>
            <h3><b>websiteURL:  </b> ${data.websiteURL || "NA"}</h3>
            <h3><b>Industry:  </b> ${data.industry}</h3>
            <h3><b>Message:  </b> <p>${data.message}</p></h3>
        `
    await  sendMail({
        from:process.env.EMAIL,
        to:process.env.EMAIL,
        subject:"Enquiry details",
        html
      })
      return true
    }catch(err){
        console.log(err)
        throw new Error("Mail failed")

    }
}