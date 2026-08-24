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

export const patchReport = catchAsync(async (req, res, next) => {
  const reportId = req.params.reportId;
  const { status, actionTaken } = req.body || {};

  const report = await findById({
    model: reportModel,
    id: reportId,
  });

  if (!report) {
    return NotFoundException({ message: "report not found" });
  }

  const messageId = report.messageId;

  const message = await findById({
    model: MessageModel,
    id: messageId,
  });

  if (!message) {
    return NotFoundException({ message: "message not found" });
  }
  const userId = message.senderId;

  const user = await findById({
    model: UserModel,
    id: userId,
  });
  if (!user) {
    return NotFoundException({ message: "user not found" });
  }

  switch (actionTaken) {
    case reportActionEnum.Message_Deleted:
      await findOneAndDelete({
        model: MessageModel,
        filter: { _id: messageId },
      });
      report.actionTaken = reportActionEnum.Message_Deleted;
      report.status = reportStatusEnum.Resolved;
      await report.save();
      return successesResponse({
        res,
        message: "report resolved , message deleted",
        data: report,
      });

    case reportActionEnum.Sender_Banned:
      report.actionTaken = reportActionEnum.Sender_Banned;
      report.status = reportStatusEnum.Resolved;
      await report.save();
      user.status = StatusEnum.Blocked;
      await user.save();
      return successesResponse({
        res,
        message: "report resolved , sender banned",
        data: report,
      });

    default:
      report.status = status || reportStatusEnum.Dismissed;
      await report.save();
      return successesResponse({
        res,
        message: "report Dismissed",
        data: report,
      });
  }
});
