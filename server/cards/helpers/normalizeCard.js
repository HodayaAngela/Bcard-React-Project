const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, cardUserId) => {
  const { url, alt } = rawCard.image;
  const image = {
    url: url || "https://source.unsplash.com/random/?business",
    alt: alt || "Business card image",
  };

  return {
    ...rawCard,
    image,
    address: {
      ...rawCard.address,
      state: rawCard.address.state || "",
    },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || cardUserId,
  };
};

module.exports = normalizeCard;
