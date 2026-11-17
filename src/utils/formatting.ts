export function formatDzd(amount: number, language?: string): string {
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (language === 'ar') {
    return `\u200E${formatted} د.ج`;
  }
  return `\u200E${formatted} DA`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
