import React from "react";
import { Skeleton } from "./Skeleton.tsx";

// Skeleton for EventDetail page
export const EventDetailSkeleton = () => (
  <div>
    <div className="h-[420px] bg-slate-200 animate-pulse" />
    <section className="py-16 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:flex-1 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] space-y-4">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_rgb(0,0,0,0.06)] space-y-4">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-14 w-full rounded-2xl mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Skeleton for EventsPage cards grid
export const EventsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100">
        <Skeleton className="aspect-video w-full rounded-none" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton for filter pills
export const FilterPillsSkeleton = () => (
  <div className="flex flex-wrap gap-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-24 rounded-xl" />
    ))}
  </div>
);

// Skeleton for EventRegistrationPage
export const RegistrationSkeleton = () => (
  <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
    <div className="container-custom max-w-5xl">
      <Skeleton className="h-6 w-44 mb-8" />
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:flex-1 bg-white rounded-[2rem] p-8 md:p-12 space-y-6">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white rounded-[2rem] p-8 space-y-4">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
