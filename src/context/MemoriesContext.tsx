import React, { createContext, useContext, useState } from 'react';

export type Memory = {
  id: string;
  imageUri: string;
  description: string;
  latitude: number;
  longitude: number;
};

type MemoriesContextType = {
  memories: Memory[];
  addMemory: (memory: Memory) => void;
};

const MemoriesContext = createContext<MemoriesContextType | undefined>(
  undefined
);

export function MemoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [memories, setMemories] = useState<Memory[]>([]);

  const addMemory = (memory: Memory) => {
    setMemories((currentMemories) => [
      memory,
      ...currentMemories,
    ]);
  };

  return (
    <MemoriesContext.Provider
      value={{
        memories,
        addMemory,
      }}
    >
      {children}
    </MemoriesContext.Provider>
  );
}

export function useMemories() {
  const context = useContext(MemoriesContext);

  if (!context) {
    throw new Error(
      'useMemories must be used inside MemoriesProvider'
    );
  }

  return context;
}