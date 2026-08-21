import { successesResponse } from "../../utils/index.js"

export const profile =async (req,res,next)=>{
    return successesResponse({res,data:req.user})
}