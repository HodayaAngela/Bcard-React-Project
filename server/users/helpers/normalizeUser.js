const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://media.istockphoto.com/id/1406742992/photo/businessman-draws-increase-arrow-graph-corporate-future-growth-year-2022-to-2023-planning.jpg?b=1&s=170667a&w=0&k=20&c=hwhDfFSJET9J1A6mRK9sTJQn2hQs3Bo_kizTqasrPwA=",
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
