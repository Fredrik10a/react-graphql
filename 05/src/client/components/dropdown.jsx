import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ trigger, children }) => {
    const [show, setShow] = useState(false);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    const handleClick = () => {
        const state = !show;
        setShow(state);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
        if (
            contentRef.current &&
            !contentRef.current.contains(event.target) &&
            triggerRef.current &&
            !triggerRef.current.contains(event.target)
        ) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown">
            <div
                className="trigger"
                role="button"
                aria-haspopup="true"
                aria-expanded={show}
                tabIndex="0"
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                ref={triggerRef}
            >
                {trigger}
            </div>
            {show && (
                <div ref={contentRef} className="content" role="menu" aria-hidden={!show}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
