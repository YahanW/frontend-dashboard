import React from "react";
import './checkout.css';
import Header from "../../layout/Header";

function CheckOut(){
    return(
        <>
            <Header/>   
            <div className="checkout">
            {/* REVIEW these are static code now, later would implement more with backend */}
                <div className="left">
                    {/* REVIEW the checkout item details */}
                    <div className="itemContainer">
                        <h1>CHECK OUT</h1>
                        <div className="itemCheck">
                            <h2>Service Type</h2>
                            <h2>Date</h2>
                            <h2>Event Package</h2>

                        </div>
                    </div>
                    {/* REVIEW payment method selection
                        TODO put three popular payment below later
                    */}
                    <div className="payContainer">
                        <h1>Payment Method</h1>
                        <div className="itemCheck">
                        </div>
                    </div>
                    {/* REVIEW bankcard or other payment details */}
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
                        {/*TODO if voucher code valid then button valid and calculate new checkout amount */}
                        <form className="voucher">
                            <input type="text" placeholder="Place Your Discount Code Here"/>
                            <button disabled >Apply</button>
                        </form>
                        {/* REVIEW final checkout calculation */}
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