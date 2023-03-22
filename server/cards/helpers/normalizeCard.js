const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  const { url, alt } = rawCard.image;
  const image = {
    url:
      url ||
      "https://media.istockphoto.com/id/1406742992/photo/businessman-draws-increase-arrow-graph-corporate-future-growth-year-2022-to-2023-planning.jpg?s=612x612&w=0&k=20&c=QmIxmVKDPyM8sW9QLrVYsSPvTrV-PXd90qr5f1F1gJA=",
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
    user_id: rawCard.user_id || userId,
  };
};

module.exports = normalizeCard;
