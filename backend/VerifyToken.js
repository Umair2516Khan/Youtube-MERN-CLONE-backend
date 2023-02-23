import jwt from "jsonwebtoken";

export const verify=(req,res,next)=>{
    const token=req.cookies.accessToken;
    if(!token){
        res.status(404).send("USER NEEDS TO BE SIGNED IN TO PERFROM THIS OPERATION");
    }
    else{
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            res.status(404).send("user authentication failed!!");
        }
        else{
            req.user=user;
            // res.status(200).send("user authentication successful!!");
            next();
        }
    })
}
}