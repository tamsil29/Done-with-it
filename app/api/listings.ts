import client from "./client";

const endPoint = "/listings";

const getListings = () => client.get<any>(endPoint);

const addListing = (listing: any) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.categoryId);
  data.append("description", listing.description);
  listing.images.forEach((image: string, index: number) =>
    data.append("images", JSON.stringify(image))
  );
  if(listing.location) data.append("location", listing.location)

  return  client.post(endPoint, data)
};

export default {
  getListings,
  addListing
};
