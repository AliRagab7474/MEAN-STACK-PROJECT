import { UnauthorizedException } from "../utils/index.js";

export const authorization = (userRole)=>(req,res,next)=>{
    const {role} = req.user;
    if(userRole.includes(role))
    {
        return next()
    }
    else{
        return UnauthorizedException({message:"You don't have permission to access this feature"})
    }
}
