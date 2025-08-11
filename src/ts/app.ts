import { Language } from './types';
import { translations } from './translations';
import { chatbotUI } from './chatbot-ui';
import { ParticleSystem, LiveStatusUpdater } from './particle-system';

export class NexuthaApp {
  private currentLanguage: Language = 'ja';
  private currentTheme: 'dark' | 'light' = 'dark';
  private particleSystem: ParticleSystem | null = null;
  private liveStatusUpdater: LiveStatusUpdater | null = null;
  private isPlaying: boolean = false;
  private meshGradient: HTMLElement | null = null;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupApp();
      });
    } else {
      this.setupApp();
    }
  }

  private setupApp(): void {
    this.setupParticles();
    this.setupMeshGradient();
    this.setupEventListeners();
    this.setupAnimations();
    this.setupLiveStatus();
    this.setupRealtimeStats();
    this.updateLanguage();
    
    // Initialize chatbot UI
    chatbotUI.setLanguage(this.currentLanguage);
    chatbotUI.showWelcomeMessage();
    
    console.log('NEXUTHA App initialized successfully');
  }

  private setupParticles(): void {
    this.particleSystem = new ParticleSystem('particles', {
      count: 50,
      colors: [
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)',
        'var(--accent-quaternary)'
      ]
    });
    this.particleSystem.initialize();
  }

  private setupMeshGradient(): void {
    this.meshGradient = document.querySelector('.mesh-gradient');
    if (this.meshGradient) {
      document.addEventListener('mousemove', (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        if (this.meshGradient) {
          this.meshGradient.style.setProperty('--mouse-x', `${x}%`);
          this.meshGradient.style.setProperty('--mouse-y', `${y}%`);
        }
      });
    }
  }

  private setupLiveStatus(): void {
    this.liveStatusUpdater = new LiveStatusUpdater('liveStatus');
    this.liveStatusUpdater.setLanguage(this.currentLanguage);
    this.liveStatusUpdater.startAutoUpdate(8000); // Update every 8 seconds
  }

  private setupRealtimeStats(): void {
    // Update time and date every second
    setInterval(() => {
      this.updateDateTime();
    }, 1000);

    // Simulate visitor count updates
    this.updateVisitorStats();
    setInterval(() => {
      this.updateVisitorStats();
    }, 30000); // Update every 30 seconds
  }

  private updateDateTime(): void {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    if (timeElement) {
      timeElement.textContent = now.toLocaleTimeString(
        this.currentLanguage === 'ja' ? 'ja-JP' : 'en-US'
      );
    }
    
    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString(
        this.currentLanguage === 'ja' ? 'ja-JP' : 'en-US'
      );
    }
  }

  private updateVisitorStats(): void {
    const visitorsElement = document.getElementById('visitorCount');
    const projectsElement = document.getElementById('projectCount');
    
    if (visitorsElement) {
      const currentCount = parseInt(visitorsElement.textContent || '1247');
      const increment = Math.floor(Math.random() * 3) + 1;
      visitorsElement.textContent = (currentCount + increment).toString();
    }
    
    if (projectsElement) {
      // Occasionally increment project count
      if (Math.random() < 0.1) { // 10% chance
        const currentCount = parseInt(projectsElement.textContent || '89');
        projectsElement.textContent = (currentCount + 1).toString();
      }
    }
  }

  private setupEventListeners(): void {
    // Language switching
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const lang = target.getAttribute('data-lang') as Language;
        if (lang) {
          this.setLanguage(lang);
        }
      });
    });

    // Theme switching
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Music player
    const playButton = document.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', () => {
        this.togglePlay();
      });
    }

    // Founder message expand/collapse
    const expandToggle = document.getElementById('expandToggle');
    if (expandToggle) {
      expandToggle.addEventListener('click', () => {
        this.toggleFounderMessage();
      });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        this.handleContactForm(e);
      });
    }
  }

  private setupAnimations(): void {
    // Loader
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
          loader.classList.add('hidden');
        }
      }, 3000);
    });

    // Progress bar on scroll
    let ticking = false;
    const updateProgressBar = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgressBar);
        ticking = true;
      }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'fadeInUp 0.8s ease forwards';
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      (section as HTMLElement).style.opacity = '0';
      observer.observe(section);
    });

    // Development progress bars animation
    this.animateProgressBars();
  }

  private animateProgressBars(): void {
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressValues = [75, 60, 40]; // AI System, Decision Engine, Robotics
    
    progressBars.forEach((bar, index) => {
      const element = bar as HTMLElement;
      const value = progressValues[index] || 0;
      
      setTimeout(() => {
        element.style.width = `${value}%`;
        element.textContent = `${value}%`;
      }, 500 + (index * 200));
    });
  }

  public setLanguage(language: Language): void {
    this.currentLanguage = language;
    
    // Update language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === language);
    });

    // Update all translatable elements
    this.updateLanguage();
    
    // Update chatbot language
    chatbotUI.setLanguage(language);
    
    // Update live status language
    if (this.liveStatusUpdater) {
      this.liveStatusUpdater.setLanguage(language);
      this.liveStatusUpdater.updateStatus();
    }
  }

  private updateLanguage(): void {
    const t = translations[this.currentLanguage];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (key && this.getTranslationValue(t, key)) {
        element.textContent = this.getTranslationValue(t, key);
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      if (key && this.getTranslationValue(t, key)) {
        (element as HTMLInputElement).placeholder = this.getTranslationValue(t, key);
      }
    });

    // Update document title and meta tags
    document.title = t.meta.title;
    
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', t.meta.description);
    }
  }

  private getTranslationValue(obj: any, key: string): string {
    return key.split('.').reduce((o, k) => o && o[k], obj) || '';
  }

  public toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Update theme toggle button text
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
    }

    // Update particle colors for new theme
    if (this.particleSystem && this.currentTheme === 'light') {
      this.particleSystem.updateColors([
        '#6366f1',
        '#8b5cf6', 
        '#06b6d4',
        '#f59e0b'
      ]);
    } else if (this.particleSystem) {
      this.particleSystem.updateColors([
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)',
        'var(--accent-quaternary)'
      ]);
    }
  }

  private togglePlay(): void {
    const button = document.querySelector('.play-button');
    if (!button) return;

    this.isPlaying = !this.isPlaying;
    button.textContent = this.isPlaying ? '⏸️' : '▶️';
    
    // Add visual feedback
    if (this.isPlaying) {
      button.classList.add('playing');
    } else {
      button.classList.remove('playing');
    }
  }

  private toggleFounderMessage(): void {
    const fullMessage = document.getElementById('fullMessage');
    const expandToggle = document.getElementById('expandToggle');
    
    if (!fullMessage || !expandToggle) return;

    const isExpanded = !fullMessage.classList.contains('hidden');
    
    if (isExpanded) {
      fullMessage.classList.add('hidden');
      expandToggle.textContent = this.currentLanguage === 'ja' ? '続きを読む' : 'Read More';
    } else {
      fullMessage.classList.remove('hidden');
      expandToggle.textContent = this.currentLanguage === 'ja' ? '閉じる' : 'Close';
    }
  }

  private handleContactForm(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    const emailBody = `
お名前: ${name}
メールアドレス: ${email}
件名: ${subject}

メッセージ:
${message}

---
NEXUTHA ウェブサイトからの問い合わせ
送信日時: ${new Date().toLocaleString('ja-JP')}
    `.trim();
    
    const mailtoUrl = `mailto:runa.yasu@icloud.com?subject=${encodeURIComponent('【NEXUTHA】' + subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoUrl;
    form.reset();
    this.showNotification(
      this.currentLanguage === 'ja' 
        ? 'メールクライアントが開きました。送信を完了してください。' 
        : 'Mail client opened. Please complete sending.'
    );
  }

  private showNotification(message: string): void {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 136, 0.9);
        color: #000;
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 1.1rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 255, 136, 0.5);
        animation: fadeInOut 3s ease-in-out;
      ">
        ${message}
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Utility methods for external access
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  public getCurrentTheme(): 'dark' | 'light' {
    return this.currentTheme;
  }

  public getParticleSystem(): ParticleSystem | null {
    return this.particleSystem;
  }

  public destroy(): void {
    if (this.particleSystem) {
      this.particleSystem.destroy();
    }
    if (this.liveStatusUpdater) {
      this.liveStatusUpdater.destroy();
    }
  }
}

// Initialize app when script loads
export const nexuthaApp = new NexuthaApp();