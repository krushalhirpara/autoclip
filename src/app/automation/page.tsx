"use client";

import React, { useState } from "react";
import { Plus, Save, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AutomationPage() {
  const [platforms, setPlatforms] = useState({ youtube: true, instagram: true, tiktok: false, facebook: false });

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111118] dark:text-white">Auto Mode</h1>
          <p className="text-[#6B6B78] dark:text-[#A1A1AA] mt-2">
            Create rules to fully automate your content pipeline.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E8E7F0] bg-white p-8 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
        <div className="mb-8">
          <label className="block text-sm font-bold text-[#111118] dark:text-white mb-2">Automation Name</label>
          <input 
            type="text" 
            defaultValue="My YouTube Shorts Machine"
            className="w-full rounded-xl border border-[#E8E7F0] dark:border-[#27272A] bg-transparent px-4 py-2 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B6B78] dark:text-[#A1A1AA] mb-4 border-b border-[#E8E7F0] dark:border-[#27272A] pb-2">Trigger</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Source Channel</label>
                  <select className="w-full rounded-xl border border-[#E8E7F0] dark:border-[#27272A] bg-transparent px-4 py-2 font-medium">
                    <option>YouTube: My Main Channel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Trigger Event</label>
                  <select className="w-full rounded-xl border border-[#E8E7F0] dark:border-[#27272A] bg-transparent px-4 py-2 font-medium">
                    <option>New video uploaded</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B6B78] dark:text-[#A1A1AA] mb-4 border-b border-[#E8E7F0] dark:border-[#27272A] pb-2">AI Processing Action</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Generate Clips</span>
                  <select className="rounded-lg border border-[#E8E7F0] dark:border-[#27272A] bg-transparent px-2 py-1 text-sm">
                    <option>5 clips</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Reframe</span>
                  <select className="rounded-lg border border-[#E8E7F0] dark:border-[#27272A] bg-transparent px-2 py-1 text-sm">
                    <option>9:16 Vertical</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">AI Captions</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">AI Title & Desc</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B6B78] dark:text-[#A1A1AA] mb-4 border-b border-[#E8E7F0] dark:border-[#27272A] pb-2">Publishing</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Auto-Approve Clips</span>
                  <input type="checkbox" className="rounded border-gray-300" />
                </div>
                <p className="text-xs text-[#6B6B78]">If unchecked, clips wait in Ready state for manual approval.</p>
              </div>

              <div className="space-y-2 mb-6">
                <span className="block text-sm font-semibold mb-1">Target Platforms</span>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={platforms.youtube} onChange={e=>setPlatforms({...platforms, youtube: e.target.checked})} /> YouTube Shorts</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={platforms.instagram} onChange={e=>setPlatforms({...platforms, instagram: e.target.checked})} /> Instagram Reels</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={platforms.tiktok} onChange={e=>setPlatforms({...platforms, tiktok: e.target.checked})} /> TikTok</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={platforms.facebook} onChange={e=>setPlatforms({...platforms, facebook: e.target.checked})} /> Facebook</label>
              </div>

              <div>
                <span className="block text-sm font-semibold mb-1">Schedule Slots</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium">09:00 AM</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium">01:00 PM</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium">06:00 PM</span>
                  <button className="px-3 py-1 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-sm text-gray-500">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8E7F0] dark:border-[#27272A] flex justify-end">
          <Button className="bg-[#7C5CFC] text-white hover:bg-[#6A4BE5]">
            <Save className="w-4 h-4 mr-2" /> Save Automation
          </Button>
        </div>
      </div>
    </div>
  );
}
