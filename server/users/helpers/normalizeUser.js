const normalizeUser = (rawUser, userId) => {
  const { url, alt } = rawUser.image;
  const image = {
    url: url || "https://source.unsplash.com/random/?business",
    alt: alt || "Business user image",
  };

  return {
    ...rawUser,
    name: {
      ...rawUser.name,
      middle: rawUser.name.middle || "",
    },
    image,
    address: {
      ...rawUser.address,
      state: rawUser.address.state || "",
    },
    isAdmin: rawUser.isAdmin || false,
    user_id: rawUser.user_id || userId,
  };
};

module.exports = normalizeUser;
