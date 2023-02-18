import Users from "../models/users.model";

export const isCorrectLength = (
  string: string,
  count: number,
  type: string
): boolean => {
  switch (type) {
    case "max":
      return string.length <= count;
    case "min":
      return string.length >= count;
    default:
      return false;
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /[`0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return passwordRegex.test(password);
};

export const checkEmail = async (email: string): Promise<Boolean> => {
  const hasEmail = await Users.findOne({ email: email });
  if (!hasEmail) return true;
  return false;
};

export const checkUsername = async (username: string): Promise<Boolean> => {
  const hasUsername = await Users.findOne({ userName: username });
  if (!hasUsername) return true;
  return false;
};
