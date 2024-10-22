import Joi from "joi";
import { VALIDATE_PHONE_REGEX_RULE } from "utils/constants";

export const passwordService = Joi.object({
    currentPassword: Joi.string().trim().required().min(6).label('Mật khẩu hiện tại'),
    password: Joi.string().trim().required().min(6).label('Mật khẩu mới'),
    confirmPassword: Joi.string().trim().required().label('Xác nhận mật khẩu mới')
    .custom((value, helpers) => {
      if (value !== helpers.state.ancestors[0].password) {
        return helpers.message('Mật khẩu không trùng khớp');
      }
      return value;
    }),
});

export const profileService = Joi.object({
    name: Joi.string().trim().required().label('Tên tài khoản'),
    phone: Joi.string().trim().allow('', null).pattern(VALIDATE_PHONE_REGEX_RULE).label('Số điện thoại'),
    
});
