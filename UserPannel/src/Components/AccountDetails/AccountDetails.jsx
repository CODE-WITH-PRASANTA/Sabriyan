import React, { useState, useRef } from 'react';
import './AccountDetails.css';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiLock, 
  FiCamera, 
  FiShield, 
  FiX, 
  FiEye, 
  FiEyeOff,
  FiCheckCircle
} from 'react-icons/fi';

const AccountDetails = () => {
  // Profile Form States
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    dob: '1995-04-15'
  });

  // Avatar State
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef(null);

  // Modals & Alert
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Password Form States
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // 2FA Security Toggle State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2800);
  };

  // Image Upload Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        showToast('Profile photo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Profile Field Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Personal Details Handler
  const handleSaveDetails = (e) => {
    e.preventDefault();
    if (!profileData.fullName || !profileData.email || !profileData.phone) {
      showToast('Please fill in all required fields.');
      return;
    }
    showToast('Account details saved successfully!');
  };

  // Save Password Change
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }
    showToast('Password changed successfully!');
    setPasswordModalOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="account-details-wrapper">
      {/* Toast Notification */}
      {toastMessage && <div className="account-toast">{toastMessage}</div>}

      {/* Main Header */}
      <div className="account-header">
        <div className="account-header-icon-box">
          <FiUser className="account-header-icon" />
        </div>
        <div className="account-header-text">
          <h1 className="account-main-title">Account Details</h1>
          <p className="account-sub-title">
            Manage your personal information and account settings. <span className="heart-emoji">❤️</span>
          </p>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="account-card">
        {/* Personal Information Subheader */}
        <div className="account-section-header">
          <div className="account-section-icon-box">
            <FiUser className="account-section-icon" />
          </div>
          <div>
            <h2 className="account-section-title">Personal Information</h2>
            <p className="account-section-subtitle">Update your personal details and profile information.</p>
          </div>
        </div>

        {/* Content Layout (Form + Avatar) */}
        <div className="account-content-grid">
          {/* Left Form Column */}
          <div className="account-form-column">
            {/* Full Name */}
            <div className="account-form-group">
              <label className="account-field-label">
                <span className="account-field-icon-box"><FiUser /></span>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="account-input"
                value={profileData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>

            {/* Email Address */}
            <div className="account-form-group">
              <label className="account-field-label">
                <span className="account-field-icon-box"><FiMail /></span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="account-input"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>

            {/* Phone Number */}
            <div className="account-form-group">
              <label className="account-field-label">
                <span className="account-field-icon-box"><FiPhone /></span>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="account-input"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>

            {/* Date of Birth */}
            <div className="account-form-group">
              <label className="account-field-label">
                <span className="account-field-icon-box"><FiCalendar /></span>
                Date of Birth
              </label>
              <div className="account-date-input-wrapper">
                <input
                  type="date"
                  name="dob"
                  className="account-input date-input"
                  value={profileData.dob}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Right Avatar Column */}
          <div className="account-avatar-column">
            <div className="account-avatar-wrapper">
              <div className="account-avatar-circle">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="User Avatar" className="account-avatar-img" />
                ) : (
                  <div className="account-avatar-silhouette">
                    <div className="silhouette-head"></div>
                    <div className="silhouette-body"></div>
                  </div>
                )}
              </div>
              <button 
                type="button" 
                className="account-camera-badge"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                title="Upload new photo"
              >
                <FiCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </div>

            <button 
              type="button" 
              className="account-change-photo-btn"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              Change Photo
            </button>
            <p className="account-avatar-note">JPG, PNG or WEBP.<br />Max size of 2MB.</p>
          </div>
        </div>

        {/* Dual Actions Row: Save Details (Left) & Change Password (Right) */}
        <div className="account-action-buttons-row">
          <button
            type="button"
            className="account-save-details-btn"
            onClick={handleSaveDetails}
          >
            <FiCheckCircle className="btn-icon-svg" /> Save Details
          </button>
          
          <button
            type="button"
            className="account-change-password-btn"
            onClick={() => setPasswordModalOpen(true)}
          >
            <FiLock className="btn-icon-svg" /> Change Password
          </button>
        </div>
      </div>

      {/* Bottom Security Banner */}
      <div className="account-security-banner">
        <div className="account-security-left">
          <div className="account-shield-box">
            <FiShield className="account-shield-icon" />
          </div>
          <div className="account-security-text">
            <h4 className="security-title">Keep your account secure</h4>
            <p className="security-subtitle">We recommend using a strong password and updating it regularly.</p>
          </div>
        </div>

        <button 
          type="button" 
          className="account-security-settings-btn"
          onClick={() => setSecurityModalOpen(true)}
        >
          <FiLock className="security-btn-icon" /> Security Settings
        </button>
      </div>

      {/* ================= Change Password Modal ================= */}
      {passwordModalOpen && (
        <div className="account-modal-overlay" onClick={() => setPasswordModalOpen(false)}>
          <div className="account-modal" onClick={(e) => e.stopPropagation()}>
            <div className="account-modal-header">
              <div className="modal-title-group">
                <span className="modal-badge">Security</span>
                <h3>Update Password</h3>
              </div>
              <button className="account-modal-close" onClick={() => setPasswordModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="account-modal-form">
              <div className="account-modal-group">
                <label>Current Password</label>
                <div className="account-pass-input-wrapper">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="pass-visibility-toggle"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                  >
                    {showCurrentPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="account-modal-group">
                <label>New Password</label>
                <div className="account-pass-input-wrapper">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    placeholder="Minimum 6 characters"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="pass-visibility-toggle"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="account-modal-group">
                <label>Confirm New Password</label>
                <div className="account-pass-input-wrapper">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    required
                    placeholder="Re-enter new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="pass-visibility-toggle"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="account-modal-actions">
                <button
                  type="button"
                  className="modal-btn cancel"
                  onClick={() => setPasswordModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-btn submit">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Security Settings Modal ================= */}
      {securityModalOpen && (
        <div className="account-modal-overlay" onClick={() => setSecurityModalOpen(false)}>
          <div className="account-modal" onClick={(e) => e.stopPropagation()}>
            <div className="account-modal-header">
              <div className="modal-title-group">
                <span className="modal-badge">Privacy</span>
                <h3>Security Settings</h3>
              </div>
              <button className="account-modal-close" onClick={() => setSecurityModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="security-toggles-list">
              <div className="security-toggle-item">
                <div>
                  <h4>Two-Factor Authentication (2FA)</h4>
                  <p>Add an extra layer of security to your account.</p>
                </div>
                <label className="account-switch">
                  <input 
                    type="checkbox" 
                    checked={twoFactorEnabled} 
                    onChange={(e) => {
                      setTwoFactorEnabled(e.target.checked);
                      showToast(e.target.checked ? '2FA Enabled' : '2FA Disabled');
                    }} 
                  />
                  <span className="account-slider"></span>
                </label>
              </div>

              <div className="security-toggle-item">
                <div>
                  <h4>Login Activity Alerts</h4>
                  <p>Get notified when a new device logs into your profile.</p>
                </div>
                <label className="account-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="account-slider"></span>
                </label>
              </div>
            </div>

            <div className="account-modal-actions">
              <button
                type="button"
                className="modal-btn submit full-width"
                onClick={() => setSecurityModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;