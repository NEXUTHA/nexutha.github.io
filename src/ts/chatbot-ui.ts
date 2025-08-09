import { NexuthaChatbot } from './chatbot';
import { Language } from './types';
import { translations } from './translations';

export class ChatbotUI {
  private chatbot: NexuthaChatbot;
  private currentLanguage: Language = 'ja';
  private chatbotMinimized: boolean = true;
  private messagesContainer: HTMLElement | null = null;
  private userInput: HTMLInputElement | null = null;
  private sendButton: HTMLButtonElement | null = null;
  private typingIndicator: HTMLElement | null = null;
  private chatbotContainer: HTMLElement | null = null;
  private chatbotToggle: HTMLElement | null = null;

  constructor() {
    this.chatbot = new NexuthaChatbot();
    this.initialize();
  }

  private initialize(): void {
    this.messagesContainer = document.getElementById('chatMessages');
    this.userInput = document.getElementById('userInput') as HTMLInputElement;
    this.sendButton = document.getElementById('sendButton') as HTMLButtonElement;
    this.typingIndicator = document.getElementById('typingIndicator');
    this.chatbotContainer = document.getElementById('chatbotContainer');
    this.chatbotToggle = document.getElementById('chatbotToggle');

    this.setupEventListeners();
    this.setupChatbot();
  }

  private setupEventListeners(): void {
    // Send button click
    if (this.sendButton) {
      this.sendButton.addEventListener('click', () => this.sendMessage());
    }

    // Enter key press
    if (this.userInput) {
      this.userInput.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Chatbot toggle
    if (this.chatbotToggle) {
      this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
    }

    // Quick questions
    document.querySelectorAll('[data-quick-question]').forEach(button => {
      button.addEventListener('click', (event) => {
        const questionKey = (event.target as HTMLElement).getAttribute('data-quick-question');
        if (questionKey) {
          this.sendQuickQuestion(questionKey);
        }
      });
    });
  }

  private setupChatbot(): void {
    if (this.chatbotContainer) {
      this.chatbotContainer.classList.add('minimized');
    }
    this.enableChatInput();
  }

  public toggleChatbot(): void {
    if (!this.chatbotContainer || !this.chatbotToggle) return;

    this.chatbotMinimized = !this.chatbotMinimized;
    
    if (this.chatbotMinimized) {
      this.chatbotContainer.classList.add('minimized');
      this.chatbotToggle.textContent = '💬';
    } else {
      this.chatbotContainer.classList.remove('minimized');
      this.chatbotToggle.textContent = '✖️';
      
      // Scroll to bottom after animation
      setTimeout(() => {
        if (this.messagesContainer) {
          this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
      }, 300);
    }
  }

  private enableChatInput(): void {
    if (this.userInput && this.sendButton) {
      this.userInput.disabled = false;
      this.sendButton.disabled = false;
      this.userInput.placeholder = this.currentLanguage === 'ja' ? 'メッセージを入力...' : 'Type a message...';
    }
  }

  private disableChatInput(message: string): void {
    if (this.userInput && this.sendButton) {
      this.userInput.disabled = true;
      this.sendButton.disabled = true;
      this.userInput.placeholder = message;
    }
  }

  private sendQuickQuestion(questionKey: string): void {
    const t = translations[this.currentLanguage];
    const question = (t as any).quickQuestions?.[questionKey];
    if (question && this.userInput) {
      this.userInput.value = question;
      this.sendMessage();
    }
  }

  public async sendMessage(): Promise<void> {
    if (!this.userInput || !this.messagesContainer) return;

    const message = this.userInput.value.trim();
    
    if (!message || this.chatbot.isCurrentlyProcessing()) return;
    
    this.addMessage(message, 'user');
    this.userInput.value = '';
    
    this.chatbot.setProcessing(true);
    this.showTypingIndicator();
    this.disableChatInput('送信中...');
    
    try {
      const response = this.chatbot.generateEnhancedAIResponse(message);
      
      // Simulate processing delay for more natural feel
      const delay = 1500 + Math.random() * 2000;
      setTimeout(() => {
        this.addMessage(response, 'bot');
        this.chatbot.setProcessing(false);
        this.hideTypingIndicator();
        this.enableChatInput();
        if (this.userInput) {
          this.userInput.focus();
        }
      }, delay);
      
    } catch (error) {
      console.error('AI Response Error:', error);
      const errorMsg = this.currentLanguage === 'ja' 
        ? '申し訳ございません。一時的に応答できません。お問い合わせフォームからご連絡ください。'
        : 'I apologize, but I cannot respond temporarily. Please contact us through the contact form.';
      this.addMessage(errorMsg, 'bot');
      
      this.chatbot.setProcessing(false);
      this.hideTypingIndicator();
      this.enableChatInput();
      if (this.userInput) {
        this.userInput.focus();
      }
    }
  }

  private addMessage(content: string, sender: 'user' | 'bot'): void {
    if (!this.messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const formattedContent = this.chatbot.formatMessage(content);
    messageContent.innerHTML = `<p>${formattedContent}</p>`;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString(
      this.currentLanguage === 'ja' ? 'ja-JP' : 'en-US', 
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    );
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    
    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    
    this.chatbot.addToHistory(sender, content);
  }

  private showTypingIndicator(): void {
    if (this.typingIndicator) {
      this.typingIndicator.style.display = 'flex';
    }
  }

  private hideTypingIndicator(): void {
    if (this.typingIndicator) {
      this.typingIndicator.style.display = 'none';
    }
  }

  public setLanguage(language: Language): void {
    this.currentLanguage = language;
    this.chatbot.setLanguage(language);
    this.updatePlaceholders();
  }

  private updatePlaceholders(): void {
    if (this.userInput && !this.chatbot.isCurrentlyProcessing()) {
      this.userInput.placeholder = this.currentLanguage === 'ja' ? 'メッセージを入力...' : 'Type a message...';
    }
  }

  public showWelcomeMessage(): void {
    const welcomeMessage = this.currentLanguage === 'ja' 
      ? 'こんにちは！NEXUTHAのAIアシスタントです 🤖\n\n何でもお気軽にお聞きください。サービス、料金、お問い合わせ方法など、なんでもお答えします！'
      : 'Hello! I\'m NEXUTHA\'s AI assistant 🤖\n\nFeel free to ask me anything. Services, pricing, contact methods - I\'m here to help!';
    
    setTimeout(() => {
      this.addMessage(welcomeMessage, 'bot');
    }, 1000);
  }
}

// Export singleton instance
export const chatbotUI = new ChatbotUI();