export interface IQuestions {
  q: string;
  a: string;
}

export type IStudentTeam = string[];

export interface IConfig {
  students: {
    red: IStudentTeam;
    blue: IStudentTeam;
  };
  questions: IQuestions[];
}

export type toggleDirections = "fromRedToBlue" | "fromBlueToRed";
