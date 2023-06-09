import { IQuestions, IConfig, IStudentTeam } from "./interfaces";
import { dataIndex } from "./constStrings";

export function locallySaveEditorData(
  teamBlue: IStudentTeam,
  teamRed: IStudentTeam,
  questions: IQuestions[]
) {
  locallySaveData(mergeData(teamBlue, teamRed, questions));
}

export function mergeData(
  teamBlue: IStudentTeam,
  teamRed: IStudentTeam,
  questions: IQuestions[]
): IConfig {
  return { students: { red: teamRed, blue: teamBlue }, questions };
}

export function locallySaveData(config: IConfig): void {
  console.debug("config");
  console.debug(config);
  localStorage.setItem(dataIndex, JSON.stringify(config, null, 2));
}

export function locallyLoadData(): IConfig | undefined {
  const dataString = localStorage.getItem(dataIndex);
  if (dataString) {
    try {
      return JSON.parse(dataString) as IConfig;
    } catch {
      console.error("Data loaded from localStorage could not be serialized.");
    }
  }
  return;
}
