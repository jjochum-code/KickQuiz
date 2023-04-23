export function chooseFile(event: any, func: Function) {
  try {
    func(event!.target.files![0]);
  } catch (x) {
    alert("Die datei konnte nicht gelesen werden: " + x);
  }
}

export function reloadFile(file: any, func: Function) {
  try {
    file.text().then((x: string) => func(x));
  } catch (log) {
    alert(
      "Ein fehler beim lesen der Datei ist eingetreten. Bitte geben sie das an einen IT-Experten ihres vertrauens: " +
        log
    );
  }
}
