import React, { useState, useRef, useEffect } from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';
import { MonarchFamilyTreeView } from './MonarchFamilyTreeView';

interface FamilyTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  monarchs: Monarch[];
  initialMonarchId?: number | null;
}

const FamilyTreeModal: React.FC<FamilyTreeModalProps> = ({
  isOpen,
  onClose,
  monarchs,
  initialMonarchId
}) => {
  const { t, i18n } = useTranslation();
  const [hoveredMonarch, setHoveredMonarch] = useState<Monarch | null>(null);

  // Filter out Republic presidents, keep royal houses
  const royalMonarchs = monarchs.filter(m => m.house !== 'Republic');

  const [activeView, setActiveView] = useState<'overview' | 'monarch'>('overview');
  const [selectedMonarch, setSelectedMonarch] = useState<Monarch>(royalMonarchs[0] || monarchs[0]);

  // Handle opening and initial monarch
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });

      if (initialMonarchId) {
        const found = monarchs.find(m => m.id === initialMonarchId);
        if (found) {
          setSelectedMonarch(found);
          setActiveView('monarch');
          return;
        }
      }
      // If no initial monarch specified, default to overview
      setActiveView('overview');
    }
  }, [isOpen, initialMonarchId, monarchs]);

  const handleSelectMonarch = (m: Monarch) => {
    setSelectedMonarch(m);
    setActiveView('monarch');
  };

  const getMonarchName = (m: Monarch) => {
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const getMonarchTitle = (m: Monarch) => {
    if (i18n.language === 'fr' && m.titleFr) return m.titleFr;
    if (i18n.language === 'ja' && m.titleJa) return m.titleJa;
    if (i18n.language === 'zh' && m.titleZh) return m.titleZh;
    if (i18n.language === 'es' && m.titleEs) return m.titleEs;
    if (i18n.language === 'hi' && m.titleHi) return m.titleHi;
    if (i18n.language === 'ar' && m.titleAr) return m.titleAr;
    return m.title;
  };

  const getMonarchContext = (m: Monarch) => {
    if (i18n.language === 'fr' && m.contextFr) return m.contextFr;
    if (i18n.language === 'ja' && m.contextJa) return m.contextJa;
    if (i18n.language === 'zh' && m.contextZh) return m.contextZh;
    if (i18n.language === 'es' && m.contextEs) return m.contextEs;
    if (i18n.language === 'hi' && m.contextHi) return m.contextHi;
    if (i18n.language === 'ar' && m.contextAr) return m.contextAr;
    return m.context;
  };

  // Zoom and Drag State for Overview
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDistance = useRef<number | null>(null);
  const initialScale = useRef<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    setScale(prev => Math.min(Math.max(0.2, prev + delta), 3));
  };

  // Touch support for dragging and zooming
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y };
      initialPinchDistance.current = null;
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance.current = Math.hypot(dx, dy);
      initialScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y
      });
    } else if (e.touches.length === 2 && initialPinchDistance.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.hypot(dx, dy);
      const newScale = initialScale.current * (distance / initialPinchDistance.current);
      setScale(Math.min(Math.max(0.2, newScale), 3));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      initialPinchDistance.current = null;
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y };
      initialPinchDistance.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  // Group by house in chronological order of their first appearance
  const houses = ['Capet', 'Valois', 'Bourbon', 'Bonaparte', 'Orléans'];

  const monarchsByHouse = houses.reduce((acc, house) => {
    acc[house] = royalMonarchs.filter(m => m.house === house);
    return acc;
  }, {} as Record<string, Monarch[]>);

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="family-tree-title"
    >
      <div
        className="bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl w-full max-w-[96vw] h-[92vh] flex flex-col animate-scale-in overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <header className="p-3 sm:p-4 border-b border-slate-750 flex flex-wrap justify-between items-center bg-slate-850/90 flex-shrink-0 z-20 gap-3">
          <div className="flex items-center gap-3">
            <h2
              id="family-tree-title"
              className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 flex items-center gap-2"
            >
              <span>👑</span>
              <span className="hidden sm:inline">{t('royalLineage')}</span>
              <span className="sm:hidden">{t('familyTree')}</span>
            </h2>

            {/* View Switch Tabs */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs sm:text-sm font-medium">
              <button
                onClick={() => setActiveView('overview')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'overview'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🏛️</span>
                <span>{t('allHousesTree')}</span>
              </button>

              <button
                onClick={() => setActiveView('monarch')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'monarch'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>👨‍👩‍👧‍👦</span>
                <span>{t('monarchFamilyTree')}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeView === 'overview' && (
              <span className="text-xs text-amber-400/90 hidden md:inline-block bg-slate-800/80 px-3 py-1 rounded-full border border-amber-500/20">
                💡 {t('tapToViewFamily')}
              </span>
            )}

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold p-1 rounded-lg hover:bg-slate-800"
              aria-label={t('close')}
            >
              &times;
            </button>
          </div>
        </header>

        {/* BODY CONTENT */}
        {activeView === 'monarch' ? (
          <MonarchFamilyTreeView
            selectedMonarch={selectedMonarch}
            allMonarchs={monarchs}
            onSelectMonarch={handleSelectMonarch}
            onBackToOverview={() => setActiveView('overview')}
          />
        ) : (
          <div
            className="flex-1 overflow-hidden relative bg-slate-900/90 cursor-grab active:cursor-grabbing"
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_100%)] pointer-events-none"></div>

            {/* Draggable/Zoomable Container */}
            <div
              className="absolute origin-top-left transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                padding: '100px 50vw 50vh 50vw',
                left: '-50vw',
              }}
            >
              <div className="flex flex-col items-center min-w-max pb-32">
                {/* Root Node */}
                <div className="flex flex-col items-center relative z-20">
                  <div className="bg-gradient-to-b from-amber-400 to-amber-600 text-black px-10 py-4 rounded-2xl font-bold text-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] border-2 border-amber-300 pointer-events-auto">
                    {t('crownOfFrance')}
                  </div>
                  {/* Trunk line going down to horizontal branch */}
                  <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-amber-600/50"></div>
                </div>

                {/* Houses Branching */}
                <div className="flex items-start justify-center relative w-full">
                  {houses.map((house, index) => {
                    const isFirst = index === 0;
                    const isLast = index === houses.length - 1;
                    const isMiddle = !isFirst && !isLast;
                    const houseMonarchs = monarchsByHouse[house];

                    if (!houseMonarchs || houseMonarchs.length === 0) return null;

                    return (
                      <div key={house} className="flex flex-col items-center relative px-4 sm:px-8 flex-1">
                        {/* Horizontal Line */}
                        {isFirst && !isLast && <div className="absolute top-0 right-0 w-1/2 h-1 bg-amber-600/50"></div>}
                        {isLast && !isFirst && <div className="absolute top-0 left-0 w-1/2 h-1 bg-amber-600/50"></div>}
                        {isMiddle && <div className="absolute top-0 left-0 w-full h-1 bg-amber-600/50"></div>}

                        {/* Vertical Line down to House Node */}
                        <div className="w-1 h-8 bg-amber-600/50"></div>

                        {/* House Node */}
                        <div className="bg-slate-800 border-2 border-amber-600/80 px-8 py-3 rounded-xl z-10 shadow-[0_0_15px_rgba(217,119,6,0.3)] mb-2 relative pointer-events-auto">
                          <h3 className="text-lg font-bold text-amber-500 tracking-widest uppercase whitespace-nowrap">
                            {t('houseOf', { house })}
                          </h3>
                        </div>

                        {/* Monarchs */}
                        <div className="flex flex-col items-center w-full">
                          {houseMonarchs.map(monarch => (
                            <div
                              key={monarch.id}
                              className="flex flex-col items-center relative group w-48 cursor-pointer"
                              onClick={() => handleSelectMonarch(monarch)}
                            >
                              {/* Vertical line from previous node */}
                              <div className="w-1 h-12 bg-slate-700 group-hover:bg-amber-500/80 transition-colors duration-300"></div>

                              {/* Monarch Node */}
                              <div
                                className="relative w-28 h-28 rounded-full border-4 border-slate-700 overflow-hidden bg-slate-800 transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] z-10 pointer-events-auto"
                                onMouseEnter={() => setHoveredMonarch(monarch)}
                                onMouseLeave={() => setHoveredMonarch(null)}
                              >
                                {monarch.imageUrl ? (
                                  <img
                                    src={monarch.imageUrl}
                                    alt={getMonarchName(monarch)}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    draggable="false"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs text-center p-2">
                                    {t('noImage')}
                                  </div>
                                )}

                                {/* Little Crown overlay badge */}
                                <div className="absolute bottom-1 right-1 bg-amber-500 text-slate-950 p-1 rounded-full text-[10px] leading-none shadow group-hover:scale-125 transition-transform">
                                  👑
                                </div>
                              </div>

                              <div className="mt-3 text-center mb-2 pointer-events-auto">
                                <p className="font-bold text-base text-slate-200 group-hover:text-amber-400 transition-colors flex items-center justify-center gap-1">
                                  {getMonarchName(monarch)}
                                </p>
                                <p className="text-xs text-slate-400 font-mono mt-1 bg-slate-800/80 px-2 py-0.5 rounded-md inline-block border border-slate-700/50">
                                  {monarch.reignStart} - {monarch.reignEnd || t('present')}
                                </p>
                                <p className="text-[11px] text-amber-400/70 font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {t('tapToViewFamily')} →
                                </p>
                              </div>

                              {/* Hover Tooltip (Local to Monarch) */}
                              {hoveredMonarch?.id === monarch.id && (
                                <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 bg-slate-800/95 backdrop-blur-md border border-amber-500/60 rounded-xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-72 z-50 pointer-events-none animate-fade-in">
                                  <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                      {hoveredMonarch.imageUrl && (
                                        <img
                                          src={hoveredMonarch.imageUrl}
                                          alt={getMonarchName(hoveredMonarch)}
                                          className="w-12 h-12 rounded-lg object-cover border border-slate-600 shadow-md flex-shrink-0"
                                          referrerPolicy="no-referrer"
                                        />
                                      )}
                                      <div>
                                        <h4 className="font-bold text-amber-400 text-sm leading-tight">
                                          {getMonarchName(hoveredMonarch)}
                                        </h4>
                                        <p className="text-amber-600/80 text-[10px] uppercase tracking-wider font-bold mt-0.5">
                                          {getMonarchTitle(hoveredMonarch)}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                      {getMonarchContext(hoveredMonarch)}
                                    </p>
                                    <div className="pt-2 border-t border-slate-700 text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                                      <span>👑 {t('tapToViewFamily')}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyTreeModal;
