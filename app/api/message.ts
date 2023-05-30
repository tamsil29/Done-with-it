import client from "./client";

const endPoint = "/messages";

const getConversations = () => client.get(endPoint);

const getMessages = (conversationId: string, queryParams?: any) =>
  client.get(`${endPoint}/${conversationId}`, queryParams);

const postMessage = (data: any) => client.post(endPoint, data);

export default { getConversations, getMessages, postMessage };
