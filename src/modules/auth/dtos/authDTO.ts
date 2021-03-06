export interface authDTO {
  email: string;
  password: string;
}

export interface createAccountDTO extends authDTO {
  verifyToken: string;
}
