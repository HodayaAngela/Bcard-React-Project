const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://media.istockphoto.com/id/1406742992/photo/businessman-draws-increase-arrow-graph-corporate-future-growth-year-2022-to-2023-planning.jpg?s=612x612&w=0&k=20&c=QmIxmVKDPyM8sW9QLrVYsSPvTrV-PXd90qr5f1F1gJA=",
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
