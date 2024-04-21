import { body, validationResult, check, param, query } from "express-validator";

export const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // console.log(errors.array());
  return res.status(400).json({ errors: errors.array() });
};

export const registerValidators = () => [
  body(["username", "password", "name", "bio"])
    .notEmpty()
    .withMessage("All fields and profile pic is required "),
  body("avatar", "Please upload a profile pic").notEmpty(),
];

export const loginValidators = () => [
  body(["username", "password"])
    .notEmpty()
    .withMessage("All fields are required "),
];

export const groupChatValidators = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members", "Please Enter Members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be between 2 and 100"),
];

export const addMemberValidators = () => [
  body("members", "Please Enter Members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 1, max: 100 })
    .withMessage("Members must be between 1 and 100"),
  body("chatId", "Please Enter ChatId").notEmpty(),
];

export const removeMemberValidators = () => [
  body("userId", "Please Enter UserId").notEmpty(),
  body("chatId", "Please Enter ChatId").notEmpty(),
];

export const leaveGroupValidators = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];

export const sendAttachmentValidators = () => [
  body("chatId", "Please Enter ChatId").notEmpty(),
  check("files", "Please Upload Avatar").notEmpty().isArray({ min: 1, max: 5 }),
];

export const getMessageValidators = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];

export const getChatDetailsValidators = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];

export const deleteChatDetailsValidators = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];

export const renameGroupValidators = () => [
  param("id", "Please Enter ChatId").notEmpty(),
  body("name", "Please Enter Name").notEmpty(),
];
