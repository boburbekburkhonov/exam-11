namespace Express {
	export interface Request {
    filtered: {
      name: string;
      password: string;
      phone: string;
      email: string;
    };
    userId: string;
  }
}
