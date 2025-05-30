import React, { useState, useEffect } from 'react'

const ExportMessage = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('');

    useEffect(() => {
        console.log('🔍 ExportMessage received message:', message);
        
        if (message) {
            // INCOMING MESSAGE - Show it
            setDisplayMessage(message);
            setShouldRender(true);
            // Small delay to ensure the element is rendered before starting fade in
            setTimeout(() => {
                console.log('🔍 Starting fade IN animation');
                setIsVisible(true);
            }, 10);
            
        } else if (displayMessage) {
            // CLEARING MESSAGE - Only run fade-out if we actually have a message to clear
            console.log('🔍 Starting fade OUT animation');
            setIsVisible(false);
            // Wait for fade out animation to complete before unmounting
            setTimeout(() => {
                console.log('🔍 Fade out complete, unmounting');
                setShouldRender(false);
                setDisplayMessage('');
            }, 700); // Match this with the duration-700
        }
    }, [message]); // Remove displayMessage from dependency to avoid loops

    if (!shouldRender) return null;

    return (
        <div className={`fixed text-center  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-spoti-green text-white px-4 lg:px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {displayMessage}
        </div>
    )
}

export default ExportMessage 