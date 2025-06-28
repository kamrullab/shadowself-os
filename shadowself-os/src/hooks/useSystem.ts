import { useState, useCallback } from 'react';

interface SystemState {
  isBooted: boolean;
  currentUser: string;
  systemTime: Date;
}

export const useSystem = () => {
  const [systemState, setSystemState] = useState<SystemState>({
    isBooted: false,
    currentUser: 'Kamrul',
    systemTime: new Date()
  });

  const bootSystem = useCallback(() => {
    setSystemState(prev => ({ ...prev, isBooted: true }));
  }, []);

  const updateSystemTime = useCallback(() => {
    setSystemState(prev => ({ ...prev, systemTime: new Date() }));
  }, []);

  return {
    systemState,
    bootSystem,
    updateSystemTime
  };
};