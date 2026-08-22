import React from "react";
import {
  MdCheck,
  MdInventory2,
  MdLocalShipping,
  MdHome,
  MdHeadsetMic,
  MdDownload,
  MdOpenInNew,
} from "react-icons/md";
import "./TrackOrder.css";

const TrackOrder = () => {
  const orderData = {
    orderId: "ORD-2560",
    placedDate: "May 7, 2025",
    totalAmount: "1,299",
    paymentMethod: "Online",
    status: "In Transit",
    estDelivery: "May 12, 2025",
    customer: {
      name: "Popin Kumar",
      address: "123, Cuttack Road, Bhubaneswar, Odisha - 751001",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "May 7, 2025",
        time: "10:30 AM",
        completed: true,
        icon: <MdCheck />,
      },
      {
        status: "Confirmed",
        date: "May 7, 2025",
        time: "11:15 AM",
        completed: true,
        icon: <MdCheck />,
      },
      {
        status: "Packed",
        date: "May 8, 2025",
        time: "09:20 AM",
        completed: true,
        icon: <MdInventory2 />,
      },
      {
        status: "In Transit",
        date: "May 9, 2025",
        time: "04:45 PM",
        active: true,
        icon: <MdLocalShipping />,
      },
      {
        status: "Delivered",
        date: "Expected by",
        time: "May 12, 2025",
        upcoming: true,
        icon: <MdHome />,
      },
    ],
    items: [
      {
        id: 1,
        name: "Honey Gift Pack",
        weight: "250g",
        price: "699",
        qty: 1,
        image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=200",
      },
      {
        id: 2,
        name: "Nut Fusion Box",
        weight: "300g",
        price: "600",
        qty: 1,
        image: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&q=80&w=200",
      },
    ],
    pricing: {
      subtotal: "1,150",
      shipping: "99",
      discount: "50",
      total: "1,299",
    },
    deliveryPartner: {
      name: "Delhivery",
      trackingId: "12345678901234",
      trackingUrl: "https://www.delhivery.com/",
    },
  };

  const handleDownloadInvoice = () => {
    const invoiceContent = `
========================================
           SABRIYANA INVOICE            
========================================
Order ID        : ${orderData.orderId}
Order Date      : ${orderData.placedDate}
Customer Name   : ${orderData.customer.name}
Shipping Address: ${orderData.customer.address}

----------------------------------------
ITEMS PURCHASED:
1. Honey Gift Pack (250g) - Qty: 1 - ₹699
2. Nut Fusion Box (300g)  - Qty: 1 - ₹600

----------------------------------------
BILLING SUMMARY:
Subtotal        : ₹${orderData.pricing.subtotal}
Shipping Charges: ₹${orderData.pricing.shipping}
Coupon Discount : -₹${orderData.pricing.discount}
----------------------------------------
TOTAL AMOUNT    : ₹${orderData.pricing.total}
Payment Method  : ${orderData.paymentMethod}
========================================
Thank you for shopping with Sabriyana!
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${orderData.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNeedHelp = () => {
    alert("Need Help clicked! Connecting to customer support...");
  };

  const handleTrackOnWebsite = () => {
    window.open(orderData.deliveryPartner.trackingUrl, "_blank");
  };

  return (
    <div className="TrackOrder">
      {/* Top Banner Card */}
      <div className="TrackOrder_TopCard">
        <div className="TrackOrder_MetaGroup">
          <div className="TrackOrder_MetaItem">
            <span className="TrackOrder_MetaLabel">Order ID</span>
            <h3 className="TrackOrder_MetaValue">{orderData.orderId}</h3>
            <span className="TrackOrder_SubText">
              Placed on {orderData.placedDate}
            </span>
          </div>

          <div className="TrackOrder_MetaItem">
            <span className="TrackOrder_MetaLabel">Order Total</span>
            <h3 className="TrackOrder_MetaValue">₹ {orderData.totalAmount}</h3>
            <span className="TrackOrder_SubText">
              Payment : {orderData.paymentMethod}
            </span>
          </div>

          <div className="TrackOrder_MetaItem">
            <span className="TrackOrder_MetaLabel">Order Status</span>
            <span className="TrackOrder_StatusBadge">
              {orderData.status}
            </span>
            <span className="TrackOrder_SubText">
              Est. Delivery: {orderData.estDelivery}
            </span>
          </div>

          <div className="TrackOrder_MetaItem">
            <span className="TrackOrder_MetaLabel">Shipping Address</span>
            <strong className="TrackOrder_CustomerName">
              {orderData.customer.name}
            </strong>
            <p className="TrackOrder_AddressText">
              {orderData.customer.address}
            </p>
          </div>
        </div>

        <button
          className="TrackOrder_NeedHelpBtn"
          onClick={handleNeedHelp}
        >
          <MdHeadsetMic />
          <span>Need Help?</span>
        </button>
      </div>

      {/* Order Progress Stepper Card */}
      <div className="TrackOrder_StatusCard">
        <h3 className="TrackOrder_SectionTitle">Order Status</h3>

        <div className="TrackOrder_Stepper">
          {orderData.timeline.map((step, index) => {
            let stepClass = "TrackOrder_Step";
            if (step.completed) stepClass += " completed";
            if (step.active) stepClass += " active";
            if (step.upcoming) stepClass += " upcoming";

            return (
              <React.Fragment key={index}>
                <div className={stepClass}>
                  <div className="TrackOrder_StepIcon">{step.icon}</div>
                  <h4 className="TrackOrder_StepTitle">{step.status}</h4>
                  <p className="TrackOrder_StepDate">{step.date}</p>
                  <p className="TrackOrder_StepTime">{step.time}</p>
                </div>

                {index < orderData.timeline.length - 1 && (
                  <div
                    className={`TrackOrder_Line ${
                      orderData.timeline[index + 1].upcoming
                        ? "dashed"
                        : "solid"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="TrackOrder_InfoBanner">
          <MdLocalShipping className="TrackOrder_BannerIcon" />
          <span>
            Your order is on the way! Our delivery partner is expected to deliver your order by {orderData.estDelivery}.
          </span>
        </div>
      </div>

      {/* Bottom Layout Grid */}
      <div className="TrackOrder_Grid">
        {/* Left Card: Order Items */}
        <div className="TrackOrder_ItemsCard">
          <h3 className="TrackOrder_SectionTitle">
            Order Items ({orderData.items.length})
          </h3>

          <div className="TrackOrder_ItemsList">
            {orderData.items.map((item) => (
              <div key={item.id} className="TrackOrder_ItemRow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="TrackOrder_ItemImg"
                />
                <div className="TrackOrder_ItemDetails">
                  <h4 className="TrackOrder_ItemName">{item.name}</h4>
                  <span className="TrackOrder_ItemWeight">{item.weight}</span>
                </div>
                <div className="TrackOrder_ItemPricing">
                  <span className="TrackOrder_ItemPrice">₹ {item.price}</span>
                  <span className="TrackOrder_ItemQty">Qty: {item.qty}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="TrackOrder_InvoiceBtn"
            onClick={handleDownloadInvoice}
          >
            <MdDownload />
            <span>Download Invoice</span>
          </button>
        </div>

        {/* Right Cards Column */}
        <div className="TrackOrder_RightCol">
          {/* Order Details Price Breakup */}
          <div className="TrackOrder_SummaryCard">
            <h3 className="TrackOrder_SectionTitle">Order Details</h3>

            <div className="TrackOrder_SummaryRow">
              <span>Subtotal</span>
              <span>₹ {orderData.pricing.subtotal}</span>
            </div>

            <div className="TrackOrder_SummaryRow">
              <span>Shipping Charges</span>
              <span>₹ {orderData.pricing.shipping}</span>
            </div>

            <div className="TrackOrder_SummaryRow TrackOrder_DiscountRow">
              <span>Coupon Discount</span>
              <span>- ₹ {orderData.pricing.discount}</span>
            </div>

            <div className="TrackOrder_Divider" />

            <div className="TrackOrder_SummaryRow TrackOrder_TotalRow">
              <strong>Total Amount</strong>
              <strong>₹ {orderData.pricing.total}</strong>
            </div>
          </div>

          {/* Delivery Partner Card */}
          <div className="TrackOrder_PartnerCard">
            <div className="TrackOrder_PartnerInfo">
              <span className="TrackOrder_PartnerLabel">Delivery Partner</span>
              <h4 className="TrackOrder_PartnerName">
                {orderData.deliveryPartner.name}
              </h4>
              <p className="TrackOrder_TrackingId">
                Tracking ID: {orderData.deliveryPartner.trackingId}
              </p>
            </div>

            <button
              className="TrackOrder_TrackWebBtn"
              onClick={handleTrackOnWebsite}
            >
              <span>Track on Website</span>
              <MdOpenInNew />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;