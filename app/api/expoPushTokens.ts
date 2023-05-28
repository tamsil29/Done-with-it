import client from "./client";

const registerToken = (pushToken: string) =>
  client.post("/users/expoPushTokens", { token: pushToken });

export default { registerToken };
