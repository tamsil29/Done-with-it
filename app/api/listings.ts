import client from "./client";

const endPoint = "/listings";

const getListings = () => client.get<any>(endPoint);

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
  const imageId = [...listing.images]
  delete listing.category
  delete listing.images
  const data = {...listing, userId: '645f9dfa6c08d03d21f06279', categoryId: '645fa7ad41e18c97c4c8eb00', imageId}

  return client.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress?.loaded / progress?.total),
  });
};

export default {
  getListings,
  addListing,
};
