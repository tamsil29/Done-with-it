export function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const defaultUserAvatar = 'https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png'

export function getUserImage(imageObject: any) {
  return imageObject?.baseUrl && imageObject?.key
    ? imageObject?.baseUrl + imageObject?.key
    : defaultUserAvatar;
}
