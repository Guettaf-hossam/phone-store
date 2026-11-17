// ============================================================
// src/App.tsx  — Phase 2 wired
// ============================================================

import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import './styles/globals.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Auto-scroll to catalog when user starts typing
    if (query.trim().length > 0) {
      const catalogEl = document.getElementById('catalogue');
      catalogEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <main id="main-content" role="main">
        <HeroSection />
        <CatalogSection searchQuery={searchQuery} />
      </main>

      {/* ---- Footer ---- */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-secondary)',
          padding: '32px 0',
        }}
        role="contentinfo"
        aria-label="Pied de page Planet Phone"
      >
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-ink-primary)', letterSpacing: '-0.01em' }}>
              <span style={{ color: 'var(--color-brand)' }}>PLANET</span> PHONE
            </p>
            <p style={{ fontSize: '12.5px', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
              Bazar Dubai, Rue Frères Boussendalah — La Cité Ouest, Bouira
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/213550151293"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brand)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              WhatsApp — 0550 15 12 93
            </a>
            <a
              href="https://instagram.com/planet_phone10"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-muted)' }}
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/PlanetPhonee"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-muted)' }}
            >
              Facebook
            </a>
          </div>
          <p style={{ fontSize: '11.5px', color: 'var(--color-ink-faint)', width: '100%', textAlign: 'center', marginTop: '8px' }}>
            © {new Date().getFullYear()} Planet Phone — Tous droits réservés. Prix indicatifs, confirmés à la commande.
          </p>
        </div>
      </footer>
    </>
  );
}
