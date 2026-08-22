import { MessageModel } from "../../DB/models/message.model.js";
import { UserModel } from "../../DB/models/user.model.js";
import { catchAsync, RoleEnum , StatusEnum } from "../../utils/index.js";
import * as response from "../../utils/response/index.js";

//send Message 

export const sendMessage = catchAsync(async(req,res,next)=>{
    const {content} = req.body
    const {receiverId} = req.params // who will receive message
    const senderId = req.user._id   // who will send message
    const receiver = await UserModel.findById(receiverId)
    
    if(!receiver){
        return response.NotFoundException({message:"User Not Found"})
    }
    
    if(receiver.status === StatusEnum.Blocked){
        return response.BadRequestException({message:"You Can Not Send Message(you are blocked)"})
    }
    
    const message = await MessageModel.create({content,receiverId,senderId})

    return response.successesResponse({res,message:"Message Sent Successfully",data:message})
})
