const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || '' };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png',
    alt: rawUser.image.alt || 'Business card image',
  };

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || 'not defined',
  };

  const user = {
    ...rawUser,
    name,
    image,
    address,
  };

  return user;
};

module.exports = normalizeUser;

// const normalizeUser = (rawUser, userId) => {
//   const { url, alt } = rawUser.image;
//   const image = {
//     url: url || "https://source.unsplash.com/random/?business",
//     alt: alt || "Business user image",
//   };

//   return {
//     ...rawUser,
//     name: {
//       ...rawUser.name,
//       middle: rawUser.name.middle || "",
//     },
//     image,
//     address: {
//       ...rawUser.address,
//       state: rawUser.address.state || "",
//     },
//     isAdmin: rawUser.isAdmin || false,
//     user_id: rawUser.user_id || userId,
//   };
// };

// module.exports = normalizeUser;
