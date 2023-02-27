export const getFullAddress = (address, ward, district, province) => {
    let fullAddress = [
      address || "",
      ward?.name || "",
      district?.name || "",
      province?.name || "",
    ].filter((element) => element !== "");

    return fullAddress.join(", ");
  };