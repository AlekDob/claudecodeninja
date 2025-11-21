import { useState } from 'react';
import { ExternalLink, FileText, Link as LinkIcon, Filter } from 'lucide-react';
import { milestones } from '../../data/milestones';
import { TemplateModal } from './TemplateModal';
import type { Resource, TemplateResource, ResourceType } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

export const ResourceView = () => {
  const { theme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<ResourceType | 'all'>('all');

  // Collect all resources from all milestones
  const allResources = milestones.reduce((acc, milestone) => {
    if (milestone.resources && milestone.resources.length > 0) {
      // Filter resources based on selected filter
      const filteredResources = filter === 'all'
        ? milestone.resources
        : milestone.resources.filter(r => r.type === filter);

      if (filteredResources.length > 0) {
        acc.push({
          milestoneId: milestone.id,
          milestoneTitle: milestone.title,
          resources: filteredResources
        });
      }
    }
    return acc;
  }, [] as Array<{ milestoneId: number; milestoneTitle: string; resources: Resource[] }>);

  const handleTemplateClick = (template: TemplateResource) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (allResources.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Nessuna Risorsa Disponibile
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Le risorse saranno aggiunte progressivamente per ogni milestone
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header with Filter */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Risorse del Percorso
          </h2>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Filtra:
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: filter === 'all' ? '#FF6B35' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'),
                  color: filter === 'all' ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${filter === 'all' ? '#FF6B35' : 'var(--border-normal)'}`
                }}
              >
                Tutte
              </button>

              <button
                onClick={() => setFilter('link')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                style={{
                  backgroundColor: filter === 'link' ? '#3B82F6' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'),
                  color: filter === 'link' ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${filter === 'link' ? '#3B82F6' : 'var(--border-normal)'}`
                }}
              >
                <LinkIcon className="w-4 h-4" />
                Link
              </button>

              <button
                onClick={() => setFilter('template')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                style={{
                  backgroundColor: filter === 'template' ? '#F59E0B' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'),
                  color: filter === 'template' ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${filter === 'template' ? '#F59E0B' : 'var(--border-normal)'}`
                }}
              >
                <FileText className="w-4 h-4" />
                Template
              </button>
            </div>
          </div>
        </div>

        {allResources.map((item) => (
          <div key={item.milestoneId} className="space-y-4">
            {/* Milestone Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: '#FF6B35' }}
              >
                {item.milestoneId}
              </div>
              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.milestoneTitle}
              </h3>
              <div
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  color: '#FF6B35'
                }}
              >
                {item.resources.length} {item.resources.length === 1 ? 'risorsa' : 'risorse'}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="group p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
                    borderColor: 'var(--border-normal)'
                  }}
                  onClick={() => {
                    if (resource.type === 'template') {
                      handleTemplateClick(resource as TemplateResource);
                    } else {
                      handleLinkClick(resource.url);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: resource.type === 'link' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                      }}
                    >
                      {resource.type === 'link' ? (
                        <LinkIcon className="w-6 h-6" style={{ color: '#3B82F6' }} />
                      ) : (
                        <FileText className="w-6 h-6" style={{ color: '#F59E0B' }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-base leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {resource.title}
                        </h4>
                        {resource.type === 'link' && (
                          <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }} />
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {resource.description}
                        </p>
                      )}
                      <div className="mt-2">
                        <span
                          className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: resource.type === 'link' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                            color: resource.type === 'link' ? '#3B82F6' : '#F59E0B'
                          }}
                        >
                          {resource.type === 'link' ? 'Link Esterno' : 'Template'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Template Modal */}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTemplate(null);
          }}
        />
      )}
    </>
  );
};
