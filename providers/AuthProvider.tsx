import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

type AuthContextType = {
    session: any;
    user: any;
    // profile: any;
    isAnonymous: boolean; // Added to track anonymous user status
    signInUser: (phone: string, callback: VoidFunction) => void;
    verifyUser: (email: string, token: string) => Promise<string>;
    signOut: () => void;
    // updateProfile: (userData: any) => Promise<void>;
    convertAnonymousToAccount: (email: string) => Promise<{ status: 'new' | 'otp' | 'error'; message?: string }>
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    // const [profile, setProfile] = useState<any>(null);
    const [isAnonymous, setIsAnonymous] = useState<boolean>(false); // Track anonymous status
    const [loading, setLoading] = useState(true); // Start with loading true for initial auth

    // Initialize auth state and sign in anonymously
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Check for existing session
                const { data: { session: currentSession } } = await supabase.auth.getSession();
                if (currentSession) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                    setIsAnonymous(currentSession.user?.is_anonymous || false);
                    // await getUserProfile(currentSession.user?.id);
                } else {
                    // Sign in anonymously if no session exists
                    const { data, error } = await supabase.auth.signInAnonymously();
                    if (error) {
                        console.error('Anonymous sign-in error:', error);
                        setLoading(false);
                        return;
                    }
                    setSession(data.session);
                    setUser(data.user);
                    setIsAnonymous(true);
                    // await getUserProfile(data.user?.id);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth event:', event);
            if (event === 'INITIAL_SESSION') {
                // Handled in useEffect
            } else if (event === 'SIGNED_IN') {
                setSession(session);
                setUser(session?.user || null);
                setIsAnonymous(session?.user?.is_anonymous || false);
                // getUserProfile(session?.user?.id);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                // setProfile(null);
                setSession(null);
                setIsAnonymous(false);
                router.navigate('/');
            } else if (event === 'USER_UPDATED') {
                setSession(session);
                setUser(session?.user || null);
            }
        });

        // Cleanup listener on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // // Fetch user profile from profiles table
    // const getUserProfile = async (userId: string | undefined) => {
    //     if (!userId) return;
    //     try {
    //         const { data: userProfile, error } = await supabase
    //             .from('profiles')
    //             .select()
    //             .eq('id', userId)
    //             .single();

    //         if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
    //             console.error('Profile fetch error:', error);
    //         }
    //         setProfile(userProfile || null);
    //     } catch (error) {
    //         console.error('Profile fetch error:', error);
    //     }
    // };

    // Sign in with phone OTP (for new or anonymous users)
    async function signInUser(phone: string, callback: VoidFunction) {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                phone,
            });
            if (error) {
                console.error('Phone OTP sign-in error:', error);
                throw error;
            }
            callback();
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    }

    // Verify phone OTP and convert anonymous user if needed
    async function verifyUser(email: string, token: string): Promise<string> {
        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token,
                type: 'email'
            })

            if (error) {
                throw new Error(error.message);
            }
            if (data?.session && data?.user) {
                setSession(data.session);
                setUser(data.user);
                setIsAnonymous(data.user.is_anonymous || false);
                return 'Success';
            }
            throw new Error('No session or user data returned');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.error('Verification error:', error);
            return errorMessage;
        }
    }

    // Convert anonymous user to a registered account
    async function convertAnonymousToAccount(email: string): Promise<{ status: 'new' | 'otp' | 'error'; message?: string }> {
        try {
            if (!isAnonymous) {
                return { status: 'error', message: 'User is not anonymous' };
            }

            // Attempt to update the anonymous user's email
            const { data: updateData, error: updateError } = await supabase.auth.updateUser({
                email,
            });

            if (updateError) {
                // Check if the error indicates an existing email
                if (updateError.message.includes('already been registered')) {
                    // Email exists, trigger OTP for sign-in
                    const { error: signInError } = await supabase.auth.signInWithOtp({
                        email,
                        options: { shouldCreateUser: false }, // Don't create a new user
                    });
                    if (signInError) {
                        return { status: 'error', message: `Failed to send OTP: ${signInError.message}` };
                    }
                    return { status: 'otp', message: 'OTP sent to existing email. Please verify.' };
                }
                return { status: 'error', message: `Update error: ${updateError.message}` };
            }

            // Email updated successfully, new user needs to confirm email
            console.log('Email updated:', updateData);
            return { status: 'new', message: 'Email confirmation sent. Please check your inbox.' };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.error('Convert account error:', error);
            return { status: 'error', message: `Error: ${errorMessage}` };
        }
    }

    // Sign out user
    async function signOut() {
        try {
            await supabase.auth.signOut();
            // After sign-out, sign back in anonymously
            const { data, error } = await supabase.auth.signInAnonymously();
            if (error) {
                console.error('Anonymous sign-in after sign-out error:', error);
                return;
            }
            setSession(data.session);
            setUser(data.user);
            setIsAnonymous(true);
            // await getUserProfile(data.user?.id);
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    }

    // Update user profile
    // async function updateProfile(userData: any) {
    //     try {
    //         const { data, error } = await supabase
    //             .from('profiles')
    //             .upsert({ ...userData, id: user.id }) // Use upsert to create or update
    //             .eq('id', user.id)
    //             .select()
    //             .single();
    //         if (error) {
    //             console.error('Profile update error:', error);
    //             throw error;
    //         }
    //         console.log('Profile updated:', data);
    //         setProfile(data);
    //     } catch (error) {
    //         console.error('Profile update error:', error);
    //     }
    // }

    const value: AuthContextType = {
        session,
        user,
        // profile,
        isAnonymous, // Expose anonymous status
        signInUser,
        verifyUser,
        signOut,
        convertAnonymousToAccount, // New function
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}