import React from "react";
import { connect } from "react-redux"; // این خط اضافه شد
import { buyApple, buyOrange } from "../redux/fruit/fruitAction";

const MyStore = (props) => {
    return (
        <div>
            <h5>سیب: {props.apple}</h5>
            <h5>پرتقال: {props.orange}</h5>
            <div>
                <button onClick={props.buyApple}>خرید سیب</button>
                <button onClick={props.buyOrange}>خرید پرتقال</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        apple: state.apple,
        orange: state.orange
    };
};

const mapDispatchToProps = dispatch => {
    return {
        buyApple: () => dispatch(buyApple()),
        buyOrange: () => dispatch(buyOrange())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStore);