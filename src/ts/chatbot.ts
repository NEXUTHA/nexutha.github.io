import { Language } from './types';
import { translations } from './translations';

interface KnowledgeBase {
  company: {
    name: string;
    founded: string;
    ceo: string;
    vision: string;
    mission: string;
    values: string[];
    location: string;
    employees: string;
    culture: string;
  };
  services: {
    music: {
      overview: string;
      technology: string;
      genres: string[];
      platforms: string[];
      latest: string;
      collaboration: string;
      pricing: string;
    };
    xtool: {
      overview: string;
      materials: string[];
      capabilities: string[];
      applications: string[];
      quality: string;
      turnaround: string;
      pricing: string;
      marketplace: string;
    };
    ai: {
      overview: string;
      specialties: string[];
      services: string[];
      benefits: string[];
      consultation: string;
      pricing: string;
    };
    automation: {
      overview: string;
      components: string[];
      progress: string;
      timeline: string;
      target: string;
      roi: string;
    };
  };
  technology: {
    ai: string[];
    hardware: string[];
    software: string[];
    platforms: string[];
    databases: string[];
    integration: string;
  };
  pricing: {
    consultation: string;
    music: string;
    xtool: string;
    ai: string;
    enterprise: string;
    subscription: string;
    payment: string;
  };
  development: {
    current: string;
    roadmap: string[];
    investment: string;
    patents: string;
    research: string;
    expansion: string;
  };
  team: {
    ceo: string;
    expertise: string[];
    advisors: string;
    recruitment: string;
    culture: string;
  };
  contact: {
    email: string;
    website: string;
    note: string;
    response_time: string;
    languages: string[];
    meeting: string;
    office_hours: string;
  };
  faq: { [key: string]: string };
}

const knowledgeBase: { [key in Language]: KnowledgeBase } = {
  ja: {
    company: {
      name: "NEXUTHA",
      founded: "2024年",
      ceo: "音楽プロデューサー・自動化システム開発者",
      vision: "完全自動収益化システム搭載ロボットの開発により、人間の創造性を最大化する",
      mission: "単純作業からの完全解放を通じて、人類の働き方と生き方を根本から変革する",
      values: ["革新性", "創造性", "効率性", "人間性の尊重", "技術による社会貢献"],
      location: "日本（グローバル展開予定）",
      employees: "少数精鋭チーム",
      culture: "創造性を最大化し、テクノロジーで人類の可能性を拡張することを使命とする"
    },
    services: {
      music: {
        overview: "ON:μとNEXUTHA名義でApple Music、Spotify等で楽曲配信中",
        technology: "Suno AIを活用した革新的音楽制作",
        genres: ["エレクトロニック", "アンビエント", "テクノ", "フューチャーベース"],
        platforms: ["Apple Music", "Spotify", "YouTube Music", "Amazon Music"],
        latest: "Cyber Dreams（ON:μ）が好評配信中",
        collaboration: "アーティストとのコラボレーション、リミックス制作も対応",
        pricing: "楽曲制作：50,000円〜、リミックス：30,000円〜（要相談）"
      },
      xtool: {
        overview: "木材・ステンレス・アクリルの精密レーザー加工サービス",
        materials: ["天然木材", "ステンレス鋼", "アクリル", "革", "紙", "段ボール"],
        capabilities: ["精密彫刻", "カット加工", "オーダーメイド対応", "白黒画像の完璧再現"],
        applications: ["記念品", "看板", "アクセサリー", "インテリア", "プロトタイプ"],
        quality: "プロ仕様の精度で、0.1mm単位の精密加工が可能",
        turnaround: "通常3-7営業日（サイズ・複雑さによる）",
        pricing: "木材：2,000円〜、ステンレス：3,000円〜、アクリル：1,500円〜（サイズ・デザインによる）",
        marketplace: "メルカリでも作品販売中"
      },
      ai: {
        overview: "ChatGPT最適化プロンプト作成、SNS自動化、記事制作効率化",
        specialties: ["プロンプトエンジニアリング", "自動化システム構築", "コンテンツ最適化"],
        services: ["note記事構成プロンプト", "SNS投稿自動化", "YouTube台本生成", "セールスライティング"],
        benefits: ["作業時間を80%短縮", "コンテンツ品質向上", "継続的な収益化支援"],
        consultation: "初回無料相談、継続サポートプランあり",
        pricing: "プロンプト作成：10,000円〜、自動化システム：50,000円〜（要相談）"
      },
      automation: {
        overview: "市場分析から販売まで全工程を自動化する完全収益化システム",
        components: ["AI市場分析エンジン", "自動商品企画システム", "生産管理AI", "販売最適化AI", "顧客対応ボット"],
        progress: "システム全体75%完成、AI意思決定エンジン60%、ロボティクス統合40%",
        timeline: "2025年内プロトタイプ完成、2026年β版リリース予定",
        target: "中小企業から大企業まで、あらゆる規模のビジネスに対応",
        roi: "導入企業で平均300%の収益向上を目標"
      }
    },
    technology: {
      ai: ["GPT-4", "Claude", "Suno AI", "機械学習", "自然言語処理", "コンピュータビジョン"],
      hardware: ["xTool レーザーカッター", "3Dプリンター", "ロボティクス機器", "IoTセンサー"],
      software: ["Python", "JavaScript", "React", "Node.js", "TensorFlow", "PyTorch"],
      platforms: ["AWS", "Google Cloud", "Microsoft Azure", "Vercel", "GitHub"],
      databases: ["PostgreSQL", "MongoDB", "Redis", "Vector DB"],
      integration: "API連携、Webhook、リアルタイム同期に対応"
    },
    pricing: {
      consultation: "初回相談：無料（60分）",
      music: "楽曲制作：50,000円〜、リミックス：30,000円〜",
      xtool: "木材加工：2,000円〜、金属加工：3,000円〜、アクリル：1,500円〜",
      ai: "プロンプト作成：10,000円〜、自動化システム：50,000円〜",
      enterprise: "大企業向けカスタムソリューション：要相談",
      subscription: "継続サポート：月額30,000円〜",
      payment: "銀行振込、クレジットカード、PayPal対応"
    },
    development: {
      current: "完全自動収益化システムv1.0開発中（進捗75%）",
      roadmap: ["2025年Q1: プロトタイプ完成", "2025年Q2: α版テスト", "2025年Q4: β版リリース", "2026年: 正式版リリース"],
      investment: "戦略的パートナー・投資家募集中（シリーズA想定：5億円）",
      patents: "自動化システムに関する特許申請準備中",
      research: "東京大学、スタンフォード大学との共同研究検討中",
      expansion: "10年以内の世界展開を目標（アジア→北米→欧州の順）"
    },
    team: {
      ceo: "音楽プロデューサー・自動化システム開発者",
      expertise: ["AI開発", "音楽制作", "ビジネス戦略", "マーケティング", "製造技術"],
      advisors: "業界エキスパート、投資家、学術関係者",
      recruitment: "AI エンジニア、ロボティクス専門家、ビジネス開発担当者を募集中",
      culture: "リモートワーク推奨、成果主義、学習機会提供"
    },
    contact: {
      email: "runa.yasu@icloud.com",
      website: "https://nexutha.com",
      note: "https://note.com/watashi_hou",
      response_time: "24時間以内（営業日）",
      languages: ["日本語", "英語"],
      meeting: "Zoom、Google Meet、対面会議対応",
      office_hours: "平日9:00-18:00（JST）"
    },
    faq: {
      "最低発注額": "プロジェクトにより異なりますが、最低10,000円から承ります",
      "納期": "内容により3日〜4週間程度",
      "保証": "品質保証付き、修正対応あり",
      "秘密保持": "NDA締結可能",
      "支払い": "前払い50%、納品後50%が基本",
      "キャンセル": "制作開始前なら全額返金、制作開始後は進捗に応じて決定"
    }
  },
  en: {
    company: {
      name: "NEXUTHA",
      founded: "2024",
      ceo: "Music Producer & Automation System Developer",
      vision: "Maximize human creativity through robots with fully automated revenue systems",
      mission: "Transform how humanity works and lives through complete liberation from simple tasks",
      values: ["Innovation", "Creativity", "Efficiency", "Respect for Humanity", "Social Contribution through Technology"],
      location: "Japan (Global expansion planned)",
      employees: "Elite small team",
      culture: "Mission to maximize creativity and expand human potential through technology"
    },
    services: {
      music: {
        overview: "Music distribution on Apple Music, Spotify under ON:μ and NEXUTHA",
        technology: "Innovative music production using Suno AI",
        genres: ["Electronic", "Ambient", "Techno", "Future Bass"],
        platforms: ["Apple Music", "Spotify", "YouTube Music", "Amazon Music"],
        latest: "Cyber Dreams (ON:μ) currently streaming",
        collaboration: "Artist collaborations and remix production available",
        pricing: "Music production: $350+, Remix: $200+ (negotiable)"
      },
      xtool: {
        overview: "Precision laser processing of wood, stainless steel, and acrylic",
        materials: ["Natural wood", "Stainless steel", "Acrylic", "Leather", "Paper", "Cardboard"],
        capabilities: ["Precision engraving", "Cut processing", "Custom orders", "Perfect black & white image reproduction"],
        applications: ["Commemorative items", "Signs", "Accessories", "Interior", "Prototypes"],
        quality: "Professional precision with 0.1mm accuracy",
        turnaround: "Usually 3-7 business days (depending on size/complexity)",
        pricing: "Wood: $15+, Stainless: $20+, Acrylic: $10+ (varies by size/design)",
        marketplace: "Also selling works on Mercari"
      },
      ai: {
        overview: "ChatGPT optimization, SNS automation, article creation efficiency",
        specialties: ["Prompt Engineering", "Automation System Construction", "Content Optimization"],
        services: ["Note article prompts", "SNS automation", "YouTube script generation", "Sales writing"],
        benefits: ["80% work time reduction", "Content quality improvement", "Continuous monetization support"],
        consultation: "Free initial consultation, ongoing support plans available",
        pricing: "Prompt creation: $70+, Automation system: $350+ (negotiable)"
      },
      automation: {
        overview: "Complete revenue system automating all processes from market analysis to sales",
        components: ["AI market analysis", "Auto product planning", "Production management AI", "Sales optimization", "Customer service bot"],
        progress: "System 75% complete, AI decision engine 60%, robotics integration 40%",
        timeline: "Prototype completion 2025, β version release 2026",
        target: "Supporting businesses of all sizes from SMEs to enterprises",
        roi: "Target 300% average revenue improvement for implementing companies"
      }
    },
    technology: {
      ai: ["GPT-4", "Claude", "Suno AI", "Machine Learning", "Natural Language Processing", "Computer Vision"],
      hardware: ["xTool Laser Cutter", "3D Printer", "Robotics Equipment", "IoT Sensors"],
      software: ["Python", "JavaScript", "React", "Node.js", "TensorFlow", "PyTorch"],
      platforms: ["AWS", "Google Cloud", "Microsoft Azure", "Vercel", "GitHub"],
      databases: ["PostgreSQL", "MongoDB", "Redis", "Vector DB"],
      integration: "API integration, Webhook, real-time synchronization support"
    },
    pricing: {
      consultation: "Initial consultation: Free (60 minutes)",
      music: "Music production: $350+, Remix: $200+",
      xtool: "Wood processing: $15+, Metal processing: $20+, Acrylic: $10+",
      ai: "Prompt creation: $70+, Automation system: $350+",
      enterprise: "Custom solutions for enterprises: Negotiable",
      subscription: "Ongoing support: $200+/month",
      payment: "Bank transfer, credit card, PayPal supported"
    },
    development: {
      current: "Full automation revenue system v1.0 in development (75% progress)",
      roadmap: ["2025 Q1: Prototype completion", "2025 Q2: α version testing", "2025 Q4: β version release", "2026: Official release"],
      investment: "Seeking strategic partners and investors (Series A: $3.5M target)",
      patents: "Patent applications in preparation for automation systems",
      research: "Considering joint research with University of Tokyo and Stanford University",
      expansion: "Global expansion within 10 years (Asia → North America → Europe)"
    },
    team: {
      ceo: "Music Producer & Automation System Developer",
      expertise: ["AI Development", "Music Production", "Business Strategy", "Marketing", "Manufacturing Technology"],
      advisors: "Industry experts, investors, academic relations",
      recruitment: "Recruiting AI engineers, robotics specialists, business development staff",
      culture: "Remote work encouraged, merit-based, learning opportunities provided"
    },
    contact: {
      email: "runa.yasu@icloud.com",
      website: "https://nexutha.com",
      note: "https://note.com/watashi_hou",
      response_time: "Within 24 hours (business days)",
      languages: ["Japanese", "English"],
      meeting: "Zoom, Google Meet, in-person meetings supported",
      office_hours: "Weekdays 9:00-18:00 (JST)"
    },
    faq: {
      "Minimum order": "Varies by project, but starts from $70",
      "Delivery": "3 days to 4 weeks depending on content",
      "Guarantee": "Quality guarantee included, revision support",
      "Confidentiality": "NDA available",
      "Payment": "Basic: 50% upfront, 50% on delivery",
      "Cancellation": "Full refund before production starts, decided according to progress after start"
    }
  }
};

