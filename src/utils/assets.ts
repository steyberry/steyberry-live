// Utility function to get correct asset paths for both development and production
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, prepend the base URL
  if (import.meta.env.PROD) {
    return `/steyberry-live/${cleanPath}`;
  }
  
  // In development, use the path as-is
  return `/${cleanPath}`;
}
