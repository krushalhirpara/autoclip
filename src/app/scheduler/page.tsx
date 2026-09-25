"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, Video, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoThumbnail } from "@/components/media/VideoThumbnail";

export default function SchedulerPage() {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111118] dark:text-white">Content Scheduler</h1>
          <p className="text-[#6B6B78] dark:text-[#A1A1AA] mt-2">
            Plan and automate your clip publishing across all connected platforms.
          </p>
        </div>
        <Button className="rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-white">
          <Plus className="w-4 h-4 mr-2" /> New Schedule
        </Button>
      </div>

      <div className="flex gap-4 border-b border-[#E8E7F0] dark:border-[#27272A] mb-6">
        {["calendar", "queue", "scheduled", "published", "failed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-sm font-semibold capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#7C5CFC] text-[#7C5CFC]"
                : "border-transparent text-[#6B6B78] dark:text-[#A1A1AA] hover:text-[#111118] dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "calendar" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 rounded-2xl border border-[#E8E7F0] bg-white p-6 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
            {/* Mock Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">September 2026</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Prev</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
            
            {/* Mock Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-[#E8E7F0] dark:bg-[#27272A] rounded-xl overflow-hidden border border-[#E8E7F0] dark:border-[#27272A]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="bg-[#F8F9FC] dark:bg-[#0A0A0B] p-2 text-center text-xs font-bold text-[#6B6B78] dark:text-[#A1A1AA]">
                  {day}
                </div>
              ))}
              
              {/* Fake calendar days */}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const hasPost = day === 25 || day === 28;
                return (
                  <div key={i} className="bg-white dark:bg-[#141416] p-2 min-h-[100px] border-t border-[#E8E7F0] dark:border-[#27272A]">
                    <span className="text-sm font-semibold text-[#111118] dark:text-white">{day}</span>
                    {hasPost && (
                      <div className="mt-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC] text-[10px] p-1.5 rounded-md font-bold truncate">
                        2 Posts Scheduled
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E8E7F0] bg-white p-5 shadow-sm dark:border-[#27272A] dark:bg-[#141416]">
              <h3 className="font-bold mb-4">Quick Schedule</h3>
              <div className="space-y-4">
                <div className="h-24 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <VideoThumbnail orientation="landscape" duration="SOURCE" label="SELECT CLIP" className="w-full h-full" />
                </div>
                
                <Button className="w-full" disabled>Schedule Post</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "calendar" && (
        <div className="text-center py-20 rounded-2xl border border-[#E8E7F0] bg-white dark:border-[#27272A] dark:bg-[#141416]">
          <Search className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-[#111118] dark:text-white">No {activeTab} posts</h3>
          <p className="text-[#6B6B78] dark:text-[#A1A1AA] mt-1">Posts in this status will appear here.</p>
        </div>
      )}

    </div>
  );
}
