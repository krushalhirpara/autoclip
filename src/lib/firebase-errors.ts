export function getFriendlyAuthErrorMessage(error: any, defaultProviderName?: string): string {
  if (!error) return "An unexpected error occurred. Please try again.";

  const code = error.code || "";
  const message = error.message || "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/popup-closed-by-user":
      return defaultProviderName
        ? `${defaultProviderName} sign-in was cancelled.`
        : "Sign-in was cancelled.";
    case "auth/cancelled-popup-request":
      return "Another authentication process is already in progress.";
    case "auth/popup-blocked":
      return "The sign-in popup was blocked by your browser. Please allow popups for this site.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase Console. Please add it to Authorized Domains.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet connection and try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a few minutes before trying again.";
    case "auth/user-disabled":
      return "This user account has been disabled. Please contact support.";
    case "auth/operation-not-allowed":
      return `${defaultProviderName || "This"} sign-in method is not enabled in Firebase Console.`;
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    default:
      if (message.includes("network") || message.includes("Failed to fetch")) {
        return "Network error. Please verify your connection.";
      }
      return "Something went wrong. Please try again.";
  }
}
