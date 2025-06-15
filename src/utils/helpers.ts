export function wordFormatter(input: string, convertUpperCase = true, separator = "_"): string {
  let words = input.split(separator);

  if (convertUpperCase) {
    words = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
  }

  return words.join(" ");
}

export function getToken() {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];
}