interface ConversationMessage {
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export class NexuthaChatbot {
  private currentLanguage: Language = 'ja';
  private isProcessing: boolean = false;
  private conversationHistory: ConversationMessage[] = [];

  setLanguage(language: Language): void {
    this.currentLanguage = language;
  }

  generateEnhancedAIResponse(userMessage: string): string {
    const lang = this.currentLanguage;
    const kb = knowledgeBase[lang];
    const message = userMessage.toLowerCase();
    
    // Company information
    if (message.includes('会社') || message.includes('nexutha') || message.includes('について') || 
        message.includes('company') || message.includes('about') || message.includes('overview')) {
      return lang === 'ja' ? 
        `🏢 **NEXUTHAについて**

**創設**: ${kb.company.founded}
**代表**: ${kb.company.ceo}
**ビジョン**: ${kb.company.vision}

**企業文化**: ${kb.company.culture}

**価値観**: 
${kb.company.values.map(v => `• ${v}`).join('\n')}

**拠点**: ${kb.company.location}

私たちは21世紀の技術革新と人間性の調和を目指す革新的企業です。何か具体的にお聞きになりたいことはありますか？` :
        `🏢 **About NEXUTHA**

**Founded**: ${kb.company.founded}
**CEO**: ${kb.company.ceo}
**Vision**: ${kb.company.vision}

**Culture**: ${kb.company.culture}

**Values**: 
${kb.company.values.map(v => `• ${v}`).join('\n')}

**Location**: ${kb.company.location}

We are an innovative company aiming for harmony between 21st century technological innovation and humanity. Is there anything specific you'd like to know?`;
    }

    // Services overview
    if (message.includes('サービス') || message.includes('service') || message.includes('事業')) {
      return lang === 'ja' ?
        `🎯 **NEXUTHAの主要サービス**

🎵 **音楽制作**
${kb.services.music.overview}
• 対応ジャンル: ${kb.services.music.genres.join('、')}
• 配信プラットフォーム: ${kb.services.music.platforms.join('、')}
• 料金: ${kb.services.music.pricing}

⚡ **xTool精密加工**
${kb.services.xtool.overview}
• 対応素材: ${kb.services.xtool.materials.join('、')}
• 精度: ${kb.services.xtool.quality}
• 料金: ${kb.services.xtool.pricing}

🤖 **AI活用コンサルティング**
${kb.services.ai.overview}
• 専門分野: ${kb.services.ai.specialties.join('、')}
• 効果: ${kb.services.ai.benefits.join('、')}
• 料金: ${kb.services.ai.pricing}

🚀 **完全自動化システム**
${kb.services.automation.overview}
• 進捗: ${kb.services.automation.progress}
• 目標: ${kb.services.automation.roi}

どのサービスについて詳しくお聞きになりますか？` :
        `🎯 **NEXUTHA's Main Services**

🎵 **Music Production**
${kb.services.music.overview}
• Genres: ${kb.services.music.genres.join(', ')}
• Platforms: ${kb.services.music.platforms.join(', ')}
• Pricing: ${kb.services.music.pricing}

⚡ **xTool Precision Processing**
${kb.services.xtool.overview}
• Materials: ${kb.services.xtool.materials.join(', ')}
• Quality: ${kb.services.xtool.quality}
• Pricing: ${kb.services.xtool.pricing}

🤖 **AI Consulting**
${kb.services.ai.overview}
• Specialties: ${kb.services.ai.specialties.join(', ')}
• Benefits: ${kb.services.ai.benefits.join(', ')}
• Pricing: ${kb.services.ai.pricing}

🚀 **Complete Automation System**
${kb.services.automation.overview}
• Progress: ${kb.services.automation.progress}
• Target: ${kb.services.automation.roi}

Which service would you like to know more about?`;
    }

    // Pricing information
    if (message.includes('料金') || message.includes('価格') || message.includes('費用') || 
        message.includes('pricing') || message.includes('cost') || message.includes('price')) {
      return lang === 'ja' ?
        `💰 **NEXUTHA 料金体系**

**相談・コンサルティング**
${kb.pricing.consultation}

**音楽制作**
${kb.pricing.music}

**xTool加工**
${kb.pricing.xtool}

**AI・自動化**
${kb.pricing.ai}

**継続サポート**
${kb.pricing.subscription}

**支払い方法**
${kb.pricing.payment}

**企業向けプラン**
${kb.pricing.enterprise}

まずは無料相談から始めませんか？具体的なプロジェクト内容をお聞かせいただければ、詳細なお見積もりをご提案いたします。` :
        `💰 **NEXUTHA Pricing Structure**

**Consultation**
${kb.pricing.consultation}

**Music Production**
${kb.pricing.music}

**xTool Processing**
${kb.pricing.xtool}

**AI & Automation**
${kb.pricing.ai}

**Ongoing Support**
${kb.pricing.subscription}

**Payment Methods**
${kb.pricing.payment}

**Enterprise Plans**
${kb.pricing.enterprise}

Would you like to start with a free consultation? If you tell us about your specific project, we can provide a detailed quote.`;
    }

    // Development and investment
    if (message.includes('開発') || message.includes('投資') || message.includes('将来') || 
        message.includes('development') || message.includes('investment') || message.includes('future')) {
      return lang === 'ja' ?
        `🚀 **開発状況・投資機会**

**現在の開発状況**
${kb.development.current}

**開発ロードマップ**
${kb.development.roadmap.map(r => `• ${r}`).join('\n')}

**投資機会**
${kb.development.investment}

**知的財産**
${kb.development.patents}

**研究協力**
${kb.development.research}

**拡張計画**
${kb.development.expansion}

NEXUTHAは次世代の働き方を変革する革新的技術を開発しています。戦略的パートナーシップや投資にご興味がございましたら、詳細をご説明いたします。` :
        `🚀 **Development Status & Investment Opportunities**

**Current Development**
${kb.development.current}

**Development Roadmap**
${kb.development.roadmap.map(r => `• ${r}`).join('\n')}

**Investment Opportunity**
${kb.development.investment}

**Intellectual Property**
${kb.development.patents}

**Research Collaboration**
${kb.development.research}

**Expansion Plan**
${kb.development.expansion}

NEXUTHA is developing innovative technology that will transform the future of work. If you're interested in strategic partnerships or investment, we'd be happy to provide detailed information.`;
    }

    // Music services
    if (message.includes('音楽') || message.includes('楽曲') || message.includes('on:μ') || 
        message.includes('music') || message.includes('song') || message.includes('track')) {
      return lang === 'ja' ?
        `🎵 **NEXUTHA 音楽事業詳細**

**配信中アーティスト**
• ON:μ (オンミュー)
• NEXUTHA

**最新リリース**
${kb.services.music.latest}

**対応ジャンル**
${kb.services.music.genres.join('、')}

**制作技術**
${kb.services.music.technology}

**配信プラットフォーム**
${kb.services.music.platforms.join('、')}

**コラボレーション**
${kb.services.music.collaboration}

**料金**
${kb.services.music.pricing}

**Apple Music**: https://music.apple.com/jp/artist/on-%CE%BC/1821249016
**Spotify**: https://open.spotify.com/intl-ja/artist/6mlMniZ6dIFrAgtvyNngtd

楽曲制作やコラボレーションにご興味がございましたらお聞かせください！` :
        `🎵 **NEXUTHA Music Business Details**

**Streaming Artists**
• ON:μ (On-mu)
• NEXUTHA

**Latest Release**
${kb.services.music.latest}

**Supported Genres**
${kb.services.music.genres.join(', ')}

**Production Technology**
${kb.services.music.technology}

**Streaming Platforms**
${kb.services.music.platforms.join(', ')}

**Collaboration**
${kb.services.music.collaboration}

**Pricing**
${kb.services.music.pricing}

**Apple Music**: https://music.apple.com/jp/artist/on-%CE%BC/1821249016
**Spotify**: https://open.spotify.com/intl-ja/artist/6mlMniZ6dIFrAgtvyNngtd

If you're interested in music production or collaboration, please let us know!`;
    }

    // xTool services
    if (message.includes('xtool') || message.includes('レーザー') || message.includes('加工') || 
        message.includes('木材') || message.includes('ステンレス') || message.includes('laser') || message.includes('engraving')) {
      return lang === 'ja' ?
        `⚡ **xTool精密加工サービス詳細**

**対応素材**
${kb.services.xtool.materials.join('、')}

**加工技術**
${kb.services.xtool.capabilities.join('、')}

**応用分野**
${kb.services.xtool.applications.join('、')}

**品質基準**
${kb.services.xtool.quality}

**納期**
${kb.services.xtool.turnaround}

**料金目安**
${kb.services.xtool.pricing}

**販売実績**
${kb.services.xtool.marketplace}

**メルカリ作品例**: https://jp.mercari.com/item/m86932594623

オーダーメイドのデザインや特殊な素材での加工もご相談ください。白黒画像であればほぼ完璧に再現可能です！` :
        `⚡ **xTool Precision Processing Service Details**

**Supported Materials**
${kb.services.xtool.materials.join(', ')}

**Processing Technologies**
${kb.services.xtool.capabilities.join(', ')}

**Applications**
${kb.services.xtool.applications.join(', ')}

**Quality Standards**
${kb.services.xtool.quality}

**Delivery Time**
${kb.services.xtool.turnaround}

**Pricing Guide**
${kb.services.xtool.pricing}

**Sales Record**
${kb.services.xtool.marketplace}

**Mercari Examples**: https://jp.mercari.com/item/m86932594623

Please consult us for custom designs or special material processing. We can reproduce black and white images almost perfectly!`;
    }

    // AI and automation
    if (message.includes('ai') || message.includes('自動化') || message.includes('プロンプト') || 
        message.includes('chatgpt') || message.includes('automation') || message.includes('prompt')) {
      return lang === 'ja' ?
        `🤖 **AI・自動化サービス詳細**

**専門分野**
${kb.services.ai.specialties.join('、')}

**提供サービス**
${kb.services.ai.services.join('、')}

**導入効果**
${kb.services.ai.benefits.join('、')}

**自動化システム概要**
${kb.services.automation.overview}

**システム構成要素**
${kb.services.automation.components.join('、')}

**開発進捗**
${kb.services.automation.progress}

**料金**
${kb.services.ai.pricing}

**コンサルティング**
${kb.services.ai.consultation}

ChatGPTを活用したビジネス効率化や、完全自動化システムの導入をご検討でしたら、まずは無料相談からお試しください！` :
        `🤖 **AI & Automation Service Details**

**Specialties**
${kb.services.ai.specialties.join(', ')}

**Services Offered**
${kb.services.ai.services.join(', ')}

**Implementation Benefits**
${kb.services.ai.benefits.join(', ')}

**Automation System Overview**
${kb.services.automation.overview}

**System Components**
${kb.services.automation.components.join(', ')}

**Development Progress**
${kb.services.automation.progress}

**Pricing**
${kb.services.ai.pricing}

**Consultation**
${kb.services.ai.consultation}

If you're considering ChatGPT-powered business efficiency or complete automation system implementation, please start with our free consultation!`;
    }

    // Contact information
    if (message.includes('連絡') || message.includes('問い合わせ') || message.includes('相談') || 
        message.includes('contact') || message.includes('inquiry') || message.includes('consultation')) {
      return lang === 'ja' ?
        `📞 **お問い合わせ・相談方法**

**連絡先**
• メール: ${kb.contact.email}
• ウェブサイト: ${kb.contact.website}
• note: ${kb.contact.note}

**対応時間**
${kb.contact.office_hours}

**返信時間**
${kb.contact.response_time}

**対応言語**
${kb.contact.languages.join('、')}

**会議方法**
${kb.contact.meeting}

**初回相談**
${kb.pricing.consultation}

お気軽にご相談ください。具体的なプロジェクトについて詳しくお話をお聞かせいただければ、最適なソリューションをご提案いたします！` :
        `📞 **Contact & Consultation Methods**

**Contact Information**
• Email: ${kb.contact.email}
• Website: ${kb.contact.website}
• Note: ${kb.contact.note}

**Business Hours**
${kb.contact.office_hours}

**Response Time**
${kb.contact.response_time}

**Languages**
${kb.contact.languages.join(', ')}

**Meeting Methods**
${kb.contact.meeting}

**Initial Consultation**
${kb.pricing.consultation}

Please feel free to contact us. If you tell us about your specific project in detail, we can propose the optimal solution for you!`;
    }

    // Default response
    const responses = lang === 'ja' ? [
      `こんにちは！NEXUTHAのAIアシスタントです 🤖\n\n以下についてお気軽にお聞きください：\n• 会社について\n• サービス内容\n• 料金・見積もり\n• お問い合わせ方法\n• 開発・投資情報\n\n何をお手伝いできますか？`,
      `ご質問ありがとうございます！\n\nNEXUTHAでは音楽制作、xTool精密加工、AI活用、自動化システムなど幅広いサービスを提供しています。\n\n具体的にどのようなことをお聞きになりたいですか？`,
      `お疲れさまです！✨\n\nNEXUTHAの革新的なサービスについて、何でもお聞きください。音楽、技術、自動化...あらゆる分野でお手伝いします！\n\n「サービス」「料金」「問い合わせ」などとお話しください。`
    ] : [
      `Hello! I'm NEXUTHA's AI assistant 🤖\n\nFeel free to ask about:\n• Company information\n• Service details\n• Pricing & quotes\n• Contact methods\n• Development & investment\n\nHow can I help you?`,
      `Thank you for your question!\n\nNEXUTHA offers a wide range of services including music production, xTool precision processing, AI utilization, and automation systems.\n\nWhat specifically would you like to know?`,
      `Great to meet you! ✨\n\nPlease ask anything about NEXUTHA's innovative services. We help with music, technology, automation... all fields!\n\nTry saying "services", "pricing", or "contact".`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: var(--accent-tertiary); text-decoration: underline;">$1</a>')
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul style="margin: 8px 0; padding-left: 20px;">$1</ul>');
  }

  addToHistory(sender: 'user' | 'bot', content: string): void {
    this.conversationHistory.push({
      sender,
      content,
      timestamp: new Date()
    });
    
    // Keep only last 10 messages
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
  }

  getHistory(): ConversationMessage[] {
    return [...this.conversationHistory];
  }

  setProcessing(processing: boolean): void {
    this.isProcessing = processing;
  }

  isCurrentlyProcessing(): boolean {
    return this.isProcessing;
  }
}