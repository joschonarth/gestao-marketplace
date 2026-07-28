export interface IRegisterSuccessResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
