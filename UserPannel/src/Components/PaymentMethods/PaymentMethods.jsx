import React, { useState } from "react";
import {
  MdAdd,
  MdCheck,
  MdCreditCard,
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdPayments,
  MdVerifiedUser,
  MdClose,
  MdDownload,
} from "react-icons/md";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import "./PaymentMethods.css";

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    accountHolder: "Pupin Kumar",
  });

  // Saved Payment Methods Initial Data
  const [savedMethods, setSavedMethods] = useState([
    {
      id: 1,
      type: "visa",
      name: "Visa Credit Card",
      number: "**** **** **** 4242",
      details: "Expires 12/27",
      accountHolder: "Pupin Kumar",
      status: "Active",
    },
    {
      id: 2,
      type: "mastercard",
      name: "Mastercard Debit Card",
      number: "**** **** **** 8888",
      details: "Expires 09/26",
      accountHolder: "Pupin Kumar",
      status: "Active",
    },
    {
      id: 3,
      type: "upi",
      name: "UPI ID",
      number: "pupin.kumar@oksbi",
      details: "UPI",
      accountHolder: "Pupin Kumar",
      status: "Active",
    },
    {
      id: 4,
      type: "paytm",
      name: "Paytm Wallet",
      number: "pupin.kumar@paytm",
      details: "Wallet",
      accountHolder: "Pupin Kumar",
      status: "Active",
    },
  ]);

  // Method Option Cards
  const paymentOptions = [
    {
      id: "card",
      title: "Credit / Debit Card",
      subtitle: "Add and secure your card details",
      icon: <MdCreditCard />,
    },
    {
      id: "upi",
      title: "UPI",
      subtitle: "Pay using UPI ID or scan & pay",
      icon: (
        <span className="PaymentMethods_UpiLogoText">
          UPI<span className="PaymentMethods_UpiAccent">❯</span>
        </span>
      ),
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "Pay securely using your bank account",
      icon: <MdAccountBalance />,
    },
    {
      id: "wallets",
      title: "Wallets",
      subtitle: "Pay using Paytm, PhonePe or other wallets",
      icon: <MdAccountBalanceWallet />,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay in cash when your order is delivered",
      icon: <MdPayments />,
    },
  ];

  // Open Modal for New Card or Edit
  const handleOpenModal = (card = null) => {
    if (card) {
      setEditingCardId(card.id);
      setFormData({
        cardName: card.name,
        cardNumber: card.number,
        expiry: card.details.replace("Expires ", ""),
        accountHolder: card.accountHolder,
      });
    } else {
      setEditingCardId(null);
      setFormData({
        cardName: "",
        cardNumber: "",
        expiry: "",
        accountHolder: "Pupin Kumar",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Remove Method
  const handleRemove = (id) => {
    setSavedMethods((prev) => prev.filter((item) => item.id !== id));
  };

  // Form Field Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit (Add / Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCardId) {
      setSavedMethods((prev) =>
        prev.map((item) =>
          item.id === editingCardId
            ? {
                ...item,
                name: formData.cardName || item.name,
                number: formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : item.number,
                details: formData.expiry ? `Expires ${formData.expiry}` : item.details,
                accountHolder: formData.accountHolder,
              }
            : item
        )
      );
    } else {
      const newMethod = {
        id: Date.now(),
        type: "visa",
        name: formData.cardName || "Visa Credit Card",
        number: formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : "**** **** **** 1234",
        details: formData.expiry ? `Expires ${formData.expiry}` : "Expires 12/28",
        accountHolder: formData.accountHolder || "Pupin Kumar",
        status: "Active",
      };
      setSavedMethods((prev) => [...prev, newMethod]);
    }

    handleCloseModal();
  };

  // Download Invoice/Summary Feature
  const handleDownloadInvoice = () => {
    const content = `
==================================================
           SAVED PAYMENT METHODS STATEMENT        
==================================================
Account Holder: Pupin Kumar
Date Generated: ${new Date().toLocaleDateString()}

Active Saved Methods:
--------------------------------------------------
${savedMethods
  .map(
    (item, index) =>
      `${index + 1}. ${item.name}\n   Identifier: ${item.number}\n   Details: ${item.details}\n   Status: ${item.status}\n`
  )
  .join("\n")}
==================================================
Your payment information is secure and encrypted.
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payment_Methods_Summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="PaymentMethods">
      {/* Header Bar */}
      <div className="PaymentMethods_Header">
        <div>
          <h2 className="PaymentMethods_Title">Payment Methods</h2>
          <p className="PaymentMethods_Subtitle">
            Manage your saved payment methods and payment preferences.
          </p>
        </div>
        <div className="PaymentMethods_HeaderActions">
          <button
            className="PaymentMethods_DownloadBtn"
            onClick={handleDownloadInvoice}
            title="Download Payment Summary"
          >
            <MdDownload />
            <span>Download Summary</span>
          </button>
          <button
            className="PaymentMethods_AddBtn"
            onClick={() => handleOpenModal()}
          >
            <MdAdd />
            <span>Add New Card</span>
          </button>
        </div>
      </div>

      {/* Add Payment Method Option Selector */}
      <div className="PaymentMethods_OptionsCard">
        <h3 className="PaymentMethods_CardTitle">Add Payment Method</h3>

        <div className="PaymentMethods_OptionsGrid">
          {paymentOptions.map((option) => {
            const isSelected = selectedMethod === option.id;
            return (
              <div
                key={option.id}
                className={`PaymentMethods_OptionBox ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => setSelectedMethod(option.id)}
              >
                <div className="PaymentMethods_RadioCircle">
                  {isSelected && <MdCheck />}
                </div>

                <div className="PaymentMethods_OptionIcon">{option.icon}</div>

                <h4 className="PaymentMethods_OptionTitle">{option.title}</h4>
                <p className="PaymentMethods_OptionSubtitle">
                  {option.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Payment Methods Table Card */}
      <div className="PaymentMethods_SavedCard">
        <h3 className="PaymentMethods_CardTitle">Saved Payment Methods</h3>

        <div className="PaymentMethods_TableWrapper">
          <table className="PaymentMethods_Table">
            <thead>
              <tr>
                <th>METHOD</th>
                <th>DETAILS</th>
                <th>ACCOUNT HOLDER</th>
                <th>STATUS</th>
                <th className="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {savedMethods.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="PaymentMethods_MethodCell">
                      <div className="PaymentMethods_BrandLogo">
                        {item.type === "visa" && (
                          <FaCcVisa className="visa-color" />
                        )}
                        {item.type === "mastercard" && (
                          <FaCcMastercard className="mastercard-color" />
                        )}
                        {item.type === "upi" && (
                          <span className="PaymentMethods_UpiLogoCell">
                            UPI<span className="PaymentMethods_UpiAccent">❯</span>
                          </span>
                        )}
                        {item.type === "paytm" && (
                          <SiPaytm className="paytm-color" />
                        )}
                      </div>
                      <div className="PaymentMethods_MethodInfo">
                        <span className="PaymentMethods_MethodName">
                          {item.name}
                        </span>
                        <span className="PaymentMethods_MethodNumber">
                          {item.number}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="PaymentMethods_DetailsText">{item.details}</td>
                  <td className="PaymentMethods_HolderText">
                    {item.accountHolder}
                  </td>
                  <td>
                    <span className="PaymentMethods_ActiveBadge">
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="PaymentMethods_ActionsGroup">
                      <button
                        className="PaymentMethods_EditBtn"
                        onClick={() => handleOpenModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="PaymentMethods_RemoveBtn"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Security Footer Note */}
        <div className="PaymentMethods_SecurityFooter">
          <MdVerifiedUser className="PaymentMethods_SecurityIcon" />
          <span>Your payment information is secure and encrypted.</span>
        </div>
      </div>

      {/* Add / Edit Card Smooth Popup Modal */}
      <div className={`PaymentMethods_ModalOverlay ${isModalOpen ? "open" : ""}`}>
        <div className="PaymentMethods_ModalContent">
          <div className="PaymentMethods_ModalHeader">
            <h3>{editingCardId ? "Edit Card Details" : "Add New Card"}</h3>
            <button
              className="PaymentMethods_ModalCloseBtn"
              onClick={handleCloseModal}
            >
              <MdClose />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="PaymentMethods_ModalForm">
            <div className="PaymentMethods_FormGroup">
              <label>Card Name / Type</label>
              <input
                type="text"
                name="cardName"
                placeholder="e.g. HDFC Visa Credit Card"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="PaymentMethods_FormGroup">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9101 1121"
                maxLength="19"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="PaymentMethods_FormRow">
              <div className="PaymentMethods_FormGroup">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="PaymentMethods_FormGroup">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  name="accountHolder"
                  placeholder="Pupin Kumar"
                  value={formData.accountHolder}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="PaymentMethods_ModalFooter">
              <button
                type="button"
                className="PaymentMethods_CancelBtn"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button type="submit" className="PaymentMethods_SaveBtn">
                {editingCardId ? "Save Changes" : "Add Card"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;