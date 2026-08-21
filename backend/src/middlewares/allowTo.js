import * as response from "../../utils/response/errors.response.js"

export const allowTo = (...userRole)=>(req,res,next)=>{
    const {role} = req.user;
    if(userRole.includes(rule))
    {
        return next()
    }
    else{
        return response.ErrorResponse({message:"You don't have permission to access this feature"})
    }
}
