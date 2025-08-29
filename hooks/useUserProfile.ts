import { useState, useCallback, useEffect } from 'react';
import { UserProfile } from '../types';

const USER_PROFILE_STORAGE_KEY = 'valuecent-user-profile';

const getStoredProfile = (): UserProfile | null => {
  try {
    const stored = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse user profile from localStorage', error);
    return null;
  }
};

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(getStoredProfile);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USER_PROFILE_STORAGE_KEY) {
        setUserProfile(getStoredProfile());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveUserProfile = useCallback((profile: UserProfile) => {
    try {
      const profileJson = JSON.stringify(profile);
      localStorage.setItem(USER_PROFILE_STORAGE_KEY, profileJson);
      setUserProfile(profile);
      // Dispatch storage event to sync other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: USER_PROFILE_STORAGE_KEY,
        newValue: profileJson,
        storageArea: localStorage,
      }));
    } catch (error) {
      console.error('Failed to save user profile to localStorage', error);
    }
  }, []);
  
  const isProfileSet = !!userProfile;

  return { userProfile, saveUserProfile, isProfileSet };
};
