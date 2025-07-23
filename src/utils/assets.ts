// Utility function to get correct asset paths for custom domain
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // For custom domain, always use root path
  return `/${cleanPath}`;
}
