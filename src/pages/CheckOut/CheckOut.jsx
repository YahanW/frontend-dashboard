import React from "react";
import './checkout.css';
import Header from "../../layout/Header";

function CheckOut(){
    return(
        <>
            <Header/>   
            <div className="checkout">
           
                <div className="left">
                    <div className="itemContainer">
                        <h1>CHECK OUT</h1>
                        <div className="itemCheck">
                            <h2>Service Type</h2>
                            <h2>Date</h2>
                            <h2>Event Package</h2>

                        </div>
                    </div>
                    <div className="payContainer">
                        <h1>Payment Method</h1>
                        <div className="itemCheck">
                        </div>
                    </div>

                    <div className="cardContainer">
                        <h1>Card Details</h1>
                        <form>
                            <div className="itemCheck">
                                <div className="first">
                                    <h2>Name</h2>
                                    <input type="text" />
                                    <h2>CVV</h2>
                                    <input type="text" />
                                </div>
                                <div className="second">
                                    <h2>Card Number</h2>
                                    <input type="text" />
                                </div>
                                <div className="third">
                                    <h2>Expire Date</h2>
                                    <input type="text" />
                                    <input type="text" />
                                </div>
                                
                            </div>
                            <button>Confirm</button>
                        </form>
                    </div>
                </div>
                <div className="right">
                    <div className="vouBox">
                        <form className="voucher">
                            <input type="text" placeholder="Place Your Discount Code Here"/>
                            <button disabled >Apply</button>
                        </form>
                        <div className="calc">
                            <h3>Subtotal</h3>
                            <p>7820</p>
                            <h3>Taxes(Estimated)</h3>
                            <p>180</p>
                            <hr></hr>
                            <h3>Total</h3>
                            <h1>$8000</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut;