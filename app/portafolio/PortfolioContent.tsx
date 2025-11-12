'use client';

import React, { useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import ProjectSidebar, { Feature } from '@/components/ProjectSidebar';
import FeatureDescription from '@/components/FeatureDescription';

const PortfolioContent: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <>
      {/* POS Project Showcase */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Carousel - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <ImageCarousel />
            {/* Feature Description Section - Below Carousel */}
            <FeatureDescription selectedFeature={selectedFeature} />
          </div>
          
          {/* Sidebar - Takes 1 column on desktop */}
          <div className="lg:col-span-1">
            <ProjectSidebar 
              onFeatureClick={setSelectedFeature}
              selectedFeature={selectedFeature}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioContent;

