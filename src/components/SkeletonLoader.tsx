import React from "react";

// Reusable skeleton pulse block
export const Skeleton = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} {...props} />
);

// Skeleton for EventDetail page
export const EventDetailSkeleton = () => (
  <div>
    {/* Hero */}
    <div className="h-[420px] bg-slate-200 animate-pulse" />
    <section className="py-16 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left */}
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
          {/* Right */}
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
// Skeleton for RepositoryPage
export const RepositorySkeleton = () => (
  <div className="pt-20 min-h-screen bg-white">
    {/* Hero Skeleton */}
    <section className="py-20 bg-dark text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-24 w-48 bg-white/10" />
          <Skeleton className="h-16 w-full bg-white/10" />
          <Skeleton className="h-6 w-3/4 bg-white/10" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-44 bg-white/10 rounded-2xl" />
            <Skeleton className="h-14 w-44 bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>

    {/* Filter Skeleton */}
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-12 w-64 rounded-xl" />
        </div>
      </div>
    </section>

    {/* Grid Skeleton */}
    <section className="py-12 bg-slate-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4.5] w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// Skeleton for Hero Section (Universal)
export const HeroSectionSkeleton = () => (
  <section className="py-20 bg-dark text-white relative overflow-hidden">
    <div className="container-custom relative z-10">
      <div className="max-w-3xl space-y-6">
        <Skeleton className="h-4 w-32 bg-white/10" />
        <Skeleton className="h-16 w-full bg-white/10" />
        <Skeleton className="h-16 w-3/4 bg-white/10" />
        <Skeleton className="h-6 w-1/2 bg-white/10" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-14 w-44 bg-white/10 rounded-xl" />
          <Skeleton className="h-14 w-44 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  </section>
);

// Skeleton for Services Page
export const ServicesSkeleton = () => (
  <div className="pt-20 bg-white">
    <HeroSectionSkeleton />
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className={`h-80 w-full rounded-[2.5rem] ${i === 0 ? "lg:col-span-2" : ""}`} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

// Skeleton for Contact Page
export const ContactSkeleton = () => (
  <div className="pt-20 bg-white">
    <section className="relative h-[70vh] md:h-[85vh] w-full bg-dark overflow-hidden">
      <div className="container-custom relative h-full flex flex-col justify-center z-20">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-16 w-full bg-white/10" />
          <Skeleton className="h-16 w-3/4 bg-white/10" />
          <Skeleton className="h-6 w-1/2 bg-white/10" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-44 bg-white/10 rounded-xl" />
            <Skeleton className="h-14 w-44 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-12">
          <Skeleton className="lg:col-span-2 h-[600px] rounded-[2.5rem]" />
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-[2rem]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Skeleton for Workflow (Home)
export const WorkflowSkeleton = () => (
  <section className="py-24">
    <div className="container-custom">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3 space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Skeleton for Ecosystem (Home)
export const EcosystemSkeleton = () => (
  <section className="py-24 bg-slate-50">
    <div className="container-custom">
      <div className="flex flex-col lg:flex-row gap-16">
        <Skeleton className="w-full lg:w-4/12 h-96 rounded-[2rem]" />
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  </section>
);
