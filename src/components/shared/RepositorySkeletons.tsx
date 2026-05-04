import React from "react";
import { Skeleton } from "./Skeleton.tsx";

export const RepositorySkeleton = () => (
  <div className="pt-20 min-h-screen bg-white">
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
