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
    
    await MessageModel.create({
        content,
        receiverId,
        senderId
    });

    return response.successesResponse({res,message: "Message Sent Successfully",
        data: {
            receiver: `${receiver.FirstName} ${receiver.LastName}`,
            content
        }
    });
})

//get user index

export const getMessageReceived = catchAsync(async(req,res,next)=>{
    const receiverId = req.user._id
    const messages = await MessageModel.find({receiverId}).select("-senderId").sort({createdAt: -1})

    if(messages.length === 0){
        return response.NotFoundException({message:"The Index Is Empty"})
    }
    return response.successesResponse({res,message:"Your Received Messages Is ..",data:messages})
})

//get user sended messages

export const getMessageSended = catchAsync(async(req,res,next)=>{
    const senderId = req.user._id
    const messages = await MessageModel.find({senderId}).populate("receiverId","FirstName LastName ").sort({createdAt: -1})

    if(messages.length === 0){
        return response.NotFoundException({message:"You Didn't Send Any Message"})
    }
    return response.successesResponse({res,message:"Your SendedMessages Is ..",data:messages})
})
