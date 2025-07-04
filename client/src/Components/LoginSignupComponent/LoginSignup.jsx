// import React, { useState } from 'react';
// import '../../CSS/LoginSignup.css';
// import user_icon from '../../Assests/person.png';
// import email_icon from '../../Assests/email.png';
// import password_icon from '../../Assests/password.png';
// import eye_open_icon from '../../Assests/eye_open.png';
// import eye_closed_icon from '../../Assests/eye_closed.png';
// import confirm_password_icon from '../../Assests/confirmpassword.png';
// import authService from '../../API/authService';

// const LoginSignup = () => {
//     const [action, setAction] = useState("Login");
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     return (
//         <div className='container'>
//             <div className='header'>
//                 <div className='text'>{action}</div>
//                 <div className="underline"> </div>
//             </div>
//             <div className="inputs">
//                 {action === "Login" ? <div></div> : <div className="input">
//                     <img src={user_icon} alt="" />
//                     <input type="text" placeholder="User Name" />
//                 </div>}

//                 <div className="input">
//                     <img src={email_icon} alt="" />
//                     <input type="email" placeholder="Email Id" />
//                 </div>

//                 <div className="input">
//                     <img src={password_icon} alt="" />
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                     />
//                     <img
//                         src={showPassword ? eye_open_icon : eye_closed_icon}
//                         alt="Toggle Password Visibility"
//                         className="eye-icon"
//                         onClick={togglePasswordVisibility}
//                     />
//                 </div>

//                 {action === "Login" ? <div></div> : (
//                     <div className="input">
//                         <img src={confirm_password_icon} alt="" />
//                         <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             placeholder="Confirm Password"
//                         />
//                         <img
//                             src={showConfirmPassword ? eye_open_icon : eye_closed_icon}
//                             alt="Toggle Confirm Password Visibility"
//                             className="eye-icon"
//                             onClick={toggleConfirmPasswordVisibility}
//                         />
//                     </div>
//                 )}
//             </div>
//             {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Click here!</span></div>}
//             <div className="submit-container">
//                 <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
//                 <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
//             </div>
//         </div>
//     );
// };

// export default LoginSignup;

import React, { useState } from 'react';
import '../../CSS/LoginSignup.css';
import user_icon from '../../Assests/person.png';
import email_icon from '../../Assests/email.png';
import password_icon from '../../Assests/password.png';
import eye_open_icon from '../../Assests/eye_open.png';
import eye_closed_icon from '../../Assests/eye_closed.png';
import confirm_password_icon from '../../Assests/confirmpassword.png';
import authService from '../../API/authService';

const LoginSignup = ({ onLoginSuccess }) => {
    const [action, setAction] = useState("Login");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loggername, setLoggername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [loggerpwd, setLoggerpwd] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [signupSuccessMessage, setSignupSuccessMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async () => {
        setErrorMessage('');
        setSignupSuccessMessage('');
        try {
            if (action === "Sign Up") {
                await authService.register(loggername, email, loggerpwd, confirmPassword);
                setSignupSuccessMessage('Sign Up Successfully! Please Login.');
                setAction("Login");
                resetForm();
            } else { 
                await authService.login(email, loggerpwd); 
                onLoginSuccess();
            }
        } catch (error) {
            console.error("Authentication error:", error);
            setErrorMessage(error.message);
        }
    };

    const resetForm = () => {
        setLoggername('');
        setEmail('');
        setLoggerpwd('');
        setConfirmPassword('');
        setErrorMessage('');
        setSignupSuccessMessage('');
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <div className='login-signup-page-container-background'>
        <div className='loginsignupcontainer'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className="underline"> </div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input
                            type="text"
                            placeholder="User Name"
                            value={loggername}
                            onChange={(e) => setLoggername(e.target.value)}
                            required={action === "Sign Up"}
                        />
                    </div>
                )}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input
                        type="email" 
                        placeholder="Email Id" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={loggerpwd}
                        onChange={(e) => setLoggerpwd(e.target.value)}
                        required
                    />
                    <img
                        src={showPassword ? eye_open_icon : eye_closed_icon}
                        alt="Toggle Password Visibility"
                        className="eye-icon"
                        onClick={togglePasswordVisibility}
                    />
                </div>

                {action === "Login" ? null : (
                    <div className="input">
                        <img src={confirm_password_icon} alt="" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={action === "Sign Up"}
                        />
                        <img
                            src={showConfirmPassword ? eye_open_icon : eye_closed_icon}
                            alt="Toggle Confirm Password Visibility"
                            className="eye-icon"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    </div>
                )}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {signupSuccessMessage && <div className="success-message">{signupSuccessMessage}</div>}

            {action === "Sign Up" ? null : <div className="forgot-password">Lost Password? <span>Click here!</span></div>}
            <div className="submit-container">
                {action === "Login" ? (
                    <>
                        <div className="submit gray" onClick={() => { setAction("Sign Up"); resetForm(); }}>
                            Sign Up
                        </div>
                        <div className="submit" onClick={handleSubmit}>
                            Login
                        </div>
                    </>
                ) : (
                    <>
                        <div className="submit gray" onClick={() => { setAction("Login"); resetForm(); }}>
                            Login
                        </div>
                        <div className="submit" onClick={handleSubmit}>
                            Sign Up
                        </div>
                    </>
                )}
            </div>
        </div>
        </div>
    );
};

export default LoginSignup;
