export interface IQuestions {
  q: string;
  a: string;
}

export interface IConfig {
  students: {
    red: string[];
    blue: string[];
  };
  questions: IQuestions[];
}

export type toggleDirections = "fromRedToBlue" | "fromBlueToRed";
