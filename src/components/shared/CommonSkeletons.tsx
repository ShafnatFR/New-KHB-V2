import React from "react";
import { Skeleton } from "./Skeleton.tsx";

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
