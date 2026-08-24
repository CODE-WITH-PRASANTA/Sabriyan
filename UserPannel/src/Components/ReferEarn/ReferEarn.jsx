import React, { useState } from "react";
import {
  MdPeople,
  MdCardGiftcard,
  MdAccountBalanceWallet,
  MdContentCopy,
  MdCheck,
  MdShare,
  MdShoppingBag,
  MdDownload,
  MdArrowForward,
  MdMail,
  MdMoreHoriz,
  MdConfirmationNumber,
  MdRedeem,
} from "react-icons/md";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import "./ReferEarn.css";

const ReferEarn = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [referralCode] = useState("SABRIYANA10");
  const [referralLink, setReferralLink] = useState(
    "https://sabriyana.com/ref/SABRIYANA10"
  );
  const [balance, setBalance] = useState(650);

  // Referral Table Data
  const [referrals] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@email.com",
      initial: "A",
      avatarBg: "#FCE8E6",
      initialColor: "#D93025",
      joinedOn: "May 28, 2025",
      firstOrder: "May 29, 2025",
      orderValue: "₹ 1,250",
      earnings: "₹ 125",
      status: "Completed",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya.verma@email.com",
      initial: "P",
      avatarBg: "#E8F0FE",
      initialColor: "#1A73E8",
      joinedOn: "May 25, 2025",
      firstOrder: "May 27, 2025",
      orderValue: "₹ 980",
      earnings: "₹ 98",
      status: "Completed",
    },
    {
      id: 3,
      name: "Rahul Das",
      email: "rahul.das@email.com",
      initial: "R",
      avatarBg: "#FEF7E0",
      initialColor: "#B06000",
      joinedOn: "May 20, 2025",
      firstOrder: "Pending",
      orderValue: "-",
      earnings: "₹ 0",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sneha Patra",
      email: "sneha.patra@email.com",
      initial: "S",
      avatarBg: "#E6F4EA",
      initialColor: "#137333",
      joinedOn: "May 18, 2025",
      firstOrder: "Pending",
      orderValue: "-",
      earnings: "₹ 0",
      status: "Pending",
    },
  ]);

  // Rewards List Data
  const rewardsList = [
    {
      id: 1,
      title: "₹250 Off",
      minOrder: "On minimum order of ₹999",
      points: 250,
    },
    {
      id: 2,
      title: "₹500 Off",
      minOrder: "On minimum order of ₹1,999",
      points: 500,
    },
    {
      id: 3,
      title: "₹1000 Off",
      minOrder: "On minimum order of ₹3,499",
      points: 1000,
    },
  ];

  // Action Functions
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSocialShare = (platform) => {
    const text = encodeURIComponent(
      `Join me on Sabriyana using my referral link and enjoy craft chocolates & honey! ${referralLink}`
    );
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          referralLink
        )}`;
        break;
      case "instagram":
        navigator.clipboard.writeText(referralLink);
        alert(
          "Referral link copied to clipboard! You can now paste and share it on Instagram."
        );
        return;
      case "email":
        shareUrl = `mailto:?subject=Gift from Sabriyana&body=${text}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  const handleRedeemNow = () => {
    if (balance >= 250) {
      alert("Redemption initiated! You have successfully redeemed your balance.");
      setBalance((prev) => prev - 250);
    } else {
      alert("Minimum ₹250 required to redeem.");
    }
  };

  const handleDownloadReport = () => {
    const content = `
==================================================
           SABRIYANA REFER & EARN REPORT          
==================================================
Total Earned: ₹ 1,250
Successful Referrals: 12
Available Balance: ₹ ${balance}

REFERRAL LIST:
--------------------------------------------------
${referrals
  .map(
    (ref, i) =>
      `${i + 1}. ${ref.name} (${ref.email})
   Joined: ${ref.joinedOn} | First Order: ${ref.firstOrder}
   Order Value: ${ref.orderValue} | Earnings: ${ref.earnings} | Status: ${ref.status}\n`
  )
  .join("\n")}
==================================================
Thank you for spreading the love of Sabriyana!
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Referral_Report_${referralCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ReferEarn">
      {/* Top Banner Card */}
      <div className="ReferEarn_TopCard">
        <div className="ReferEarn_HeaderContent">
          <div className="ReferEarn_TitleArea">
            <h2 className="ReferEarn_Title">Refer & Earn</h2>
            <p className="ReferEarn_Subtitle">
              Share the love of Sabriyana and earn exciting rewards!
            </p>
          </div>

          <button
            className="ReferEarn_DownloadBtn"
            onClick={handleDownloadReport}
          >
            <MdDownload />
            <span>Download Summary</span>
          </button>

          {/* Stats Bar */}
          <div className="ReferEarn_StatsGroup">
            <div className="ReferEarn_StatItem">
              <div className="ReferEarn_StatIcon icon-brown">
                <MdPeople />
              </div>
              <div className="ReferEarn_StatText">
                <span className="ReferEarn_StatLabel">Total Earned</span>
                <h3 className="ReferEarn_StatValue">₹ 1,250</h3>
                <span className="ReferEarn_StatSub label-green">
                  Rewards Earned
                </span>
              </div>
            </div>

            <div className="ReferEarn_StatItem">
              <div className="ReferEarn_StatIcon icon-pink">
                <MdCardGiftcard />
              </div>
              <div className="ReferEarn_StatText">
                <span className="ReferEarn_StatLabel">
                  Successful Referrals
                </span>
                <h3 className="ReferEarn_StatValue">12</h3>
                <span className="ReferEarn_StatSub label-green">
                  Friends Joined
                </span>
              </div>
            </div>

            <div className="ReferEarn_StatItem">
              <div className="ReferEarn_StatIcon icon-tan">
                <MdAccountBalanceWallet />
              </div>
              <div className="ReferEarn_StatText">
                <span className="ReferEarn_StatLabel">Available Balance</span>
                <h3 className="ReferEarn_StatValue">₹ {balance}</h3>
                <span className="ReferEarn_StatSub label-green">
                  Ready to Redeem
                </span>
              </div>
            </div>
          </div>

          {/* Referral Code Box */}
          <div className="ReferEarn_CodeCard">
            <div className="ReferEarn_CodeLeft">
              <span className="ReferEarn_CodeLabel">Your Referral Code</span>
              <h3 className="ReferEarn_CodeText">{referralCode}</h3>
            </div>
            <button
              className="ReferEarn_CopyCodeBtn"
              onClick={handleCopyCode}
            >
              {copiedCode ? <MdCheck /> : <MdContentCopy />}
              <span>{copiedCode ? "Copied" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        {/* Right Side Vector Illustration */}
        <div className="ReferEarn_IllustrationArea">
          <div className="ReferEarn_BannerText">
            <span className="ReferEarn_ScriptText">Give Friends</span>
            <h4 className="ReferEarn_BoldText">Great Chocolate</h4>
            <h4 className="ReferEarn_AccentText">Get Rewards!</h4>
          </div>
          <div className="ReferEarn_IllustrationContainer">
            <svg
              viewBox="0 0 500 400"
              className="ReferEarn_SvgGraphic"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="250" cy="220" r="160" fill="#FFF7EC" />
              {/* Woman Illustration */}
              <g className="woman">
                <path
                  d="M170 120 Q190 100 210 120 L210 170 L160 170 Z"
                  fill="#4A2511"
                />
                <circle cx="185" cy="140" r="22" fill="#FAD0C4" />
                <path
                  d="M165 160 Q185 200 205 160 L230 260 L140 260 Z"
                  fill="#ECA82C"
                />
                <path
                  d="M195 180 L250 200 L245 215 L190 195 Z"
                  fill="#FAD0C4"
                />
              </g>

              {/* Gift Box */}
              <g className="giftbox">
                <rect
                  x="245"
                  y="185"
                  width="70"
                  height="75"
                  rx="6"
                  fill="#2A1810"
                />
                <rect x="240" y="180" width="80" height="15" rx="3" fill="#3D2317" />
                <rect x="275" y="180" width="10" height="80" fill="#ECA82C" />
                <path
                  d="M270 170 Q280 155 290 170 Q280 178 270 170 Z"
                  fill="#ECA82C"
                />
                <circle cx="280" cy="220" r="12" fill="#ECA82C" />
              </g>

              {/* Man Illustration */}
              <g className="man">
                <path d="M360 90 Q380 90 395 110 L395 160 L350 160 Z" fill="#2A1810" />
                <circle cx="370" cy="130" r="22" fill="#FAD0C4" />
                <path
                  d="M345 155 Q370 190 395 155 L420 260 L320 260 Z"
                  fill="#81A870"
                />
                <path
                  d="M355 180 L305 200 L300 215 L350 195 Z"
                  fill="#FAD0C4"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Middle Row Layout */}
      <div className="ReferEarn_MiddleGrid">
        {/* Share Link Card */}
        <div className="ReferEarn_Card ReferEarn_ShareCard">
          <h3 className="ReferEarn_SectionTitle">Share your link</h3>
          <p className="ReferEarn_SectionSubtitle">
            Share your referral link with friends and earn rewards
          </p>

          <div className="ReferEarn_InputGroup">
            <input
              type="text"
              className="ReferEarn_LinkInput"
              value={referralLink}
              onChange={(e) => setReferralLink(e.target.value)}
            />
            <button
              className="ReferEarn_CopyLinkBtn"
              onClick={handleCopyLink}
            >
              {copiedLink ? <MdCheck /> : <MdContentCopy />}
              <span>{copiedLink ? "Copied" : "Copy Link"}</span>
            </button>
          </div>

          <span className="ReferEarn_ShareViaLabel">Share via</span>

          <div className="ReferEarn_SocialIconsRow">
            <button
              className="ReferEarn_SocialBtn whatsapp"
              onClick={() => handleSocialShare("whatsapp")}
              title="Share on WhatsApp"
            >
              <FaWhatsapp />
            </button>
            <button
              className="ReferEarn_SocialBtn facebook"
              onClick={() => handleSocialShare("facebook")}
              title="Share on Facebook"
            >
              <FaFacebookF />
            </button>
            <button
              className="ReferEarn_SocialBtn instagram"
              onClick={() => handleSocialShare("instagram")}
              title="Share on Instagram"
            >
              <FaInstagram />
            </button>
            <button
              className="ReferEarn_SocialBtn email"
              onClick={() => handleSocialShare("email")}
              title="Share via Email"
            >
              <MdMail />
            </button>
            <button
              className="ReferEarn_SocialBtn more"
              onClick={handleCopyLink}
              title="More options"
            >
              <MdMoreHoriz />
            </button>
            <span className="ReferEarn_MoreText">More</span>
          </div>
        </div>

        {/* How It Works Card */}
        <div className="ReferEarn_Card ReferEarn_HowCard">
          <h3 className="ReferEarn_SectionTitle">How It Works</h3>

          <div className="ReferEarn_StepsWrapper">
            <div className="ReferEarn_StepItem">
              <div className="ReferEarn_StepBadge">1</div>
              <div className="ReferEarn_StepIconCircle">
                <MdShare />
              </div>
              <h4 className="ReferEarn_StepTitle">Share</h4>
              <p className="ReferEarn_StepDesc">
                Share your referral link with your friends
              </p>
            </div>

            <div className="ReferEarn_StepArrow">
              <MdArrowForward />
            </div>

            <div className="ReferEarn_StepItem">
              <div className="ReferEarn_StepBadge">2</div>
              <div className="ReferEarn_StepIconCircle">
                <MdShoppingBag />
              </div>
              <h4 className="ReferEarn_StepTitle">They Shop</h4>
              <p className="ReferEarn_StepDesc">
                Your friend places their first order
              </p>
            </div>

            <div className="ReferEarn_StepArrow">
              <MdArrowForward />
            </div>

            <div className="ReferEarn_StepItem">
              <div className="ReferEarn_StepBadge">3</div>
              <div className="ReferEarn_StepIconCircle">
                <MdCardGiftcard />
              </div>
              <h4 className="ReferEarn_StepTitle">You Earn</h4>
              <p className="ReferEarn_StepDesc">
                You earn rewards on their successful purchase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Layout */}
      <div className="ReferEarn_BottomGrid">
        {/* Left Column: Your Referrals Table Card */}
        <div className="ReferEarn_Card ReferEarn_TableCard">
          <h3 className="ReferEarn_SectionTitle">Your Referrals</h3>

          <div className="ReferEarn_TableContainer">
            <table className="ReferEarn_Table">
              <thead>
                <tr>
                  <th>FRIEND</th>
                  <th>JOINED ON</th>
                  <th>FIRST ORDER</th>
                  <th>ORDER VALUE</th>
                  <th>YOUR EARNINGS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="ReferEarn_FriendCell">
                        <div
                          className="ReferEarn_Avatar"
                          style={{
                            backgroundColor: item.avatarBg,
                            color: item.initialColor,
                          }}
                        >
                          {item.initial}
                        </div>
                        <div className="ReferEarn_FriendInfo">
                          <span className="ReferEarn_FriendName">
                            {item.name}
                          </span>
                          <span className="ReferEarn_FriendEmail">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="ReferEarn_TdText">{item.joinedOn}</td>
                    <td className="ReferEarn_TdText">{item.firstOrder}</td>
                    <td className="ReferEarn_TdText">{item.orderValue}</td>
                    <td className="ReferEarn_TdEarning">{item.earnings}</td>
                    <td>
                      <span
                        className={`ReferEarn_StatusBadge ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ReferEarn_TableFooter">
            <button
              className="ReferEarn_ViewLinkBtn"
              onClick={() => alert("Showing all referrals")}
            >
              <span>View All Referrals</span>
              <MdArrowForward />
            </button>
          </div>
        </div>

        {/* Right Column: Available Balance & Rewards Card */}
        <div className="ReferEarn_Card ReferEarn_RewardsCard">
          <div className="ReferEarn_BalanceSection">
            <span className="ReferEarn_BalanceLabel">Available Balance</span>
            <h2 className="ReferEarn_BalanceValue">₹ {balance}</h2>
            <span className="ReferEarn_MinRedeemText">
              Minimum ₹250 required to redeem
            </span>

            <button
              className="ReferEarn_RedeemBtn"
              onClick={handleRedeemNow}
            >
              <MdRedeem />
              <span>Redeem Now</span>
            </button>
          </div>

          <div className="ReferEarn_RewardsSection">
            <h4 className="ReferEarn_RewardsTitle">Rewards You Can Get</h4>

            <div className="ReferEarn_RewardsList">
              {rewardsList.map((reward) => (
                <div key={reward.id} className="ReferEarn_RewardItem">
                  <div className="ReferEarn_RewardLeft">
                    <div className="ReferEarn_CouponIcon">
                      <MdConfirmationNumber />
                    </div>
                    <div className="ReferEarn_RewardInfo">
                      <h5 className="ReferEarn_RewardName">{reward.title}</h5>
                      <span className="ReferEarn_RewardMin">
                        {reward.minOrder}
                      </span>
                    </div>
                  </div>

                  <div className="ReferEarn_RewardPoints">
                    <span>{reward.points}</span>
                    <div className="ReferEarn_CoinDot" />
                  </div>
                </div>
              ))}
            </div>

            <div className="ReferEarn_RewardsFooter">
              <button
                className="ReferEarn_ViewLinkBtn"
                onClick={() => alert("Showing all rewards")}
              >
                <span>View All Rewards</span>
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;