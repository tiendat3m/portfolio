import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

const parseStoredValue = (value) => {
    try {
        return value ? JSON.parse(value) : null
    } catch {
        return null
    }
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = localStorage.getItem('isAdminAuthenticated')
        return saved === 'true'
    })
    const [user, setUser] = useState(() => {
        return parseStoredValue(localStorage.getItem('currentUser'))
    })
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        localStorage.setItem('isAdminAuthenticated', isAuthenticated)
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
        } else {
            localStorage.removeItem('currentUser')
        }
    }, [isAuthenticated, user])

    const login = useCallback((password, username = 'Admin') => {
        if (!ADMIN_PASSWORD) {
            return { success: false, error: 'Admin login is not configured' }
        }

        if (password === ADMIN_PASSWORD) {
            const userData = {
                username,
                role: 'admin',
                loginTime: new Date().toISOString()
            }
            setIsAuthenticated(true)
            setUser(userData)
            setShowLoginModal(false)
            return { success: true }
        }
        return { success: false, error: 'Invalid password' }
    }, [])

    const logout = useCallback(() => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('isAdminAuthenticated')
        localStorage.removeItem('currentUser')
    }, [])

    const loginAsGuest = useCallback((username) => {
        const userData = {
            username: username || 'Guest',
            role: 'guest',
            loginTime: new Date().toISOString()
        }
        setIsAuthenticated(true)
        setUser(userData)
        setShowLoginModal(false)
        return { success: true }
    }, [])

    const contextValue = useMemo(
        () => ({
            isAuthenticated,
            user,
            login,
            logout,
            loginAsGuest,
            showLoginModal,
            setShowLoginModal,
            isAdmin: user?.role === 'admin',
            isGuest: user?.role === 'guest'
        }),
        [isAuthenticated, user, login, logout, loginAsGuest, showLoginModal]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
