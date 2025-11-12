'use client';

import React from 'react';
import Card from './Card';

interface Feature {
  label: string;
  description: string;
}

interface FeatureDescriptionProps {
  selectedFeature: Feature | null;
}

const FeatureDescription: React.FC<FeatureDescriptionProps> = ({ selectedFeature }) => {
  if (!selectedFeature) {
    return null;
  }

  return (
    <div className="mt-8 animate-fade-in">
      <Card>
        <h3 className="text-2xl font-bold text-dark mb-4">{selectedFeature.label}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {selectedFeature.description}
        </p>
      </Card>
    </div>
  );
};

export default FeatureDescription;

