import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase/client";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  onboardingComplete?: boolean;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  updateProfile: (firstName: string, lastName: string, onboardingComplete: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      if (!data) {
        console.error("No profile data returned");
        return null;
      }

      const authUser = await supabase.auth.getUser();
      if (!authUser.data.user) {
        console.error("No auth user found");
        return null;
      }

      return {
        id: data.id,
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        email: authUser.data.user.email ?? "",
        onboardingComplete: data.onboarding_complete,
        isPremium: data.is_premium,
      };
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      return null;
    }
  };

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user && !session.user.is_anonymous) {
        // real account
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      } else {
        // guest or no session
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const profile = await fetchUserProfile(data.user.id);
      setUser(profile);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const profile = await fetchUserProfile(data.user.id);
      setUser(profile);
    }
  };

  const signInAsGuest = async () => {
    
  };

  const updateProfile = async (firstName: string, lastName: string, onboardingComplete: boolean) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) throw new Error("No user found");

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: authUser.id,
        first_name: firstName,
        last_name: lastName,
        onboarding_complete: onboardingComplete,
      });

    if (error) throw error;

    const profile = await fetchUserProfile(authUser.id);
    setUser(profile);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signInAsGuest, updateProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Must be inside the provider");
  }
  return context;
};