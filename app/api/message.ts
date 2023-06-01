import client from "./client";

const endPoint = "/messages";

const getConversations = () => client.get(endPoint);

const getMessages = (conversationId: string, queryParams?: any) =>
  client.get<any>(`${endPoint}/${conversationId}`, queryParams);

const postMessage = (data: any) => client.post<any>(endPoint, data);

const updateSeenMessage = (conversationId: string,) => client.put(`${endPoint}/message-seen/${conversationId}`)

export default { getConversations, getMessages, postMessage, updateSeenMessage };
