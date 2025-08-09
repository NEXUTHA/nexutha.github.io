// NEXUTHA - Main TypeScript Application

import type { 
  Language, 
  Theme, 
  AppState, 
  ChatMessage, 
  StatItem, 
  HTMLElementWithDataset,
  AppConfig 
} from './types';

import { translations } from './translations';
import { 
  storage, 
  throttle, 
  debounce, 
  generateId, 
  animateCounter, 
  scrollToElement, 
  isInViewport, 
  createIntersectionObserver,
  getBrowserLanguage,
  getDeviceType,
  prefersReducedMotion,
  EventEmitter,
  errorLogger
} from './utils';

// Application Configuration
const CONFIG: AppConfig = {
  version: '2.0.0',
  environment: process.env.NODE_ENV as 'development' | 'production',
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.nexutha.com',
    timeout: 10000
  },
  features: {
    analytics: true,
    chatbot: true,
    serviceWorker: true,
    animations: !prefersReducedMotion()
  },
  performance: {
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCodeSplitting: true
  },
  seo: {
    enableStructuredData: true,
    enableMetaGeneration: true,
    enableSitemap: true
  }
};

// Application State
class NEXUTHAApp extends EventEmitter {
  private state: AppState = {
    language: getBrowserLanguage(),
    theme: storage.get<Theme>('nexutha_theme', 'dark'),
    navigation: {
      activeSection: 'home',
      isMenuOpen: false
    },
    chatbot: {
      isOpen: false,
      messages: [],
      isTyping: false,
      conversationHistory: []
    },
    isLoading: true,
    visitorCount: 0
  };

  private elements: { [key: string]: HTMLElement | null } = {};
  private observers: IntersectionObserver[] = [];
  private statItems: StatItem[] = [];

  constructor() {
    super();
    this.init();
  }

  private async init(): Promise<void> {
    try {
      // Performance marking
      performance.mark('app-init-start');

      // Initialize DOM elements
      this.initializeElements();

      // Setup event listeners
      this.setupEventListeners();

      // Initialize features
      await this.initializeFeatures();

      // Apply initial state
      this.applyInitialState();

      // Setup intersection observers
      this.setupIntersectionObservers();

      // Initialize analytics
      this.initializeAnalytics();

      // Mark app as loaded
      this.setState({ isLoading: false });

      // Performance measurement
      performance.mark('app-init-end');
      const initDuration = performance.measure('app-init-duration', 'app-init-start', 'app-init-end');
      
      console.log(`NEXUTHA App initialized in ${initDuration}ms`);

      // Emit ready event
      this.emit('app:ready', { duration: initDuration });

    } catch (error) {
      this.handleError(error, 'App initialization failed');
    }
  }

  private initializeElements(): void {
    const elementIds = [
      'loadingScreen',
      'progressBar',
      'navigation',
      'navMenu',
      'navToggle',
      'themeToggle',
      'langToggle',
      'heroBackground',
      'heroStats',
      'ctaButton',
      'chatbotContainer',
      'chatbotToggle',
      'chatbotWindow',
      'chatbotMessages',
      'chatbotInput',
      'chatbotSend',
      'chatbotClose'
    ];

    elementIds.forEach(id => {
      this.elements[id] = document.getElementById(id);
    });

    // Validate critical elements
    const criticalElements = ['navigation', 'themeToggle', 'langToggle'];
    criticalElements.forEach(id => {
      if (!this.elements[id]) {
        throw new Error(`Critical element '${id}' not found`);
      }
    });
  }

