'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectGalleryProps {
  coverImage: string;
  galleryImages: string[];
  title: string;
}

export function ProjectGallery({
  coverImage,
  galleryImages,
  title,
}: ProjectGalleryProps) {
  const allImages = Array.from(new Set([coverImage, ...galleryImages]));
  const [activeImage, setActiveImage] = useState(allImages[0] || coverImage);

  return (
    <div className="space-y-4">
      {/* Active Featured Image */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-brand-border shadow-md">
        <Image
          src={activeImage}
          alt={`معاينة مشروع ${title}`}
          fill
          className="object-contain object-center"
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
        />
      </div>

      {/* Thumbnails row if more than 1 image */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                activeImage === img
                  ? 'border-brand-primary ring-2 ring-brand-primary/20 scale-105'
                  : 'border-brand-border opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`صورة مصغرة ${index + 1} لمشروع ${title}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
