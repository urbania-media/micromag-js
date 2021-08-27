import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const defaultValue = {
    userInteracted: false
};

export const UserInteractionContext = React.createContext(defaultValue);

export const useUserInteracted = () => useContext(UserInteractionContext).userInteracted;

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

export const UserInteractionProvider = ({ children }) => {
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect( () => {
        if (userInteracted) {
            return () => {};
        }
        let setted = false;
        const set = () => {
            if (!setted) {
                setUserInteracted(true);
                setted = true;
            }
        }
        document.addEventListener('mouseup', set); 
        document.addEventListener('touchend', set); 
        document.addEventListener('pointerup', set); 

        return () => {
            document.removeEventListener('mouseup', set); 
            document.removeEventListener('touchend', set); 
            document.removeEventListener('pointerup', set); 
        }
    }, [userInteracted, setUserInteracted]);

    return <UserInteractionContext.Provider value={{userInteracted, setUserInteracted}}>{children}</UserInteractionContext.Provider>;
};

UserInteractionProvider.propTypes = propTypes;
UserInteractionProvider.defaultProps = defaultProps;