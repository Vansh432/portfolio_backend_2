import express from 'express'
import { configDotenv } from 'dotenv';
import { sendEnquiryMail } from './infrastructure/mail/mail.services.js';
configDotenv();
const app=express();
app.use(express.json());
const port=process.env.PORT || 8000

app.post("/api/mail",async(req,res)=>{
    try{
    const {email,phone,fullName,websiteURL,industry,message}=req?.body;
 if(!email || !phone || !fullName || !industry)return res.status(400).json({status:false,message:"Fields are missing"})
    await sendEnquiryMail({email,phone,websiteURL,industry,message});
return res.status(200).json({status:true,message:"Mail send successfull"})
    }catch(err){
        return res.status(500).json({status:false,message:"Internal server error",error:err})
    }
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not runing, geting error:  ",err);
        return;
    }
    console.log("Server is runing port: ",port)
})