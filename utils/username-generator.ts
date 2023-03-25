export default function generateUsernameFromEmail(email: string) {
  // Remove everything after the @ symbol.
  const username = email.split("@")[0];

  // Remove any non-alphanumeric characters and convert to lowercase.
  const cleanUsername = username.replace(/[^a-z0-9]/gi, "").toLowerCase();

  // Add a random number between 1000 and 9999 to the end of the username to make it unique.
  const uniqueUsername = `${cleanUsername}${
    Math.floor(Math.random() * 9000) + 1000
  }`;

  return uniqueUsername;
}
