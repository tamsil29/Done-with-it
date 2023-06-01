import client from "./client";

const endPoint = "/listings";

const getListings = () => client.get<any>(endPoint);

const getMyListings = () => client.get<any>(`${endPoint}/self`);

const addListing = (
  listing: any,
  onUploadProgress: (progress: number) => any
) => {
  // const data = new FormData();
  // data.append("title", listing.title);
  // data.append("price", listing.price);
  // data.append("categoryId", listing.categoryId);
  // data.append("description", listing.description);
  // listing.images.forEach((image: string, index: number) =>
  //   data.append("images", JSON.stringify(image))
  // );
  // if (listing.location) data.append("location", listing.location);

  return client.post(endPoint, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress?.loaded / progress?.total),
  });
};

export default {
  getListings,
  addListing,
  getMyListings
};
