const jwt = require("jsonwebtoken")

const checkToken = (req,res,next)=>{
    try {
    let auth = req.header("Authorization") || req.header("x-access-token")
    if(!auth || !auth.startsWith('Bearer ')){
        res.status(413).json({"message":"Invalid Token"})
    }else{
        const token = req.header("Authorization").split(" ")[1] || req.header("x-access-token").split(" ")[1] 
        if(!token){
            res.status(413).json({"message":"Access Denied"})
        }else{
            const decodedData = jwt.verify(token , process.env.JWT_SECRET_KEY);
            console.log(decodedData);
            req.userId = decodedData.userId
            req.role = decodedData.role;
            next()
        }
    }
    
    } catch (error) {
       console.log(error);
       throw error; 
    }
    

}

module.exports = checkToken