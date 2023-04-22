import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IConfig } from "./interfaces";

export function LoadGame({
  selectedFile,
  setSelectedFile
}: {
  selectedFile: any,
  setSelectedFile: Function
}) {

    const navigate = useNavigate();

    return (
          <input type="file" name="file"
          onChange={(event) => FileUploadHandler(setSelectedFile, navigate, event)}
          />
  );
  //console.log(
                  // ParseConfig(
                  //     setLoadedConfig,
                  //     "Frage: Wie viel Euro sind 100 cent? A: Keine Ahnung \nasd\n F: alösdj? A: aölsjdaslökj535 "
                  //     )

  // return (
  //   <button
  //     onclick={ParseConfig(
  //       setLoadedConfig,
  //       "Frage: Wie viel Euro sind 100 cent?\nA: Keine Ahnung\nasd\nF: alösdj?\nA: aölsjdaslökj535 "
  //     )}
  //   >
  //     Bitte wählen Sie eine Spieldatei aus:
  //   </button>
  // );
}

//handle to upload a file
function FileUploadHandler(setSelectedFile: Function, navigate: any, event: any) {
    try{
        setSelectedFile(event!.target.files![0]);
        navigate('/editor')
    } catch(x) {
        alert("Die datei konnte nicht gelesen werden: " + x);
    }
        // let navigate = useNavigate();
        // navigate("/editor");
}

// function ParseConfig(setLoadedConfig: Function, config: string) {
//   // retrieve blocks of Question and answer
//   const regexAllBlocks: RegExp =
//     /((?:fr*a*g*e*:)(?:.+?)(?:\n)*(?:an*t*w*o*r*t*:)(?:.+)(?:\n)*)/gi;
//   // retrieve actual blocks and questions
//   const regexOneBlock: RegExp =
//     /(?:fr*a*g*e*:)(?<q>.*?)(?:\n)*(?:an*t*w*o*r*t*:)(?<a>.*)/i;
//
//   // retrieve every block of answers and questions
//   const allBlocks: string[] | null = config.match(regexAllBlocks);
//   console.log(allBlocks)
//   if (allBlocks != null) {
//     let parsedBlocks: object[] = [];
//     // console.log(allBlocks[0].match(regexOneBlock)!.groups!.question);
//     allBlocks.forEach((item) => {
//       let regexObject = item.match(regexOneBlock)!.groups!;
//       parsedBlocks.push({ q: regexObject.q.trim(), a: regexObject.a.trim() });
//     });
//     setLoadedConfig(parsedBlocks);
//     console.log(parsedBlocks);
//   }
  // } else {
  //   // There was no valid question:
  //   return <div>Mindestend eine Frage muss enthalten sein</div>;
  // }

  // return allBlocks;
// }
