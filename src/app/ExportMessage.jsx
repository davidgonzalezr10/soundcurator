import React, { useState, useEffect } from 'react'

const ExportMessage = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('');

    useEffect(() => {
        if (message) {
            setDisplayMessage(message);
            setShouldRender(true);
            // Small delay to ensure the element is rendered before starting fade in
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        } else {
            setIsVisible(false);
            // Wait for fade out animation to complete before unmounting
            setTimeout(() => {
                setShouldRender(false);
                setDisplayMessage('');
            }, 700); // Match this with the duration-700
        }
    }, [message]);

    if (!shouldRender) return null;

    return (
        <div className={`fixed text-center  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-spoti-green text-white px-4 lg:px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {displayMessage}
        </div>
    )
}

export default ExportMessage 