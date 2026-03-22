import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const ADMIN_PASSWORD = 'admin123' // Change this to your preferred password

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = localStorage.getItem('isAdminAuthenticated')
        return saved === 'true'
    })
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('currentUser')
        return saved ? JSON.parse(saved) : null
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

    const login = (password, username = 'Admin') => {
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
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('isAdminAuthenticated')
        localStorage.removeItem('currentUser')
    }

    const loginAsGuest = (username) => {
        const userData = {
            username: username || 'Guest',
            role: 'guest',
            loginTime: new Date().toISOString()
        }
        setIsAuthenticated(true)
        setUser(userData)
        setShowLoginModal(false)
        return { success: true }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            loginAsGuest,
            showLoginModal,
            setShowLoginModal,
            isAdmin: user?.role === 'admin',
            isGuest: user?.role === 'guest'
        }}>
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