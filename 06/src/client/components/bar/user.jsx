import React, { useState } from 'react';
import { useUser } from '../context/UserProvider';

const UserBar = ({ user }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { handleLogout } = useUser();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const logout = () => {
        handleLogout();
    };

    return (
        <div className="user">
            <button
                onClick={toggleDropdown}
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                aria-expanded={dropdownVisible}
                aria-label="User menu"
            >
                <img src={`${process.env.REACT_APP_BACKEND_URL}${user.user.avatar}`} alt="Avatar" />
            </button>
            {dropdownVisible && (
                <div className="dropdown-menu">
                    <ul>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>
                            <button onClick={logout} style={{ background: 'none', border: 'none', padding: 0 }}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserBar;
