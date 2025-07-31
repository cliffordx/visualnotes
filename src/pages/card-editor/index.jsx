import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import EditorToolbar from './components/EditorToolbar';
import CardMetadata from './components/CardMetadata';
import RichTextEditor from './components/RichTextEditor';
import QuickActions from './components/QuickActions';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';

const CardEditor = () => {
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get('id');
  
  // Card state
  const [cardData, setCardData] = useState({
    id: cardId || 'new',
    title: '',
    content: '',
    project: '',
    tags: [],
    createdAt: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    modifiedAt: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  });

  // UI state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isMetadataCollapsed, setIsMetadataCollapsed] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  // Mock existing card data
  const mockCards = {
    '1': {
      id: '1',
      title: 'Research Methodology Overview',
      content: `<h2>Introduction to Research Methodology</h2>
<p>Research methodology is the systematic approach to conducting research and gathering data for analysis.</p>

<h3>Key Components</h3>
<ul>
<li><b>Research Design</b> - The overall strategy for conducting research</li>
<li><b>Data Collection</b> - Methods for gathering information</li>
<li><b>Analysis Framework</b> - Approach to interpreting results</li>
</ul>

<p>Understanding these components is crucial for conducting <i>effective research</i> that produces reliable and valid results.</p>`,
      project: 'research-methodology',
      tags: ['Research', 'Methodology', 'Important'],
      createdAt: 'Jan 15, 2025, 09:30 AM',
      modifiedAt: 'Jan 27, 2025, 06:15 AM'
    },
    '2': {
      id: '2',
      title: 'Literature Review Process',
      content: `<h2>Systematic Literature Review</h2>
<p>A comprehensive approach to reviewing existing research in your field.</p>

<h3>Steps in Literature Review</h3>
<ol>
<li>Define research questions</li>
<li>Search for relevant sources</li>
<li>Evaluate source quality</li>
<li>Synthesize findings</li>
</ol>

<p>Remember to maintain <b>critical analysis</b> throughout the process.</p>`,
      project: 'literature-review',
      tags: ['Literature', 'Review', 'Process'],
      createdAt: 'Jan 20, 2025, 02:15 PM',
      modifiedAt: 'Jan 26, 2025, 11:45 AM'
    }
  };

  // Load card data on mount
  useEffect(() => {
    if (cardId && mockCards[cardId]) {
      const loadedCard = mockCards[cardId];
      setCardData(loadedCard);
      setOriginalData(loadedCard);
    } else {
      // New card
      const newCard = {
        id: 'new',
        title: '',
        content: '',
        project: '',
        tags: [],
        createdAt: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        modifiedAt: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setCardData(newCard);
      setOriginalData(newCard);
    }
  }, [cardId]);

  // Check for unsaved changes
  useEffect(() => {
    if (originalData) {
      const hasChanges = 
        cardData.title !== originalData.title ||
        cardData.content !== originalData.content ||
        cardData.project !== originalData.project ||
        JSON.stringify(cardData.tags) !== JSON.stringify(originalData.tags);
      
      setHasUnsavedChanges(hasChanges);
    }
  }, [cardData, originalData]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      setSaveStatus('saving');
      const saveTimer = setTimeout(() => {
        // Simulate save
        setSaveStatus('saved');
        setHasUnsavedChanges(false);
        setOriginalData({ ...cardData });
        
        // Update modified time
        setCardData(prev => ({
          ...prev,
          modifiedAt: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));
      }, 2000);

      return () => clearTimeout(saveTimer);
    }
  }, [hasUnsavedChanges, cardData]);

  // Editor actions
  const handleBold = useCallback(() => {
    document.execCommand('bold', false, null);
  }, []);

  const handleItalic = useCallback(() => {
    document.execCommand('italic', false, null);
  }, []);

  const handleHeader = useCallback(() => {
    document.execCommand('formatBlock', false, 'h2');
  }, []);

  const handleList = useCallback(() => {
    document.execCommand('insertUnorderedList', false, null);
  }, []);

  const handleLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  }, []);

  const handleImage = useCallback((files) => {
    if (files && files.length > 0) {
      // Simulate image upload
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = `<img src="${e.target.result}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
        document.execCommand('insertHTML', false, img);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Card actions
  const handleDuplicate = () => {
    const duplicatedCard = {
      ...cardData,
      id: 'new',
      title: `${cardData.title} (Copy)`,
      createdAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setCardData(duplicatedCard);
    setOriginalData(duplicatedCard);
    alert('Card duplicated successfully!');
  };

  const handleMove = (projectId) => {
    setCardData(prev => ({ ...prev, project: projectId }));
    alert(`Card moved to project successfully!`);
  };

  const handleArchive = () => {
    if (window.confirm('Are you sure you want to archive this card?')) {
      alert('Card archived successfully!');
      window.location.href = '/dashboard-main-workspace';
    }
  };

  const handleShare = (shareType) => {
    switch (shareType) {
      case 'link':
        navigator.clipboard.writeText(`${window.location.origin}/card-editor?id=${cardData.id}`);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(cardData.title)}&body=${encodeURIComponent('Check out this card: ' + window.location.href)}`);
        break;
      case 'export':
        alert('PDF export functionality would be implemented here.');
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      alert('Card deleted successfully!');
      window.location.href = '/dashboard-main-workspace';
    }
  };

  const handleBack = () => {
    window.location.href = '/dashboard-main-workspace';
  };

  const handleProjectClick = () => {
    if (cardData.project) {
      window.location.href = `/project-detail-view?project=${cardData.project}`;
    }
  };

  const getProjectName = (projectId) => {
    const projectMap = {
      'research-methodology': 'Research Methodology',
      'literature-review': 'Literature Review',
      'data-analysis': 'Data Analysis',
      'getting-started': 'Getting Started',
      'para-system': 'PARA System',
      'my-library': 'My Library'
    };
    return projectMap[projectId] || 'Unassigned';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavigation
        projectName={getProjectName(cardData.project)}
        cardTitle={cardData.title}
        onBack={handleBack}
        onProjectClick={handleProjectClick}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Card Metadata */}
        <div className="w-full lg:w-80 lg:flex-shrink-0">
          <CardMetadata
            title={cardData.title}
            onTitleChange={(title) => setCardData(prev => ({ ...prev, title }))}
            selectedProject={cardData.project}
            onProjectChange={(project) => setCardData(prev => ({ ...prev, project }))}
            tags={cardData.tags}
            onTagsChange={(tags) => setCardData(prev => ({ ...prev, tags }))}
            createdAt={cardData.createdAt}
            modifiedAt={cardData.modifiedAt}
            isCollapsed={isMetadataCollapsed}
            onToggleCollapse={() => setIsMetadataCollapsed(!isMetadataCollapsed)}
          />
        </div>

        {/* Right Panel - Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Toolbar */}
          <EditorToolbar
            onBold={handleBold}
            onItalic={handleItalic}
            onHeader={handleHeader}
            onList={handleList}
            onLink={handleLink}
            onImage={() => document.querySelector('input[type="file"]').click()}
            isPreviewMode={isPreviewMode}
            onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
            saveStatus={saveStatus}
          />

          {/* Rich Text Editor */}
          <RichTextEditor
            content={cardData.content}
            onChange={(content) => setCardData(prev => ({ ...prev, content }))}
            onImageDrop={handleImage}
            isPreviewMode={isPreviewMode}
            placeholder="Start writing your card content..."
          />

          {/* Quick Actions */}
          <QuickActions
            onDuplicate={handleDuplicate}
            onMove={handleMove}
            onArchive={handleArchive}
            onShare={handleShare}
            onDelete={handleDelete}
            isModified={hasUnsavedChanges}
          />
        </div>
      </div>
    </div>
  );
};

export default CardEditor;