import React from "react";
import { Skeleton } from "./Skeleton.tsx";

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
