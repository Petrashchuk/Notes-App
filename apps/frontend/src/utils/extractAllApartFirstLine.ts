export const extractSecondLine = (str?: string) => {
  const secondLine = str?.split('</p>')?.[1];
  if(secondLine) return secondLine + '</p>';
}
