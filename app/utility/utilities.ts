export function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getUserImage(imageObject: any) {
  return imageObject?.baseUrl && imageObject?.key
    ? imageObject?.baseUrl + imageObject?.key
    : "https://shorturl.at/qFGY8";
}
