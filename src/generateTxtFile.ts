import fileDownload from "js-file-download";
import { IQuestions } from "./interfaces";

export function generateTxtFile(
  teamBlue: string[],
  teamRed: string[],
  questions: IQuestions[]
) {
  let fileContent = "";

  fileContent += "Blaues Team:\n";
  teamBlue.forEach((student) => (fileContent += student + "\n"));

  fileContent += "\n";

  fileContent += "Rotes Team:\n";
  teamRed.forEach((student) => (fileContent += student + "\n"));

  fileContent += "\n";

  questions.forEach((question) => {
    fileContent += "Frage:\n";
    fileContent += question.q + "\n";
    fileContent += "Antwort:\n";
    fileContent += question.a + "\n\n";
  });

  fileDownload(fileContent, "filename.txt");
}
