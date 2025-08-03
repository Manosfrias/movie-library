/**
 * Mock utilities for Next.js cookies in tests
 */
export const mockCookies = () => {
  const store = new Map<string, string>();

  return {
    get: (name: string) => {
      const value = store.get(name);
      return value ? { value } : undefined;
    },
    set: (name: string, value: string) => {
      store.set(name, value);
    },
    delete: (name: string) => {
      store.delete(name);
    },
    clear: () => {
      store.clear();
    },
  };
};

export const mockNextjsCookies = () => {
  const cookieStore = mockCookies();
  
  return {
    cookies: () => cookieStore,
    revalidatePath: () => {},
  };
};
