import React from "react";
import { connect, useDispatch, useSelector } from "react-redux"; // این خط اضافه شد
import { buyApple, buyOrange } from "../redux/fruit/fruitAction";
import { buySandwich } from "../redux/food/foodAction";
const MyStore = () => {
    const fruitState = useSelector((state) => state.fruit);
    const foodState = useSelector((state) => state.food);
    console.log(fruitState)
    const dispatch = useDispatch()
    return (
        <div>
            <h5>سیب: {fruitState.apple}</h5>
            <h5>پرتقال: {fruitState.orange}</h5>
            <h5>پرتقال: {foodState.sandwich}</h5>
            <div>
                <button onClick={() => dispatch(buyApple())}>خرید سیب</button>
                <button onClick={() => dispatch(buyOrange())}>خرید پرتقال</button>
                <button onClick={() => dispatch(buySandwich())}>خرید ساندویچ</button>
            </div>
        </div>
    );
};

export default MyStore;