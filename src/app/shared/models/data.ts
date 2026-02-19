export interface signUpData extends logInData {
  name: string;
  rePassword: string;
  phone: string;
}

export interface logInData extends forgetPasswordData {
  password: string;
}

export interface forgetPasswordData {
  email: string;
}

export interface resetCodeData {
  resetCode: string;
}

export interface resetNewPasswordData extends forgetPasswordData {
  newPassword: string;
}

// 
export interface x {
[key: string]: string;
}
