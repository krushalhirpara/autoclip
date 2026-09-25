"use client";

import React, { useState } from "react";
import { MoreHorizontal, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoThumbnail } from "@/components/media/VideoThumbnail";

const STATUSES = ["Draft", "Ready", "Scheduled", "Publishing", "Published", "Failed"];

const MOCK_DATA = [
  { id: 1, title: "The secret to audience retention", platform: "YouTube Shorts", status: "Scheduled", time: "Sep 25, 09:00 AM" },
  { id: 2, title: "Why you need to edit less", platform: "Instagram Reels", status: "Published", time: "Sep 24, 11:30 AM" },
];

export default function PublishingQueuePage() {
  const [filterStatus, setFilterStatus] = useState("All");

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111118] dark:text-white">Publishing Queue</h1>
          <p className="text-[#6B6B78] dark:text-[#A1A1AA] mt-2">
            Manage your content pipeline and review post statuses.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button variant={filterStatus === "All" ? "default" : "outline"} onClick={() => setFilterStatus("All")} size="sm" className="rounded-full">
          All
        </Button>
        {STATUSES.map(status => (
          <Button 
            key={status} 
            variant={filterStatus === status ? "default" : "outline"} 
            onClick={() => setFilterStatus(status)} 
            size="sm" 
            className="rounded-full"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E8E7F0] bg-white shadow-sm dark:border-[#27272A] dark:bg-[#141416] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8F9FC] dark:bg-[#0A0A0B] border-b border-[#E8E7F0] dark:border-[#27272A]">
            <tr>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Content</th>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Platform</th>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Schedule</th>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Status</th>
              <th className="p-4 text-right font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E7F0] dark:divide-[#27272A]">
            {MOCK_DATA.filter(d => filterStatus === "All" || d.status === filterStatus).map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/20">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 shrink-0">
                      <VideoThumbnail orientation="portrait" duration="" label="" className="rounded" />
                    </div>
                    <span className="font-semibold text-[#111118] dark:text-white line-clamp-2">{item.title}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className="font-semibold">
                    {item.platform}
                  </Badge>
                </td>
                <td className="p-4 text-[#6B6B78] dark:text-[#A1A1AA]">{item.time}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {MOCK_DATA.filter(d => filterStatus === "All" || d.status === filterStatus).length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
