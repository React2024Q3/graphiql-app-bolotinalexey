export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = SignInFormData & {
  name: string;
  confirmPassword: string;
};
