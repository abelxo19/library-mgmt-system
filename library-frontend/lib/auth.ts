// Simple auth utilities
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token)
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken')
  }
}

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null
}

export const getUserRole = (): string => {
  // In a real app, you'd decode the JWT token to get user role
  // For now, return a default role
  return 'librarian'
}

export const hasPermission = (permission: string): boolean => {
  const role = getUserRole()
  
  // Simple permission check - in real app, you'd have a more sophisticated system
  const permissions = {
    librarian: ['read:books', 'write:books', 'read:members', 'write:members', 'read:loans', 'write:loans'],
    assistant: ['read:books', 'read:members', 'read:loans', 'write:loans'],
    member: ['read:books', 'read:loans']
  }
  
  return permissions[role as keyof typeof permissions]?.includes(permission) || false
} 