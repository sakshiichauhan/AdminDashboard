// import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { film, upload, edit } from 'lucide-react';

const VideoStatsOverview = () => {
  const stats = [
    {
      title: 'Total Videos',
      value: '236',
      icon: '🎬',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Published Videos',
      value: '192',
      icon: '✅',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Review',
      value: '22',
      icon: '⏳',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Video Formats',
      value: '16:9 (Web), 9:16 (Mobile)',
      icon: '📱',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Plays (30 Days)',
      value: '42,310',
      icon: '▶️',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📊 Video Library Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-lg mb-3`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoStatsOverview;