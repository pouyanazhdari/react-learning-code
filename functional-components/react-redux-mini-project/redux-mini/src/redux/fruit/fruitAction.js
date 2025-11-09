import { Buy_Apple, Buy_Orange } from "./fruitsType";

export const buyApple = () => {
    return { type: Buy_Apple };
};

export const buyOrange = () => {
    return { type: Buy_Orange };
};
