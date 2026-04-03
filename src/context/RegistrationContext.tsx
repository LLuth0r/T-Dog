import React, { createContext, useContext, useState, useCallback } from 'react';

export interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
}

interface RegistrationContextValue {
    /** Registration form data from the completed registration step */
    registrationData: RegistrationData | null;
    /** Session token received from the backend after successful registration */
    sessionToken: string | null;
    /** Store registration data and session token after successful backend registration */
    completeRegistration: (data: RegistrationData, token: string) => void;
    /** Clear registration state (e.g. after payment completes or on timeout) */
    clearRegistration: () => void;
    /** Whether the user has completed registration and is authorized for payment */
    isRegistered: boolean;
}

const RegistrationContext = createContext<RegistrationContextValue | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    const completeRegistration = useCallback((data: RegistrationData, token: string) => {
        setRegistrationData(data);
        setSessionToken(token);
    }, []);

    const clearRegistration = useCallback(() => {
        setRegistrationData(null);
        setSessionToken(null);
    }, []);

    return (
        <RegistrationContext.Provider
            value={{
                registrationData,
                sessionToken,
                completeRegistration,
                clearRegistration,
                isRegistered: registrationData !== null && sessionToken !== null,
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
};

export const useRegistration = (): RegistrationContextValue => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error('useRegistration must be used within a RegistrationProvider');
    }
    return context;
};
