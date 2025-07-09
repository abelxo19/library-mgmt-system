export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const hasRole = (roles: string[]) => {
  // Mock: user has 'admin' role
  const userRole = localStorage.getItem('role') || 'admin';
  return roles.includes(userRole);
}; 