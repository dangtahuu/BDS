
export const FormatMoney = (value) => {
    if (!value) return '0';

    if (typeof value === "string" || "String") value = parseInt(value);

    if (value < 1000) return value + " đồng";

    if (value < 1000000) return (value/1000).toFixed(2) + " nghìn";

    if (value < 1000000000) return (value/1000000).toFixed(2) + " triệu";

    return (value/1000000000).toFixed(2) + " tỷ";
};