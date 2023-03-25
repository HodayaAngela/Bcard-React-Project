const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://media.istockphoto.com/id/175436790/photo/user-icon.jpg?s=612x612&w=0&k=20&c=zMOlQqLGfjkM5Mx1W4yoxe5G78Hy3RGZ3wzszEpVuWc=",
    alt: rawUser.image.alt || "Business card image",
  };

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "not defined",
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
