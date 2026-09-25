"use client";

import React from "react";
import { Video, Activity, Search, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOURCES = [
  { id: 1, platform: "YouTube", channel: "Creator Channel", checked: "2 minutes ago", status: "Active", lastVideo: "The Future of AI SaaS", icon: Video, color: "text-red-500" }
];

export default function AutomationSourcesPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 pt-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111118] dark:text-white">Source Monitoring</h1>
          <p className="text-[#6B6B78] dark:text-[#A1A1AA] mt-2">
            Connect channels to monitor for new content automatically.
          </p>
        </div>
        <Button className="rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#9B7CFF] text-white">
          <Link className="w-4 h-4 mr-2" /> Add Source
        </Button>
      </div>

      <div className="rounded-2xl border border-[#E8E7F0] bg-white shadow-sm dark:border-[#27272A] dark:bg-[#141416] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8F9FC] dark:bg-[#0A0A0B] border-b border-[#E8E7F0] dark:border-[#27272A]">
            <tr>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Platform & Channel</th>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Status</th>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Last Checked</th>
              <th className="p-4 font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Last Video Detected</th>
              <th className="p-4 text-right font-bold text-[#6B6B78] dark:text-[#A1A1AA]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E7F0] dark:divide-[#27272A]">
            {SOURCES.map((source) => {
              const Icon = source.icon;
              return (
                <tr key={source.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/20">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${source.color}`} />
                      <div>
                        <span className="font-semibold text-[#111118] dark:text-white block">{source.channel}</span>
                        <span className="text-[10px] text-[#6B6B78] dark:text-[#A1A1AA] uppercase">{source.platform}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 flex items-center w-max">
                      <Activity className="w-3 h-3 mr-1" /> {source.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#6B6B78] dark:text-[#A1A1AA]">{source.checked}</td>
                  <td className="p-4 text-[#6B6B78] dark:text-[#A1A1AA] italic truncate max-w-[200px]">
                    &quot;{source.lastVideo}&quot;
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Disconnect</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-200 text-sm flex gap-3">
        <Activity className="w-5 h-5 shrink-0" />
        <p>
          <strong>Note:</strong> Live monitoring requires proper API webhooks configured on the provider side. This is currently simulated for demonstration.
        </p>
      </div>

    </div>
  );
}
