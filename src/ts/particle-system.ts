export interface ParticleOptions {
  count?: number;
  colors?: string[];
  minDuration?: number;
  maxDuration?: number;
  maxDelay?: number;
}

export class ParticleSystem {
  private container: HTMLElement | null = null;
  private particles: HTMLElement[] = [];
  private options: Required<ParticleOptions>;

  constructor(containerId: string, options: ParticleOptions = {}) {
    this.container = document.getElementById(containerId);
    
    // Default options
    this.options = {
      count: options.count || 50,
      colors: options.colors || [
        'var(--accent-primary)',
        'var(--accent-secondary)', 
        'var(--accent-tertiary)',
        'var(--accent-quaternary)'
      ],
      minDuration: options.minDuration || 10,
      maxDuration: options.maxDuration || 20,
      maxDelay: options.maxDelay || 15
    };
  }

  public initialize(): void {
    if (!this.container) {
      console.warn('Particle container not found');
      return;
    }

    this.createParticles();
  }

  private createParticles(): void {
    if (!this.container) return;

    // Clear existing particles
    this.clearParticles();

    for (let i = 0; i < this.options.count; i++) {
      const particle = this.createParticle(i);
      this.particles.push(particle);
      this.container.appendChild(particle);
    }
  }

  private createParticle(index: number): HTMLElement {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.setAttribute('data-particle-id', index.toString());

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation timing
    const delay = Math.random() * this.options.maxDelay;
    const duration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
    
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    // Random colors
    const primaryColor = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    const shadowColor = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    
    particle.style.background = primaryColor;
    particle.style.boxShadow = `0 0 6px ${shadowColor}`;

    // Additional styling for particles
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.7';
    particle.style.filter = 'blur(0.5px)';

    return particle;
  }

  public clearParticles(): void {
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    this.particles = [];
  }

  public updateColors(newColors: string[]): void {
    this.options.colors = newColors;
    
    // Update existing particles with new colors
    this.particles.forEach(particle => {
      const primaryColor = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
      const shadowColor = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
      
      particle.style.background = primaryColor;
      particle.style.boxShadow = `0 0 6px ${shadowColor}`;
    });
  }

  public setParticleCount(count: number): void {
    this.options.count = count;
    this.createParticles();
  }

  public pause(): void {
    this.particles.forEach(particle => {
      particle.style.animationPlayState = 'paused';
    });
  }

  public resume(): void {
    this.particles.forEach(particle => {
      particle.style.animationPlayState = 'running';
    });
  }

  public destroy(): void {
    this.clearParticles();
    this.container = null;
  }

  // Get particle count for debugging
  public getParticleCount(): number {
    return this.particles.length;
  }

  // Regenerate particles (useful for theme changes)
  public regenerate(): void {
    this.createParticles();
  }
}

// Status messages for live updates
export const statusMessages = {
  ja: [
    "制作中: Future Synthesis Vol.3",
    "ライブ配信: 22:00〜",
    "新作レーザーアート制作中",
    "コラボプロジェクト進行中",
    "プロンプト最適化研究中",
    "AI システム開発中",
    "投資家との会議予定",
    "新技術検証中"
  ],
  en: [
    "In Production: Future Synthesis Vol.3",
    "Live Stream: 10:00 PM~",
    "Creating New Laser Art",
    "Collaboration Project in Progress",
    "Prompt Optimization Research",
    "AI System Development",
    "Investor Meeting Scheduled",
    "Testing New Technology"
  ]
};

export class LiveStatusUpdater {
  private statusElement: HTMLElement | null = null;
  private currentLanguage: 'ja' | 'en' = 'ja';
  private updateInterval: number | null = null;

  constructor(elementId: string) {
    this.statusElement = document.getElementById(elementId);
  }

  public setLanguage(language: 'ja' | 'en'): void {
    this.currentLanguage = language;
  }

  public updateStatus(): void {
    if (!this.statusElement) return;

    const messages = statusMessages[this.currentLanguage];
    const randomStatus = messages[Math.floor(Math.random() * messages.length)];
    this.statusElement.textContent = randomStatus;
  }

  public startAutoUpdate(intervalMs: number = 5000): void {
    this.stopAutoUpdate();
    
    // Initial update
    this.updateStatus();
    
    // Set up interval
    this.updateInterval = window.setInterval(() => {
      this.updateStatus();
    }, intervalMs);
  }

  public stopAutoUpdate(): void {
    if (this.updateInterval !== null) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public destroy(): void {
    this.stopAutoUpdate();
    this.statusElement = null;
  }
}