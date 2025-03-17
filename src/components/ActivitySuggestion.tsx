
import React from 'react';
import { ActivitySuggestion as ActivitySuggestionType } from '@/lib/types';
import FadeIn from './transitions/FadeIn';

interface ActivitySuggestionProps {
  suggestions: ActivitySuggestionType[];
  isLoading: boolean;
}

const ActivitySuggestion: React.FC<ActivitySuggestionProps> = ({ 
  suggestions,
  isLoading
}) => {
  if (isLoading) {
    return <ActivitySuggestionSkeleton />;
  }
  
  return (
    <section className="mb-8">
      <FadeIn delay={500}>
        <div className="glass-card overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Recommendations</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={suggestion.activity}
                  className="bg-card/40 rounded-xl p-4 border border-border/50 hover:border-primary/20 transition-all hover:shadow-subtle"
                >
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">{suggestion.icon}</div>
                    <h4 className="font-medium">{suggestion.activity}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

// Loading skeleton
const ActivitySuggestionSkeleton: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="glass-card overflow-hidden animate-pulse">
        <div className="p-6">
          <div className="h-6 w-40 bg-secondary rounded-md mb-4"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card/40 rounded-xl p-4 border border-border/50">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 bg-secondary rounded-md mr-3"></div>
                  <div className="h-5 w-24 bg-secondary rounded-md"></div>
                </div>
                <div className="h-4 w-full bg-secondary rounded-md mb-2"></div>
                <div className="h-4 w-5/6 bg-secondary rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySuggestion;
