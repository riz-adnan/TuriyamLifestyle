import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Components from './Components';

const Loginuser = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();

            if (json.success) {
                // Save the auth token and user data in local storage
                localStorage.setItem('cust', json.authtoken);
                localStorage.setItem('username', json.user.name);
                localStorage.setItem('useraddress', json.user.address);
                localStorage.setItem('userphone', json.user.phone);
                localStorage.setItem('userid', json.user._id);
                navigate('/');
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
           
            alert("Error logging in. Please try again later.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const [signcredentials, setsignCredentials] = useState({ name:"",email: "", password: "",phone:"",address:"" });
    const onsignChange = (e) => {
        setsignCredentials({ ...signcredentials, [e.target.name]: e.target.value });
    };
    const handlesignSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await fetch("/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signcredentials)
            });

            const json = await response.json();

            if (json.success) {
                // Save the auth token and user data in local storage
                localStorage.setItem('cust', json.authtoken);
                localStorage.setItem('username', json.user.name);
                localStorage.setItem('useraddress', json.user.address);
                localStorage.setItem('userphone', json.user.phone);
                localStorage.setItem('userid', json.user._id);
                navigate('/');
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            
            alert("Error signing up. Please try again later.");
        }
    };

    const [signIn, toggle] = React.useState(true);

    return (
        <div style={{ backdropFilter: "blur(4px)"}}>
            <div style={{ paddingTop: "100px",paddingBottom:"100%" ,display: "flex", justifyContent: "center" }}>
                <Components.Container>
                    <Components.SignUpContainer signinIn={signIn}>
                        <Components.Form onSubmit={handlesignSubmit} style={{marginTop:"-35px"}}>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input type='text' placeholder='Name' name="name" onChange={onsignChange} />
                            <Components.Input type='email' placeholder='Email' name="email" onChange={onsignChange} />
                            <Components.Input type='password' placeholder='Password' name="password" onChange={onsignChange} />
                            <Components.Input type='phone' placeholder='Phone' name="phone" onChange={onsignChange} />
                            <Components.Input type='address' placeholder='Address' name="address" onChange={onsignChange} />
                            <Components.Button type="submit">Sign Up</Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleSubmit}>
                            <Components.Title>Sign in</Components.Title>
                            <Components.Input type='email' placeholder='Email' name="email" onChange={onChange} />
                            <Components.Input type='password' placeholder='Password' name="password" onChange={onChange} />
                            
                            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                            <Components.Button type="submit">Sign In</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <Components.Title>Welcome Back!</Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.Title>Hello, Friend!</Components.Title>
                                <Components.Paragraph>
                                    Enter Your personal details and start journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            </div>
        </div>
    );
};

export default Loginuser;
