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

  return client.post<ImageResponse>(endPoint, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

const getImage = (imageObject: ImageModel)=> {
  return imageObject?.baseUrl + imageObject?.key
}

export default {
  uploadImage,
  getImage
};


class ImageResponse { 
  message: string;
  success: boolean;
  data: ImageModel;
  constructor(data: any) {
    this.message = data?.message || '';
    this.success = data.success || false;
    this.data = new ImageModel(data.data || {});
  }
}
export class ImageModel{
    name: string;
    baseUrl: string;
    key: string;
    mimeType: string;
    _id: string;
    __v: number;

    constructor(data: any){
      this.name = data.name || '';
      this.baseUrl = data.baseUrl || '';
      this.key = data.key || '';
      this.mimeType = data.mimeType || '';
      this._id = data._id || '';
      this.__v = data.__v || 0;
    }
}