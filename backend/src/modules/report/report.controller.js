import {
  create,
  deleteOne,
  findById,
  findByIdAndUpdate,
  findOne,
  findOneAndDelete,
  MessageModel,
  reportModel,
  updateOne,
  UserModel,
} from "../../DB/index.js";
import {
  BadRequestException,
  catchAsync,
  NotFoundException,
  reportActionEnum,
  reportStatusEnum,
  StatusEnum,
  successesResponse,
  UnauthorizedException,
} from "../../utils/index.js";

export const reportMessage = catchAsync(async (req, res, next) => {
  const messageId = req.params.messageId;
  const { description, reason } = req.body;

  const message = await findById({
    model: MessageModel,
    id: messageId,
  });

  if (!message) {
    return NotFoundException({ message: "message not found" });
  }

  const isReceiver = req.user._id.toString() === message.receiverId.toString();

  if (!isReceiver) {
    return UnauthorizedException({
      message: "you can not report this message",
    });
  }

  const checklist = await findOne({
    model: reportModel,
    filter: { messageId: messageId },
  });

  if (checklist) {
    return BadRequestException({ message: "you have already done report" });
  }

  const report = await create({
    model: reportModel,
    data: {
      messageId: messageId,
      reportedBy: req.user._id,
      description,
      reason,
    },
  });

  return successesResponse({
    res,
    status: 201,
    message: "your report was added successfully",
    data: report,
  });
});

