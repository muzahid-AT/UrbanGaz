/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import "./Login.css";
import logo from "../assets/Images/brand-logo.png"; // put any logo svg/png there



const Login = () => {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [remember, setRemember] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // TODO: call API here
        console.log({ email, pwd, remember });
    };

    
    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <img src={logo} alt="BrandCrowd" className="brand-logo" />
                <h1 className="auth-title">Login</h1>

                <form onSubmit={submit} className="auth-form">
                    {/* Email */}
                    <label className="input-wrap">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className="right-icon" aria-hidden>
                            {/* user icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M20.5 21a8.5 8.5 0 0 0-17 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </span>
                    </label>

                    {/* Password */}
                    <label className="input-wrap">
                        <input
                            type={showPwd ? "text" : "password"}
                            placeholder="Password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="right-icon btn-icon"
                            onClick={() => setShowPwd((s) => !s)}
                            aria-label={showPwd ? "Hide password" : "Show password"}
                        >
                            {/* eye / eye-off */}
                            {showPwd ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
                                    <path d="M10.6 10.6a3 3 0 1 0 4.24 4.24" stroke="currentColor" strokeWidth="1.6" />
                                    <path d="M19.5 16.5C17 18.7 14.6 19.5 12 19.5S7 18.7 4.5 16.5C3.2 15.4 2.2 14.1 1.5 12c.7-2.1 1.7-3.4 3-4.5 1-1 2.2-1.7 3.5-2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M1.5 12c3.1-8 17.9-8 21 0-3.1 8-17.9 8-21 0Z" stroke="currentColor" strokeWidth="1.6" />
                                    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                                </svg>
                            )}
                        </button>
                    </label>

                    {/* Row: remember + recover */}
                    <div className="auth-row">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <span className="slider" />
                        </label>
                        <span className="remember-text">Remember me</span>

                        <a className="recover" href="#recover">Recover Password</a>
                    </div>

                    <button className="auth-btn" type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;