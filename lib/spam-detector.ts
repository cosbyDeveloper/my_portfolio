// Spam detection utility for contact forms
// Adapted from Django spam protection patterns

// =========================================================
// SPAM CONFIG
// =========================================================

export const SPAM_KEYWORDS = [
  // CRYPTO / FINANCE
  'crypto',
  'bitcoin',
  'bitcoins',
  'btc',
  'blockchain',
  'wallet',
  'forex',
  'investment opportunity',
  'trading signal',
  'passive income',
  'cloud mining',
  'withdraw your bitcoins',
  'earned bitcoins',

  // SEO / MARKETING
  'seo',
  'marketing',
  'digital marketing',
  'backlinks',
  'guest post',
  'domain authority',
  'traffic boost',
  'google ranking',

  // SCAM / MONEY
  'loan',
  'quick cash',
  'make money fast',
  'earn daily',
  'work from home',
  'winner',
  'prize',
  'lottery',
  'bonus',
  'reward',
  'urgent',
  'congratulations',
  'claim reward',

  // ADULT / CASINO
  'casino',
  'gambling',
  'escort',
  'viagra',
  'porn',

  // TECH SPAM
  'vpn',
  'proxy',
  'telegram channel',
  'whatsapp group',

  // GENERIC BOT PHRASES
  'click here',
  'buy now',
  'limited offer',
  'special promotion',
];

export const FOREIGN_SPAM_PATTERNS = [
  'вознаграждение',
  'лотерейный',
  'выигрыш',
  'подарок',
];

export const LOW_QUALITY_PATTERNS = [
  'i want to know your price',
  'what is your price',
  'contact me',
  'earn money',
];

export const SUSPICIOUS_DOMAINS = [
  'goo.su',
  'telegra.ph',
  't.me',
  'carsh.store',
];

export const DISPOSABLE_EMAIL_PATTERNS = [
  'mailinator',
  'tempmail',
  'guerrillamail',
  '10minutemail',
];

// =========================================================
// REGEX
// =========================================================

const URL_REGEX = /https?:\/\/[^\s]+/g;
const CYRILLIC_REGEX = /[\u0400-\u04FF]/;
const RANDOM_TOKEN_REGEX = /\b[A-Z0-9]{12,}\b/g;

// =========================================================
// HELPER FUNCTIONS
// =========================================================

export function extractUrls(text: string): string[] {
  return (text || '').match(URL_REGEX) || [];
}

export function containsCyrillic(text: string): boolean {
  return CYRILLIC_REGEX.test(text || '');
}

export function detectRandomTokens(text: string): string[] {
  return (text || '').match(RANDOM_TOKEN_REGEX) || [];
}

export function calculateUppercaseRatio(text: string): number {
  if (!text) return 0;

  const letters = text.split('').filter((c) => /[a-z]/i.test(c));

  if (!letters.length) return 0;

  const uppercaseCount = letters.filter((c) => c === c.toUpperCase()).length;

  return uppercaseCount / letters.length;
}

export function calculateEntropyScore(text: string): number {
  if (!text) return 0;

  const words = text.split(/\s+/).filter((w) => w.length > 0);

  if (!words.length) return 0;

  const uniqueWords = new Set(words).size;

  return uniqueWords / words.length;
}

// =========================================================
// MAIN SPAM DETECTION
// =========================================================

export interface SpamAnalysis {
  score: number;
  reasons: string[];
  isSpam: boolean;
}

export function calculateSpamScore(
  name: string,
  email: string,
  message: string,
  threshold: number = 5
): SpamAnalysis {
  let score = 0;
  const reasons: string[] = [];

  const text = `${name} ${email} ${message}`.toLowerCase();

  // =====================================================
  // KEYWORD MATCHING
  // =====================================================

  for (const keyword of SPAM_KEYWORDS) {
    if (text.includes(keyword)) {
      score += 2;
      reasons.push(`Contains spam keyword: "${keyword}"`);
    }
  }

  // =====================================================
  // FOREIGN SPAM PATTERNS
  // =====================================================

  for (const pattern of FOREIGN_SPAM_PATTERNS) {
    if (text.includes(pattern)) {
      score += 2;
      reasons.push(`Contains suspicious foreign pattern`);
    }
  }

  // =====================================================
  // LOW QUALITY PHRASES
  // =====================================================

  for (const phrase of LOW_QUALITY_PATTERNS) {
    if (text.includes(phrase)) {
      score += 1;
      reasons.push(`Contains low-quality phrase: "${phrase}"`);
    }
  }

  // =====================================================
  // URL ANALYSIS
  // =====================================================

  const urls = extractUrls(message);

  if (urls.length >= 2) {
    score += 3;
    reasons.push(`Multiple URLs detected (${urls.length})`);
  }

  for (const url of urls) {
    try {
      const domain = new URL(url).hostname.toLowerCase();

      if (SUSPICIOUS_DOMAINS.some((bad) => domain.includes(bad))) {
        score += 4;
        reasons.push(`Suspicious domain detected: ${domain}`);
      }
    } catch (e) {
      // Invalid URL format
    }
  }

  // =====================================================
  // TOO MANY EMAILS
  // =====================================================

  if (message.split('@').length - 1 >= 3) {
    score += 2;
    reasons.push(`Multiple email addresses found`);
  }

  // =====================================================
  // UPPERCASE DETECTION
  // =====================================================

  if (message.length > 20) {
    const uppercaseRatio = calculateUppercaseRatio(message);

    if (uppercaseRatio > 0.5) {
      score += 1;
      reasons.push(`Excessive uppercase letters (${(uppercaseRatio * 100).toFixed(0)}%)`);
    }
  }

  // =====================================================
  // RANDOM TOKENS
  // =====================================================

  const randomTokens = detectRandomTokens(message);

  if (randomTokens.length >= 1) {
    score += 2;
    reasons.push(`Random token pattern detected`);
  }

  // =====================================================
  // CYRILLIC + URL COMBO
  // =====================================================

  if (containsCyrillic(message) && urls.length > 0) {
    score += 2;
    reasons.push(`Cyrillic text with URLs detected`);
  }

  // =====================================================
  // VERY SHORT SUSPICIOUS MESSAGE
  // =====================================================

  if (message && message.trim().length < 10) {
    score += 1;
    reasons.push(`Message too short`);
  }

  // =====================================================
  // REPETITIVE / LOW ENTROPY
  // =====================================================

  const entropy = calculateEntropyScore(message);

  if (message.split(/\s+/).length > 20 && entropy < 0.4) {
    score += 2;
    reasons.push(`Repetitive content detected`);
  }

  // =====================================================
  // DISPOSABLE EMAILS
  // =====================================================

  if (email.includes('@')) {
    const emailDomain = email.split('@')[1].toLowerCase();

    if (DISPOSABLE_EMAIL_PATTERNS.some((x) => emailDomain.includes(x))) {
      score += 2;
      reasons.push(`Disposable email provider detected`);
    }
  }

  return {
    score,
    reasons,
    isSpam: score >= threshold,
  };
}
