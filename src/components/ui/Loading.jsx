import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Quick Add Bar Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 p-6 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
          <div className="flex-1 h-10 bg-gray-300 rounded-lg animate-pulse" />
          <div className="w-24 h-10 bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-8 bg-gray-300 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="w-32 h-8 bg-gray-300 rounded-lg animate-pulse" />
          <div className="w-32 h-8 bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Task Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse" />
            <div className="w-16 h-8 bg-gray-300 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse mb-1" />
                    <div className="w-16 h-3 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-3 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-16 bg-gray-300 rounded-full animate-pulse" />
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse mt-1" />
                <div className="flex-1">
                  <div className="w-3/4 h-5 bg-gray-300 rounded animate-pulse mb-2" />
                  <div className="w-full h-4 bg-gray-300 rounded animate-pulse mb-3" />
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-5 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-12 h-5 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;