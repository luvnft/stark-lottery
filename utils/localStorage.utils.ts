export const getItemFromLocal = (name: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name) as string)
    : null;
};

export const saveItemToLocal = (name: string, data: any) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(name, JSON.stringify(data));
};

export const removeItemFromLocal = (name: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(name);
};
