const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  const { url, alt } = rawCard.image;
  const image = {
    url: url || "https://source.unsplash.com/random/?business",
    alt: alt || "Business card image",
  };

  const card = {
    ...rawCard,
    image,
    address: {
      ...rawCard.address,
      state: rawCard.address.state || "not defined",
    },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: userId,
  };
  return card;
};

module.exports = normalizeCard;
