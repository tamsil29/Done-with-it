import client from "./client";

const endPoint = "/files";

const uploadImage = (uri: any) => {
  const fileName = uri.split("/").pop();
  const type = fileName?.split(".").pop();
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: fileName,
    type: `image/${type}`,
  } as any);

  return client.post(endPoint, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export default {
  uploadImage,
};
