declare namespace Express {
  export interface Request {
    funcionario: {
      id: string;
    };
    dependentes: {
      id: string;
    }
  }
}
