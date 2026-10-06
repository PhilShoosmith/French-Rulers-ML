import React from 'react';

interface TimelineApp {
  id: string;
  title: string;
  badgeUrl: string;
  appleUrl: string;
  googleUrl: string;
}

const apps: TimelineApp[] = [
  {
    id: 'uk-monarchs',
    title: 'UK Monarchs',
    badgeUrl: '/images/uk_monarchs_badge.jpg',
    appleUrl: 'https://apps.apple.com/app/uk-monarchs-timeline/id6760196085',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.ukmonarchtimeline',
  },
  {
    id: 'uk-pms',
    title: 'UK PMs',
    badgeUrl: '/images/uk_pms_badge.jpg',
    appleUrl: 'https://apps.apple.com/app/uk-prime-ministers-timeline/id6761317024',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.ukpms',
  },
  {
    id: 'french-rulers',
    title: 'French Rulers',
    badgeUrl: '/images/french_rulers_badge.jpg',
    appleUrl: 'https://apps.apple.com/app/french-rulers-timeline/id6761076227',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.frrulers',
  },
  {
    id: 'us-presidents',
    title: 'US Presidents',
    badgeUrl: '/images/us_presidents_badge.jpg',
    appleUrl: 'https://apps.apple.com/app/us-presidents-timeline/id6761148914',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.uspresidents',
  },
];

// Official Apple App Store Icon SVG
const AppStoreIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 512 512" className={className} fill="none">
    <rect width="512" height="512" rx="115" fill="#1C69D4" />
    <g transform="translate(64, 64) scale(0.75)" stroke="#fff" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
      <line x1="256" y1="56" x2="150" y2="440" />
      <line x1="100" y1="360" x2="412" y2="360" />
      <line x1="280" y1="130" x2="380" y2="440" />
    </g>
  </svg>
);

// Official Google Play Icon SVG
const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path d="M68.5 32.8C63.9 37.8 61.3 45.4 61.3 55.3v401.4c0 9.9 2.6 17.5 7.2 22.5l1.2 1.2 225-225v-5.2L69.7 31.6l-1.2 1.2z" fill="#00d6ff" />
    <path d="M370.2 320.7l-75.5-75.5v-5.2l75.5-75.5 1.7 1 89.4 50.8c25.5 14.5 25.5 38.3 0 52.8l-89.4 50.8-1.7.8z" fill="#ffce00" />
    <path d="M294.7 245.2L68.5 471.4c8.4 8.9 22.2 10 37.8 1.1l263.9-150-75.5-77.3z" fill="#ff334c" />
    <path d="M294.7 266.8l75.5-75.5-263.9-150c-15.6-8.9-29.4-7.8-37.8 1.1l226.2 224.4z" fill="#00f076" />
  </svg>
);

export const HistoricalTimelinesApps: React.FC = () => {
  return (
    <div className="w-full bg-white text-slate-900 rounded-2xl p-5 sm:p-7 shadow-2xl border border-slate-200 mt-6 animate-fade-in font-sans">
      {/* Top Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] tracking-tight mb-2">
          Historical Timelines Apps
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
          <span>Download from</span>
          <a
            href="https://apps.apple.com/developer/philippe-shoosmith/id1850530456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#0284c7] hover:underline hover:opacity-85 transition-opacity"
            title="Philippe Shoosmith on Apple App Store"
          >
            <span>Apple Store</span>
            <AppStoreIcon className="w-4 h-4 inline-block drop-shadow-sm" />
          </a>
          <span>or</span>
          <a
            href="https://play.google.com/store/apps/developer?id=Philippe+Shoosmith"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#0284c7] hover:underline hover:opacity-85 transition-opacity"
            title="Philippe Shoosmith on Google Play Store"
          >
            <span>Google Store</span>
            <GooglePlayIcon className="w-4 h-4 inline-block drop-shadow-sm" />
          </a>
        </div>
      </div>

      {/* 2x2 Grid of Apps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 max-w-xl mx-auto py-2">
        {apps.map((app) => (
          <div key={app.id} className="flex flex-col items-center text-center group">
            {/* Badge Emblem */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden">
              <img
                src={app.badgeUrl}
                alt={app.title}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-badge')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-badge w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-white p-3 text-center border-4 border-amber-400';
                    fallback.innerHTML = `<span style="font-size: 2rem;">👑</span><span style="font-weight: 800; font-size: 0.85rem; margin-top: 4px; color: #fbbf24;">${app.title}</span>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Title Ribbon Label */}
            <div className="mt-3">
              <span className="inline-block bg-[#166534] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-md shadow-md tracking-wide">
                {app.title}
              </span>
            </div>

            {/* Click Store Links: [Apple Store Icon] ← Click → [Google Play Icon] */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <a
                href={app.appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Download ${app.title} on Apple App Store`}
                aria-label={`Download ${app.title} on Apple App Store`}
                className="p-1 rounded-xl hover:scale-110 active:scale-95 transition-transform duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <AppStoreIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              </a>

              <span className="text-slate-900 font-bold text-xs sm:text-sm tracking-wide select-none px-1">
                &larr; Click &rarr;
              </span>

              <a
                href={app.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Download ${app.title} on Google Play`}
                aria-label={`Download ${app.title} on Google Play`}
                className="p-1 rounded-xl hover:scale-110 active:scale-95 transition-transform duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <GooglePlayIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalTimelinesApps;
