import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Monarch } from '../types';
import { useTranslation } from 'react-i18next';

interface NextMonarchGuesserProps {
  monarchs: Monarch[];
  onSubmit: (monarchId: number) => void;
  disabled: boolean;
  correctSuccessorId?: number;
}

const NextMonarchGuesser: React.FC<NextMonarchGuesserProps> = ({
  monarchs,
  onSubmit,
  disabled,
  correctSuccessorId
}) => {
  const { t, i18n } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getMonarchName = (m: Monarch) => {
    if (i18n.language === 'fr' && m.nameFr) return m.nameFr;
    if (i18n.language === 'ja' && m.nameJa) return m.nameJa;
    if (i18n.language === 'zh' && m.nameZh) return m.nameZh;
    if (i18n.language === 'es' && m.nameEs) return m.nameEs;
    if (i18n.language === 'hi' && m.nameHi) return m.nameHi;
    if (i18n.language === 'ar' && m.nameAr) return m.nameAr;
    return m.name;
  };

  const sortedMonarchs = useMemo(() => {
    return [...monarchs].sort((a, b) => getMonarchName(a).localeCompare(getMonarchName(b)));
  }, [monarchs, i18n.language]);

  // Instant filtering on typed search term
  const filteredMonarchs = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return sortedMonarchs;

    return sortedMonarchs.filter(m => {
      const nameMatch = getMonarchName(m).toLowerCase().includes(trimmed);
      const enNameMatch = m.name.toLowerCase().includes(trimmed);
      const yearMatch = `${m.reignStart}`.includes(trimmed) || (m.reignEnd ? `${m.reignEnd}`.includes(trimmed) : false);
      const houseMatch = m.house.toLowerCase().includes(trimmed);
      return nameMatch || enNameMatch || yearMatch || houseMatch;
    });
  }, [sortedMonarchs, searchTerm, i18n.language]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const activeItem = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (monarch: Monarch) => {
    setSelectedId(monarch.id.toString());
    setSearchTerm(getMonarchName(monarch));
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || !!feedback) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        setIsOpen(true);
        setHighlightedIndex(0);
        return;
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < filteredMonarchs.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredMonarchs.length - 1));
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredMonarchs.length) {
        e.preventDefault();
        handleSelect(filteredMonarchs[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !selectedId || feedback || !correctSuccessorId) return;

    const guessedId = parseInt(selectedId, 10);
    const isCorrect = guessedId === correctSuccessorId;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      onSubmit(guessedId);
    }, 1500);
  };

  const selectClasses = [
    'w-full bg-slate-800/90 border border-slate-600 rounded-xl pl-10 pr-16 py-3 text-white text-base sm:text-lg focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50 shadow-inner',
    feedback === 'correct'
      ? 'border-green-500 ring-green-500 bg-green-950/60'
      : feedback === 'incorrect'
      ? 'border-red-500 ring-red-500 bg-red-950/60'
      : 'focus:border-purple-400 focus:ring-purple-500/50'
  ].join(' ');

  const buttonClasses = [
    'w-full sm:w-auto px-7 py-3 text-white font-bold rounded-xl transform transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 whitespace-nowrap',
    !selectedId || !!feedback || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95',
    feedback === 'correct'
      ? 'bg-green-600 focus:ring-green-500/50'
      : feedback === 'incorrect'
      ? 'bg-red-600 focus:ring-red-500/50'
      : 'bg-purple-600 hover:bg-purple-500 focus:ring-purple-500/50 shadow-purple-900/30'
  ].join(' ');

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      <div ref={wrapperRef} className="relative w-full flex-grow">
        {/* Search Icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">
          🔍
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setSelectedId('');
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => {
            setIsOpen(true);
            if (highlightedIndex === -1 && filteredMonarchs.length > 0) {
              setHighlightedIndex(0);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled || !!feedback}
          placeholder={t('selectMonarch')}
          className={selectClasses}
          aria-label="Search and select from list"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />

        {/* Action icons on right: clear & dropdown chevron */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && !disabled && !feedback && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedId('');
                setIsOpen(true);
                setHighlightedIndex(0);
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors text-xs font-bold"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (!disabled && !feedback) {
                setIsOpen(prev => !prev);
                inputRef.current?.focus();
              }
            }}
            className="text-slate-400 hover:text-amber-400 p-1.5 rounded transition-colors"
            aria-label="Toggle dropdown list"
          >
            <span className={`inline-block transform transition-transform text-xs ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* Auto-Complete Dropdown List with Instant Filtering */}
        {isOpen && !disabled && !feedback && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute z-50 left-0 right-0 mt-1.5 max-h-72 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl divide-y divide-slate-800 custom-scrollbar animate-fade-in"
          >
            {filteredMonarchs.length > 0 ? (
              filteredMonarchs.map((monarch, index) => {
                const isHighlighted = index === highlightedIndex;
                const isSelected = selectedId === monarch.id.toString();
                const displayName = getMonarchName(monarch);

                return (
                  <li
                    key={monarch.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(monarch)}
                    className={`px-3.5 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isHighlighted
                        ? 'bg-purple-900/50 text-amber-300'
                        : isSelected
                        ? 'bg-slate-800 text-amber-400 font-semibold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar Thumbnail */}
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center">
                        {monarch.imageUrl ? (
                          <img
                            src={monarch.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-xs">👑</span>
                        )}
                      </div>

                      {/* Name & House */}
                      <div className="truncate">
                        <p className="text-sm font-semibold truncate">
                          {displayName}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {monarch.house}
                        </p>
                      </div>
                    </div>

                    {/* Reign Years */}
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        {monarch.reignStart} – {monarch.reignEnd ?? t('present')}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-4 text-center text-slate-400 text-sm italic">
                🔍 {t('noResultsFound') || 'No leaders matching your search'}
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled || !selectedId || !!feedback}
        className={buttonClasses}
      >
        {t('submit')}
      </button>
    </form>
  );
};

export default NextMonarchGuesser;
