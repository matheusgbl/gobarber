declare namespace Express {
  export interface Request {
    user: {
      id: string;
      isBarber: boolean;
      name: string;
    };
  }
}
