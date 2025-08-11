// NEXUTHA - TypeScript Type Definitions

export type Language = 'ja' | 'en';

export type Theme = 'light' | 'dark';

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  stats: {
    projects: string;
    clients: string;
    support: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
  };
  features: {
    ai: {
      title: string;
      description: string;
    };
    music: {
      title: string;
      description: string;
    };
    automation: {
      title: string;
      description: string;
    };
  };
  services: {
    title: string;
    prompt: {
      title: string;
      description: string;
    };
    music: {
      title: string;
      description: string;
    };
    laser: {
      title: string;
      description: string;
    };
  };
  contact: {
    title: string;
    description: string;
  };
  chatbot: {
    title: string;
    welcome: string;
    placeholder: string;
    thinking: string;
    error: string;
  };
  footer: {
    privacy: string;
    terms: string;
    rights: string;
  };
}

export interface TranslationData {
  ja: Translation;
  en: Translation;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  conversationHistory: string[];
}

export interface NavigationState {
  activeSection: string;
  isMenuOpen: boolean;
}

export interface AppState {
  language: Language;
  theme: Theme;
  navigation: NavigationState;
  chatbot: ChatbotState;
  isLoading: boolean;
  visitorCount: number;
}

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export interface StatItem {
  element: HTMLElement;
  target: number;
  current: number;
  increment: number;
}

export interface ServiceWorkerConfig {
  enabled: boolean;
  cacheStrategy: 'cacheFirst' | 'networkFirst' | 'staleWhileRevalidate';
  precacheRoutes: string[];
}

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
  alternateLanguages: Record<Language, string>;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  language: Language;
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, string>;
}

export interface ErrorLog {
  timestamp: Date;
  level: 'error' | 'warn' | 'info';
  message: string;
  stack?: string;
  userAgent?: string;
  url?: string;
}

export interface ParticleConfig {
  count: number;
  color: string;
  size: {
    min: number;
    max: number;
  };
  speed: {
    min: number;
    max: number;
  };
  opacity: {
    min: number;
    max: number;
  };
}

export interface ScrollProgressConfig {
  selector: string;
  offset: number;
  throttle: number;
}

export interface LazyLoadConfig {
  threshold: number;
  rootMargin: string;
  fade: boolean;
}

export interface IntersectionConfig {
  threshold: number;
  rootMargin: string;
  animationClass: string;
  delay: number;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type EventCallback<T = Event> = (event: T) => void;

export type ThrottledFunction<T extends (...args: any[]) => any> = T & {
  cancel: () => void;
};

export type DebouncedFunction<T extends (...args: any[]) => any> = T & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

// DOM Element Types
export interface HTMLElementWithDataset extends HTMLElement {
  dataset: DOMStringMap & {
    i18n?: string;
    i18nPlaceholder?: string;
    count?: string;
    aos?: string;
    aosDelay?: string;
    aosDuration?: string;
  };
}

// Event Types
export interface CustomEventMap {
  'app:languageChange': CustomEvent<{ language: Language }>;
  'app:themeChange': CustomEvent<{ theme: Theme }>;
  'chatbot:messageReceived': CustomEvent<{ message: ChatMessage }>;
  'navigation:sectionChange': CustomEvent<{ section: string }>;
  'performance:metric': CustomEvent<{ metric: keyof PerformanceMetrics; value: number }>;
}

declare global {
  interface WindowEventMap extends CustomEventMap {}
  
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    NEXUTHAApp?: {
      version: string;
      config: AppConfig;
      utils: typeof import('./utils');
    };
  }
}

export interface AppConfig {
  version: string;
  environment: 'development' | 'production';
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    analytics: boolean;
    chatbot: boolean;
    animations: boolean;
  };
  performance: {
    enableLazyLoading: boolean;
    enableImageOptimization: boolean;
    enableCodeSplitting: boolean;
  };
  seo: {
    enableStructuredData: boolean;
    enableMetaGeneration: boolean;
    enableSitemap: boolean;
  };
}