  private setupEventListeners(): void {
    // Navigation toggle
    this.elements.navToggle?.addEventListener('click', () => {
      this.toggleNavigation();
    });

    // Theme toggle
    this.elements.themeToggle?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Language toggle
    this.elements.langToggle?.addEventListener('click', () => {
      this.toggleLanguage();
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href')?.substring(1) || 'home';
        this.navigateToSection(target);
      });
    });

    // CTA Button
    this.elements.ctaButton?.addEventListener('click', () => {
      this.openChatbot();
    });

    // Chatbot controls
    this.elements.chatbotToggle?.addEventListener('click', () => {
      this.toggleChatbot();
    });

    this.elements.chatbotClose?.addEventListener('click', () => {
      this.closeChatbot();
    });

    this.elements.chatbotSend?.addEventListener('click', () => {
      this.sendMessage();
    });

    this.elements.chatbotInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    // Scroll events
    const throttledScrollHandler = throttle(this.handleScroll.bind(this), 16);
    window.addEventListener('scroll', throttledScrollHandler);

    // Resize events
    const debouncedResizeHandler = debounce(this.handleResize.bind(this), 250);
    window.addEventListener('resize', debouncedResizeHandler);

    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Visibility change (for performance optimization)
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

    // Error handling
    window.addEventListener('error', this.handleWindowError.bind(this));
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
  }

  private async initializeFeatures(): Promise<void> {
    const promises: Promise<void>[] = [];

    // Initialize chatbot
    if (CONFIG.features.chatbot) {
      promises.push(this.initializeChatbot());
    }

    // Initialize service worker
    if (CONFIG.features.serviceWorker && 'serviceWorker' in navigator) {
      promises.push(this.initializeServiceWorker());
    }

    // Initialize animations
    if (CONFIG.features.animations) {
      promises.push(this.initializeAnimations());
    }

    await Promise.all(promises);
  }

  private applyInitialState(): void {
    // Apply theme
    this.applyTheme(this.state.theme);

    // Apply language
    this.applyLanguage(this.state.language);

    // Hide loading screen
    setTimeout(() => {
      const loadingScreen = this.elements.loadingScreen;
      if (loadingScreen) {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 300);
      }
    }, 1000);

    // Initialize stats counter
    this.initializeStatsCounter();
  }

  private setupIntersectionObservers(): void {
    // Section observer for navigation
    const sectionObserver = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.setActiveSection(sectionId);
        }
      });
    }, { threshold: 0.5 });

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    this.observers.push(sectionObserver);

    // Animation observer
    if (CONFIG.features.animations) {
      const animationObserver = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animationObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(element => {
        animationObserver.observe(element);
      });

      this.observers.push(animationObserver);
    }
  }

  private initializeAnalytics(): void {
    if (!CONFIG.features.analytics) return;

    // Initialize Google Analytics
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('config', 'GA_TRACKING_ID', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          custom_dimension_1: 'device_type',
          custom_dimension_2: 'language'
        }
      });

      // Send custom dimensions
      gtag('event', 'page_view', {
        device_type: getDeviceType(),
        language: this.state.language
      });
    }

    // Track visitor count (simulated)
    const visitorCount = storage.get('nexutha_visitor_count', 0);
    storage.set('nexutha_visitor_count', visitorCount + 1);
    this.setState({ visitorCount: visitorCount + 1 });
  }

  private async initializeChatbot(): Promise<void> {
    // Initialize chatbot with welcome message
    const welcomeMessage: ChatMessage = {
      id: generateId('msg_'),
      content: translations[this.state.language].chatbot.welcome,
      role: 'assistant',
      timestamp: new Date()
    };

    this.setState({
      chatbot: {
        ...this.state.chatbot,
        messages: [welcomeMessage]
      }
    });

    this.updateChatbotUI();
  }

  private async initializeServiceWorker(): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }

  private async initializeAnimations(): Promise<void> {
    // Initialize particle background
    this.initializeParticleBackground();

    // Initialize scroll-based animations
    this.initializeScrollAnimations();
  }

  private initializeStatsCounter(): void {
    const statsElements = document.querySelectorAll('.stat-number[data-count]');
    
    statsElements.forEach(element => {
      const target = parseInt((element as HTMLElementWithDataset).dataset.count || '0');
      const statItem: StatItem = {
        element: element as HTMLElement,
        target,
        current: 0,
        increment: target / 100
      };
      this.statItems.push(statItem);
    });
  }

  private startStatsAnimation(): void {
    this.statItems.forEach(item => {
      animateCounter(item.element, item.target, 2000);
    });
  }

  private initializeParticleBackground(): void {
    const heroBackground = this.elements.heroBackground;
    if (!heroBackground) return;

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.6';

    heroBackground.appendChild(canvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = heroBackground.offsetWidth;
      canvas.height = heroBackground.offsetHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      if (!document.hidden) {
        requestAnimationFrame(animate);
      }
    };

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    resizeCanvas();
    animate();

    // Handle resize
    window.addEventListener('resize', debounce(resizeCanvas, 250));
  }

  private initializeScrollAnimations(): void {
    // Progress bar
    const updateProgressBar = throttle(() => {
      const progressBar = this.elements.progressBar;
      if (!progressBar) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;

      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, 16);

    window.addEventListener('scroll', updateProgressBar);
  }

  // Event Handlers
  private handleScroll(): void {
    // Update navigation background opacity
    const navigation = this.elements.navigation;
    if (navigation) {
      const opacity = Math.min(window.pageYOffset / 100, 1);
      navigation.style.background = `rgba(15, 23, 42, ${0.95 * opacity})`;
    }

    // Trigger stats animation when visible
    const heroStats = this.elements.heroStats;
    if (heroStats && isInViewport(heroStats) && this.statItems.length > 0 && this.statItems[0].current === 0) {
      this.startStatsAnimation();
    }
  }

  private handleResize(): void {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && this.state.navigation.isMenuOpen) {
      this.setState({
        navigation: {
          ...this.state.navigation,
          isMenuOpen: false
        }
      });
      this.updateNavigationUI();
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // ESC key handlers
    if (e.key === 'Escape') {
      if (this.state.chatbot.isOpen) {
        this.closeChatbot();
      }
      if (this.state.navigation.isMenuOpen) {
        this.toggleNavigation();
      }
    }
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      // Page is hidden - pause animations, reduce activity
      console.log('Page hidden - reducing activity');
    } else {
      // Page is visible - resume normal activity
      console.log('Page visible - resuming activity');
    }
  }

  private handleWindowError(event: ErrorEvent): void {
    this.handleError(new Error(event.message), 'Window error', {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    this.handleError(event.reason, 'Unhandled promise rejection');
  }

  private handleError(error: Error, context: string, metadata?: any): void {
    errorLogger.log({
      timestamp: new Date(),
      level: 'error',
      message: `${context}: ${error.message}`,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...metadata
    });
  }

  // State Management
  private setState(newState: Partial<AppState>): void {
    this.state = { ...this.state, ...newState };
    this.emit('state:change', this.state);
  }

  // Theme Management
  private toggleTheme(): void {
    const newTheme: Theme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme: newTheme });
    this.applyTheme(newTheme);
    storage.set('nexutha_theme', newTheme);
    this.emit('app:themeChange', { theme: newTheme });
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeToggle = this.elements.themeToggle;
    if (themeToggle) {
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
  }

  // Language Management
  private toggleLanguage(): void {
    const newLanguage: Language = this.state.language === 'ja' ? 'en' : 'ja';
    this.setState({ language: newLanguage });
    this.applyLanguage(newLanguage);
    storage.set('nexutha_language', newLanguage);
    this.emit('app:languageChange', { language: newLanguage });
  }

  private applyLanguage(language: Language): void {
    const langToggle = this.elements.langToggle;
    if (langToggle) {
      const langText = langToggle.querySelector('.lang-text');
      if (langText) {
        langText.textContent = language === 'ja' ? 'EN' : 'JA';
      }
    }

    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(element => {
      const key = (element as HTMLElementWithDataset).dataset.i18n;
      if (key) {
        const translation = this.getNestedTranslation(translations[language], key);
        if (translation) {
          element.textContent = translation;
        }
      }
    });

    // Update placeholder texts
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = (element as HTMLElementWithDataset).dataset.i18nPlaceholder;
      if (key) {
        const translation = this.getNestedTranslation(translations[language], key);
        if (translation) {
          (element as HTMLInputElement).placeholder = translation;
        }
      }
    });

    // Update document language
    document.documentElement.lang = language;

    // Update chatbot messages
    if (this.state.chatbot.messages.length > 0) {
      const updatedMessages = [...this.state.chatbot.messages];
      updatedMessages[0] = {
        ...updatedMessages[0],
        content: translations[language].chatbot.welcome
      };
      
      this.setState({
        chatbot: {
          ...this.state.chatbot,
          messages: updatedMessages
        }
      });
      
      this.updateChatbotUI();
    }
  }

  private getNestedTranslation(obj: any, key: string): string | undefined {
    return key.split('.').reduce((o, k) => o && o[k], obj);
  }

  // Navigation Management
  private toggleNavigation(): void {
    const isOpen = !this.state.navigation.isMenuOpen;
    this.setState({
      navigation: {
        ...this.state.navigation,
        isMenuOpen: isOpen
      }
    });
    this.updateNavigationUI();
  }

  private updateNavigationUI(): void {
    const navMenu = this.elements.navMenu;
    const navToggle = this.elements.navToggle;

    if (navMenu) {
      navMenu.classList.toggle('active', this.state.navigation.isMenuOpen);
    }

    if (navToggle) {
      navToggle.classList.toggle('active', this.state.navigation.isMenuOpen);
    }
  }

  private navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      scrollToElement(element, 70);
      this.setActiveSection(sectionId);
      
      // Close mobile menu if open
      if (this.state.navigation.isMenuOpen) {
        this.setState({
          navigation: {
            ...this.state.navigation,
            isMenuOpen: false
          }
        });
        this.updateNavigationUI();
      }
    }
  }

  private setActiveSection(sectionId: string): void {
    if (this.state.navigation.activeSection === sectionId) return;

    this.setState({
      navigation: {
        ...this.state.navigation,
        activeSection: sectionId
      }
    });

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    this.emit('navigation:sectionChange', { section: sectionId });
  }

  // Chatbot Management
  private toggleChatbot(): void {
    const isOpen = !this.state.chatbot.isOpen;
    this.setState({
      chatbot: {
        ...this.state.chatbot,
        isOpen
      }
    });
    this.updateChatbotUI();
  }

  private openChatbot(): void {
    this.setState({
      chatbot: {
        ...this.state.chatbot,
        isOpen: true
      }
    });
    this.updateChatbotUI();
  }

  private closeChatbot(): void {
    this.setState({
      chatbot: {
        ...this.state.chatbot,
        isOpen: false
      }
    });
    this.updateChatbotUI();
  }

  private updateChatbotUI(): void {
    const chatbotWindow = this.elements.chatbotWindow;
    if (chatbotWindow) {
      chatbotWindow.classList.toggle('active', this.state.chatbot.isOpen);
    }

    // Update messages
    this.renderChatbotMessages();

    // Focus input when opened
    if (this.state.chatbot.isOpen) {
      setTimeout(() => {
        const input = this.elements.chatbotInput as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }, 300);
    }
  }

  private renderChatbotMessages(): void {
    const messagesContainer = this.elements.chatbotMessages;
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';

    this.state.chatbot.messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${message.role}-message`;
      
      const messageContent = document.createElement('span');
      messageContent.textContent = message.content;
      
      messageElement.appendChild(messageContent);
      messagesContainer.appendChild(messageElement);
    });

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  private async sendMessage(): Promise<void> {
    const input = this.elements.chatbotInput as HTMLInputElement;
    if (!input || !input.value.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId('msg_'),
      content: input.value.trim(),
      role: 'user',
      timestamp: new Date()
    };

    // Add user message
    this.setState({
      chatbot: {
        ...this.state.chatbot,
        messages: [...this.state.chatbot.messages, userMessage],
        isTyping: true
      }
    });

    // Clear input
    input.value = '';

    this.updateChatbotUI();

    try {
      // Simulate AI response
      const response = await this.generateAIResponse(userMessage.content);
      
      const aiMessage: ChatMessage = {
        id: generateId('msg_'),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      this.setState({
        chatbot: {
          ...this.state.chatbot,
          messages: [...this.state.chatbot.messages, aiMessage],
          isTyping: false,
          conversationHistory: [...this.state.chatbot.conversationHistory, userMessage.content, response]
        }
      });

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: generateId('msg_'),
        content: translations[this.state.language].chatbot.error,
        role: 'assistant',
        timestamp: new Date()
      };

      this.setState({
        chatbot: {
          ...this.state.chatbot,
          messages: [...this.state.chatbot.messages, errorMessage],
          isTyping: false
        }
      });

      this.handleError(error as Error, 'Chatbot response failed');
    }

    this.updateChatbotUI();
    this.emit('chatbot:messageReceived', { message: userMessage });
  }

  private async generateAIResponse(message: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = message.toLowerCase();

    // Simple keyword-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('こんにちは')) {
      return this.state.language === 'ja' 
        ? 'こんにちは！NEXUTHAのサービスについて何かご質問はありますか？'
        : 'Hello! Do you have any questions about NEXUTHA\'s services?';
    }

    if (lowerMessage.includes('service') || lowerMessage.includes('サービス')) {
      return this.state.language === 'ja'
        ? 'NEXUTHAは以下のサービスを提供しています：\n• プロンプトエンジニアリング\n• 音楽制作\n• レーザーアート\n• AI自動化システム\n\nどのサービスについて詳しく知りたいですか？'
        : 'NEXUTHA offers the following services:\n• Prompt Engineering\n• Music Production\n• Laser Art\n• AI Automation Systems\n\nWhich service would you like to know more about?';
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('料金') || lowerMessage.includes('価格')) {
      return this.state.language === 'ja'
        ? '料金はプロジェクトの規模と要件によって異なります。詳細なお見積もりをご希望でしたら、具体的なプロジェクト内容をお聞かせください。'
        : 'Pricing varies depending on project scope and requirements. For a detailed quote, please tell us about your specific project needs.';
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('連絡') || lowerMessage.includes('問い合わせ')) {
      return this.state.language === 'ja'
        ? 'お問い合わせありがとうございます。プロジェクトの詳細を教えていただけますか？ご要望に合わせて最適なソリューションをご提案いたします。'
        : 'Thank you for your interest! Could you tell us more about your project details? We\'ll propose the best solution for your needs.';
    }

    // Default response
    return this.state.language === 'ja'
      ? 'ご質問ありがとうございます。NEXUTHAはAI、音楽、テクノロジーを融合させた革新的なサービスを提供しています。具体的にどのようなことをお手伝いできるでしょうか？'
      : 'Thank you for your question! NEXUTHA provides innovative services that combine AI, music, and technology. How specifically can I help you today?';
  }

  // Public API
  public getState(): Readonly<AppState> {
    return this.state;
  }

  public getConfig(): Readonly<AppConfig> {
    return CONFIG;
  }

  public destroy(): void {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Remove event listeners
    this.removeAllListeners();

    console.log('NEXUTHA App destroyed');
  }
}

// Initialize application when DOM is ready
let app: NEXUTHAApp | null = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp(): void {
  try {
    app = new NEXUTHAApp();
    
    // Expose to global scope for debugging
    if (window) {
      (window as any).NEXUTHAApp = {
        instance: app,
        version: CONFIG.version,
        config: CONFIG,
        utils: { storage, throttle, debounce, generateId }
      };
    }
  } catch (error) {
    console.error('Failed to initialize NEXUTHA App:', error);
    
    // Show error message to user
    const errorElement = document.createElement('div');
    errorElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ef4444;
      color: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      z-index: 9999;
      font-family: system-ui, sans-serif;
    `;
    errorElement.innerHTML = `
      <h2>Application Error</h2>
      <p>Failed to initialize NEXUTHA. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: white; color: #ef4444; border: none; border-radius: 4px; cursor: pointer;">
        Refresh Page
      </button>
    `;
    document.body.appendChild(errorElement);
  }
}

// Handle page unload
window.addEventListener('beforeunload', () => {
  if (app) {
    app.destroy();
  }
});

export { NEXUTHAApp, CONFIG };
export type { AppState, AppConfig };