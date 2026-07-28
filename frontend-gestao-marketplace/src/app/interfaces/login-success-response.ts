export interface ILoginSuccessResponse {
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}
