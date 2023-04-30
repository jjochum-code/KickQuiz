export function parseConfigPlayers(input: string): {
  blueTeam: string[];
  redTeam: string[];
} {
  const blueTeamRegex =
    /bl+a+u+e+s+ +t+e+a+m+:(?<bt>[\s\S]*?)(?=ro+t+e+s+ +t+e+a+m+:|$)/i;
  const redTeamRegex =
    /ro+t+e+s+ +t+e+a+m+:(?<rt>[\s\S]*?)(?=bl+a+u+e+s+ +t+e+a+m+:|$)/i;

  const blueTeamMatch = input.match(blueTeamRegex);
  const redTeamMatch = input.match(redTeamRegex);

  const blueTeam =
    blueTeamMatch?.groups?.bt
      .trim()
      .split("\n")
      .filter((name) => name.trim() !== "") || [];
  const redTeam =
    redTeamMatch?.groups?.rt
      .trim()
      .split("\n")
      .filter((name) => name.trim() !== "") || [];

  return { blueTeam, redTeam };
}
