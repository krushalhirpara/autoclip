#!/usr/bin/env node
/**
 * AutoClipp Admin Password Hash Generator
 * 
 * Usage:
 *   node scripts/generate-admin-hash.js "YourStrongPasswordHere"
 * 
 * Output:
 *   Prints the bcrypt hash to set in your .env as ADMIN_PASSWORD_HASH
 */

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("❌ Error: Please provide a password argument.");
  console.error("Example: node scripts/generate-admin-hash.js \"MySecureAdminPassword123!\"");
  process.exit(1);
}

if (password.length < 8) {
  console.error("❌ Error: Password must be at least 8 characters long.");
  process.exit(1);
}

console.log("Generating bcrypt hash (salt rounds: 12)...");
bcrypt.hash(password, 12, (err, hash) => {
  if (err) {
    console.error("❌ Error generating hash:", err);
    process.exit(1);
  }

  console.log("\n=======================================================");
  console.log("✅ Admin Password Hash Generated Successfully!");
  console.log("=======================================================");
  console.log(`\nADMIN_PASSWORD_HASH="${hash}"\n`);
  console.log("Add this line to your .env or Vercel Environment Variables.");
  console.log("=======================================================\n");
});
