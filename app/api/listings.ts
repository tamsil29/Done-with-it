import client from "./client";

const endPoint = "/listings";

const getListings = (queryParams?: any) => client.get<any>(endPoint, queryParams);

const getMyListings = () => client.get<any>(`${endPoint}/self`);

const getOneListing = (listingId: string) => client.get<any>(`${endPoint}/${listingId}`)

const deleteListing = (listingId: string) => client.delete<any>(`${endPoint}/${listingId}`)

const addListing = (
  listing: any,
  onUploadProgress: (progress: number) => any
) => {
  return client.post(endPoint, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress?.loaded / progress?.total),
  });
};

export default {
  getListings,
  addListing,
  getMyListings,
  getOneListing,
  deleteListing
};
