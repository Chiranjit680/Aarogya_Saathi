import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
    useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, logout as apiLogout, getMe } from '../services/authService'; 

type User = {
    id: number;
    name: string;
    email: string;
    role: 'DOCTOR' | 'PATIENT' | 'ADMIN';
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getMe();
            const userData = response.data.user || response.data.data;

            setUser({
                id: userData.id,
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                role: userData.role
            });
            setError(null);
        } catch (err) {
            setUser(null);
            setError('Failed to fetch user data');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await fetchUser();
            } catch (err) {
                console.log("User is not authenticated")
                // Silent error - user is not authenticated
            }
        };
        initializeAuth();
    }, [fetchUser]);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            await apiLogin(email, password);
            await fetchUser();

            // Redirect based on role
            switch (user?.role) {
                case 'DOCTOR':
                    navigate('/doctor/dashboard');
                    break;
                case 'PATIENT':
                    navigate('/patient/dashboard');
                    break;
                case 'ADMIN':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err: any) {
            setUser(null);
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await apiLogout();
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
            setError('Failed to logout');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            logout,
            fetchUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};