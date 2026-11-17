import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/store';
import { buildWhatsAppUrl } from '../utils/formatting';
import styles from './TradeInSection.module.css';

export function TradeInSection() {
  const [currentPhone, setCurrentPhone] = useState('');
  const [storage, setStorage] = useState('128GB');
  const [batteryCondition, setBatteryCondition] = useState('90% - 100% (Très bon état)');
  const [desiredPhone, setDesiredPhone] = useState('');

  const message = [
    'Salam *PLANET PHONE*, je souhaite une estimation pour une *Reprise / Échange* :',
    `• Mon téléphone actuel : *${currentPhone.trim() || 'Non précisé'}*`,
    `• Capacité : *${storage}*`,
    `• État / Batterie : *${batteryCondition}*`,
    `• Modèle souhaité chez vous : *${desiredPhone.trim() || 'À discuter'}*`
  ].join('\n');

  const waUrl = buildWhatsAppUrl(STORE_INFO.whatsappNumber, message);

  return (
    <section id="reprise" className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div>
            <span className={styles.badge}>SERVICE REPRISE & ÉCHANGE (تبديل الهواتف)</span>
            <h2 className={styles.title}>Échangez votre ancien téléphone sur place</h2>
            <p className={styles.desc}>
              Passez à un modèle supérieur chez Planet Phone (Bazar Dubai, Bouira). Envoyez les détails de votre appareil actuel pour recevoir une estimation immédiate de la différence.
            </p>
            <div className={styles.steps}>
              <span>1. Indiquez votre modèle et son état général</span>
              <span>2. Recevez une estimation rapide sur WhatsApp</span>
              <span>3. Finalisez l’échange en magasin avec contrôle immédiat</span>
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.label}>Votre téléphone actuel</label>
                <input
                  type="text"
                  value={currentPhone}
                  onChange={(e) => setCurrentPhone(e.target.value)}
                  placeholder="Ex: iPhone 13 / S22 Ultra"
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>Capacité</label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className={styles.select}
                >
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>État batterie & extérieur</label>
                <select
                  value={batteryCondition}
                  onChange={(e) => setBatteryCondition(e.target.value)}
                  className={styles.select}
                >
                  <option value="90% - 100% (Très bon état)">90% - 100% (Très bon état)</option>
                  <option value="85% - 89% (Bon état, jamais ouvert)">85% - 89% (Bon état, jamais ouvert)</option>
                  <option value="80% - 84% (Usure normale)">80% - 84% (Usure normale)</option>
                  <option value="Autre état à vérifier en magasin">Autre état à vérifier en magasin</option>
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Modèle souhaité chez Planet Phone</label>
                <input
                  type="text"
                  value={desiredPhone}
                  onChange={(e) => setDesiredPhone(e.target.value)}
                  placeholder="Ex: iPhone 15 Pro Max 256GB"
                  className={styles.input}
                />
              </div>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.submitBtn}
            >
              <MessageCircle size={18} />
              <span>Demander une estimation sur WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}