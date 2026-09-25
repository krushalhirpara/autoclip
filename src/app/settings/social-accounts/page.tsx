import React from "react";
import { Video, Image, MessageCircle, Briefcase, Users, Link, Unlink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLATFORMS = [
  { id: "YOUTUBE", name: "YouTube", icon: Video, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
  { id: "INSTAGRAM", name: "Instagram", icon: Image, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10" },
  { id: "TIKTOK", name: "TikTok", icon: null, color: "text-black dark:text-white", bg: "bg-gray-100 dark:bg-gray-800" }, // standard lucide doesn't have tiktok
  { id: "FACEBOOK", name: "Facebook", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-600/10" },
  { id: "LINKEDIN", name: "LinkedIn", icon: Briefcase, color: "text-blue-700", bg: "bg-blue-50 dark:bg-blue-700/10" },
  { id: "X", name: "X (Twitter)", icon: MessageCircle, color: "text-blue-400", bg: "bg-blue-50 dark:bg-blue-400/10" },
];

export default function SocialAccountsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111118] dark:text-white">Social Accounts</h1>
        <p className="text-[#6B6B78] dark:text-[#A1A1AA] mt-2">
          Connect your social media profiles using OAuth. Passwords are never stored. Connection requires valid API credentials in the backend environment.
        </p>
      </div>

      <div className="mb-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 p-4 flex gap-3 text-amber-800 dark:text-amber-200">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p className="text-sm">
          <strong>API Credentials Required:</strong> Connection unavailable until API credentials (Client ID and Secret) for each respective platform are configured in your environment variables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.id} className="flex items-center justify-between p-5 rounded-2xl border border-[#E8E7F0] dark:border-[#27272A] bg-white dark:bg-[#141416]">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platform.bg}`}>
                  {Icon ? <Icon className={`w-6 h-6 ${platform.color}`} /> : <div className={`w-6 h-6 font-bold flex items-center justify-center ${platform.color}`}>t</div>}
                </div>
                <div>
                  <h3 className="font-bold text-[#111118] dark:text-white">{platform.name}</h3>
                  <p className="text-xs text-[#6B6B78] dark:text-[#A1A1AA]">Not connected</p>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="rounded-full border-[#DCD9E8] dark:border-[#27272A]" disabled>
                <Link className="w-4 h-4 mr-2" /> Connect
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
