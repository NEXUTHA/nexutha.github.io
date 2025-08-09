// NEXUTHA - Utility Functions

import type { 
  Language, 
  Theme, 
  ChatMessage, 
  ThrottledFunction, 
  DebouncedFunction, 
  PerformanceMetrics,
  AnalyticsEvent,
  ErrorLog
} from './types';

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T, 
  limit: number
): ThrottledFunction<T> {
  let inThrottle: boolean;
  
  const throttledFunc = ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as ThrottledFunction<T>;

  throttledFunc.cancel = () => {
    inThrottle = false;
  };

  return throttledFunc;
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  delay: number
): DebouncedFunction<T> {
  let timeoutId: number | undefined;
  let lastArgs: Parameters<T> | undefined;

  const debouncedFunc = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      func.apply(this, args);
      timeoutId = undefined;
    }, delay);
  }) as DebouncedFunction<T>;

  debouncedFunc.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  debouncedFunc.flush = () => {
    if (timeoutId !== undefined && lastArgs) {
      debouncedFunc.cancel();
      return func.apply(this, lastArgs);
    }
  };

  return debouncedFunc;
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2);
  return `${prefix}${timestamp}${randomStr}`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date, language: Language = 'ja'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const locale = language === 'ja' ? 'ja-JP' : 'en-US';
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Animate counting numbers
 */
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration: number = 2000,
  callback?: () => void
): void {
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * easeOut);
    
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(
  target: string | HTMLElement,
  offset: number = 0,
  behavior: ScrollBehavior = 'smooth'
): void {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior
  });
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, threshold: number = 0): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                     ((rect.top + rect.height) >= windowHeight * threshold);
  const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                    ((rect.left + rect.width) >= windowWidth * threshold);
  
  return vertInView && horInView;
}

/**
 * Local storage utilities with error handling
 */
export const storage = {
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
};

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize HTML string
 */
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Wait for specified duration
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await wait(delay);
    }
  }
  
  throw new Error('Retry failed');
}

/**
 * Create intersection observer with callback
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Preload image
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Get device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  
  if (isMobile) {
    return window.innerWidth < 768 ? 'mobile' : 'tablet';
  }
  
  return 'desktop';
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get browser language
 */
export function getBrowserLanguage(): Language {
  const language = navigator.language.toLowerCase();
  return language.startsWith('ja') ? 'ja' : 'en';
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}

/**
 * Performance measurement utilities
 */
export const performance = {
  mark(name: string): void {
    if ('performance' in window && window.performance.mark) {
      window.performance.mark(name);
    }
  },

  measure(name: string, startMark: string, endMark?: string): number | undefined {
    if ('performance' in window && window.performance.measure) {
      try {
        window.performance.measure(name, startMark, endMark);
        const entries = window.performance.getEntriesByName(name);
        return entries[entries.length - 1]?.duration;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
    return undefined;
  },

  getMetrics(): PerformanceMetrics | null {
    if (!('performance' in window)) return null;

    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = window.performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
    const lcp = window.performance.getEntriesByType('largest-contentful-paint').pop();
    
    return {
      loadTime: navigation?.loadEventEnd - navigation?.navigationStart || 0,
      firstContentfulPaint: fcp?.startTime || 0,
      largestContentfulPaint: (lcp as any)?.startTime || 0,
      cumulativeLayoutShift: 0, // Would need to be measured separately
      firstInputDelay: 0 // Would need to be measured separately
    };
  }
};

/**
 * Simple event emitter
 */
export class EventEmitter<T extends Record<string, any> = Record<string, any>> {
  private listeners: Map<keyof T, Set<Function>> = new Map();

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
    this.listeners.get(event)?.delete(callback);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners.get(event)?.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Event listener error:', error);
      }
    });
  }

  removeAllListeners<K extends keyof T>(event?: K): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

/**
 * Error logging utility
 */
export const errorLogger = {
  log(error: ErrorLog): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[NEXUTHA Error]', error);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(error);
    }

    // Store locally for debugging
    this.storeLocally(error);
  },

  sendToAnalytics(error: ErrorLog): void {
    // Implementation would depend on analytics service
    // Example for Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message,
        fatal: error.level === 'error'
      });
    }
  },

  storeLocally(error: ErrorLog): void {
    try {
      const errors = storage.get<ErrorLog[]>('nexutha_errors', []);
      errors.push(error);
      
      // Keep only last 100 errors
      if (errors.length > 100) {
        errors.splice(0, errors.length - 100);
      }
      
      storage.set('nexutha_errors', errors);
    } catch (e) {
      console.warn('Failed to store error locally:', e);
    }
  }
};

/**
 * Feature detection utilities
 */
export const features = {
  supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },

  supportsIntersectionObserver(): boolean {
    return 'IntersectionObserver' in window;
  },

  supportsServiceWorker(): boolean {
    return 'serviceWorker' in navigator;
  },

  supportsWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (error) {
      return false;
    }
  },

  supportsTouchEvents(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
};