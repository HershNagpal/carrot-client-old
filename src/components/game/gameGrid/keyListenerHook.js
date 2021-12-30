import { useEffect, useState } from 'react';

export const useKeyData = () => {
    const defaultKeyPressed = { key: '', disabled: false };
    const keyData = useState(defaultKeyPressed);
    const setKeyPressed = keyData[1];

    useEffect(() => {
        const processKeyDown = (event) => {
            setKeyPressed({ key: event.key, disabled: false });
        }

        document.addEventListener('keydown', processKeyDown);
    }, [setKeyPressed]);

    return keyData;
};