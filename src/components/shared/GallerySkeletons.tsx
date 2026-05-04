import React from "react";
import { Skeleton } from "./Skeleton.tsx";

// Skeleton for Gallery grid
export const GalleryGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
    ))}
  </div>
);

// Skeleton for GalleryPage (masonry-like)
export const GalleryPageSkeleton = () => (
  <div className="pt-20 min-h-screen">
    <section className="py-20 bg-green-50/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Skeleton className="h-4 w-24 rounded-full mx-auto" />
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-2xl" />
          ))}
        </div>
        <GalleryGridSkeleton />
      </div>
    </section>
  </div>
);
