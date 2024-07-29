import React, { useState } from 'react';
import { useUser } from '../context/UserProvider';

const LoginForm = () => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('test');
    const { handleLogin } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
