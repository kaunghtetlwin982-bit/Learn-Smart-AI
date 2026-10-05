const en = {
  common: {
    home: 'Home', questions: 'Questions', saved: 'Saved', me: 'Me', cancel: 'Cancel', close: 'Close', selected: 'Selected',
    allSubjects: 'All Subjects', allChapters: 'All Chapters', allLevels: 'All Levels', clearFilters: 'Clear filters',
    easy: 'Easy', medium: 'Medium', hard: 'Hard', question: 'Question', answer: 'Answer', explanation: 'Explanation',
    learningResources: 'Learning Resources', grade11: 'Grade 11', academicYear: '2026 Academic Year',
    subject: 'Subject', subjects: 'Subjects', savedCount: 'Saved', viewed: 'Viewed', progress: 'Progress',
    search: 'Search questions...', noResults: 'No results for "{query}"',
  },
  home: {
    gradeYear: 'Grade 11 • 2026', greeting: 'Ready to learn today? 📚', search: 'Search questions, topics...',
    searchResults: 'Search Results', learningTopics: 'Learning Topics', continueLearning: 'Continue Learning',
    viewAll: 'View all', progressOverview: 'Progress Overview', recentQuestions: 'Recent Questions', seeAll: 'See all',
    savedQuestion: '{count} Saved Question{plural}', reviewSaved: 'Tap to review your saved questions',
  },
  bank: {
    title: 'Question Bank', search: 'Search by topic or keyword...', count: '{count} Question{plural}',
    noQuestions: 'No questions found', adjustSearch: 'Try adjusting your search or filters to find questions.',
    clearFilters: 'Clear Filters', view: 'View →',
  },
  detail: { saved: 'Question Saved ✓', save: 'Save Question', askAI: 'Ask AI', resources: 'Resources' },
  quiz: {
    title: 'Quiz', homeCard: 'Quick Quiz', cardDescription: 'Challenge yourself with a few questions.',
    setup: 'Set up your quiz', chooseSubject: 'Choose Subject', chooseDifficulty: 'Choose Difficulty', numberQuestions: 'Number of Questions',
    allDifficulties: 'All Difficulties', allAvailable: 'All Available ({count})', questionCount: '{count} Questions',
    available: '{count} questions available', noAvailable: 'No questions match these choices.', changeFilters: 'Choose another subject or difficulty.',
    start: 'Start Quiz', exit: 'Exit Quiz', questionOf: 'Question {current} / {total}', score: 'Score',
    correct: 'Correct', wrong: 'Wrong', selectAnswer: 'Choose the best answer.', correctFeedback: 'Correct!', greatJob: 'Great job!',
    wrongFeedback: 'Not quite', correctAnswer: 'Correct answer', explanation: 'Why this is correct', next: 'Next Question',
    finish: 'See Results', complete: 'Quiz Complete 🎉', resultMessage: 'Nice work! Keep practicing to build your confidence.',
    percentage: '{percent}%', retry: 'Retry Quiz', home: 'Back to Home',
  },
  saved: {
    title: 'Saved Questions', count: '{count} question{plural} saved', none: 'No saved questions yet',
    emptyTitle: 'Nothing saved yet', emptyDescription: 'Save important questions to review them later. Tap the bookmark icon on any question.',
    browse: 'Browse Question Bank',
  },
  tutor: {
    welcomeContext: "Hi! I'm your AI Tutor 🤖\n\nI can see you're working on:\n\n\"{question}\"\n\nHow would you like me to help? You can ask me to explain it, simplify it, or give you an example!",
    welcome: "Hi! I'm your AI Tutor 🤖 I'm here to help you with any Grade 11 question. What topic would you like to explore today?",
    title: 'AI Tutor', assistant: 'Study assistant', aiHelp: 'AI Study Help', explainQuestion: '🔍 Explain this question',
    explainPrompt: 'Can you explain this question step by step?', explainSimply: '✨ Explain simply',
    simplePrompt: 'Can you explain this in a simpler way?', giveExample: '📝 Give an example',
    examplePrompt: 'Can you give me a similar example to practice?', thinking: 'AI Tutor is thinking...',
    placeholder: 'Ask me anything...', failed: "Sorry, I couldn't answer right now. Please try again.",
    support: 'Grade 11 study support',
  },
  resources: {
    title: 'Learning Resources', subtitle: 'Video lessons for Grade 11', count: '{count} Video{plural}',
    integration: 'YouTube Integration', demo: 'Demo mode · Connect YouTube API to enable real videos',
    lessons: 'Grade 11 video lessons', watch: 'Watch on YouTube', watchOn: 'Watch on YouTube',
  },
  progress: {
    title: 'My Progress', year: 'Grade 11 · 2026 Academic Year', viewed: 'Questions Viewed', saved: 'Questions Saved',
    subjectProgress: 'Subject Progress', started: 'Started', excellent: 'Excellent', good: 'Good', keepGoing: 'Keep going!',
    tip: 'Study Tip', tipText: "Focus on Physics this week — you're at 55%. Even 20 minutes of daily practice can significantly improve your score before exams!",
  },
  profile: {
    student: 'Grade 11 Student', academicYear: '2026 Academic Year', settings: 'Settings', notifications: 'Notifications', reminders: 'Study reminders {state}',
    language: 'Language', appearance: 'Appearance', lightTheme: 'Light', darkTheme: 'Dark', selectAppearance: 'Choose appearance', detailedProgress: 'View detailed progress',
    soundEffects: 'Sound Effects', backgroundMusic: 'Background Music', on: 'On', off: 'Off',
    about: 'About', aboutApp: 'About Learn Smart AI', privacy: 'Privacy Policy', rate: 'Rate the App', feedback: 'Send Feedback',
    across: 'Across all 5 subjects. Keep it up!', questionBank: 'Question Bank',
    selectedLanguage: 'English', selectLanguage: 'Choose language', english: 'English', myanmar: 'မြန်မာ',
  },
  subjects: { Mathematics: 'Mathematics', Physics: 'Physics', Chemistry: 'Chemistry', Biology: 'Biology', English: 'English' },
  difficulties: { Easy: 'Easy', Medium: 'Medium', Hard: 'Hard' },
} as const;

type TranslationShape<T> = { [K in keyof T]: T[K] extends string ? string : TranslationShape<T[K]> };

const my: TranslationShape<typeof en> = {
  common: {
    home: 'ပင်မ', questions: 'မေးခွန်းများ', saved: 'သိမ်းထားသည်', me: 'ကျွန်ုပ်', cancel: 'မလုပ်တော့ပါ', close: 'ပိတ်ရန်', selected: 'ရွေးချယ်ထားသည်',
    allSubjects: 'ဘာသာရပ်အားလုံး', allChapters: 'အခန်းအားလုံး', allLevels: 'အဆင့်အားလုံး', clearFilters: 'စစ်ထုတ်မှုများ ရှင်းရန်',
    easy: 'လွယ်', medium: 'အလယ်အလတ်', hard: 'ခက်', question: 'မေးခွန်း', answer: 'အဖြေ', explanation: 'ရှင်းလင်းချက်',
    learningResources: 'လေ့လာရေး အရင်းအမြစ်များ', grade11: '၁၁ တန်း', academicYear: '၂၀၂၆ ပညာသင်နှစ်',
    subject: 'ဘာသာရပ်', subjects: 'ဘာသာရပ်များ', savedCount: 'သိမ်းထားသည်', viewed: 'ကြည့်ရှုပြီး', progress: 'တိုးတက်မှု',
    search: 'မေးခွန်းများ ရှာရန်...', noResults: '“{query}” အတွက် ရလဒ်မရှိပါ',
  },
  home: {
    gradeYear: '၁၁ တန်း • ၂၀၂၆', greeting: 'ဒီနေ့ လေ့လာဖို့ အသင့်ဖြစ်ပြီလား? 📚', search: 'မေးခွန်းနှင့် ခေါင်းစဉ်များ ရှာရန်...',
    searchResults: 'ရှာဖွေမှုရလဒ်များ', learningTopics: 'လေ့လာရန် ခေါင်းစဉ်များ', continueLearning: 'ဆက်လက်လေ့လာရန်',
    viewAll: 'အားလုံးကြည့်ရန်', progressOverview: 'တိုးတက်မှု အကျဉ်းချုပ်', recentQuestions: 'လတ်တလော မေးခွန်းများ', seeAll: 'အားလုံးကြည့်ရန်',
    savedQuestion: 'သိမ်းထားသော မေးခွန်း {count} ခု{plural}', reviewSaved: 'သိမ်းထားသော မေးခွန်းများကို ပြန်လည်လေ့လာရန် နှိပ်ပါ',
  },
  bank: {
    title: 'မေးခွန်းဘဏ်', search: 'ခေါင်းစဉ် သို့မဟုတ် စကားလုံးဖြင့် ရှာရန်...', count: 'မေးခွန်း {count} ခု',
    noQuestions: 'မေးခွန်း မတွေ့ပါ', adjustSearch: 'မေးခွန်းရှာရန် ရှာဖွေမှု သို့မဟုတ် စစ်ထုတ်မှုကို ပြင်ကြည့်ပါ။',
    clearFilters: 'စစ်ထုတ်မှုများ ရှင်းရန်', view: 'ကြည့်ရန် →',
  },
  detail: { saved: 'မေးခွန်း သိမ်းပြီး ✓', save: 'မေးခွန်း သိမ်းရန်', askAI: 'AI ကို မေးရန်', resources: 'လေ့လာရေးအရင်းအမြစ်များ' },
  quiz: {
    title: 'ဉာဏ်စမ်း', homeCard: 'အမြန် ဉာဏ်စမ်း', cardDescription: 'မေးခွန်းအချို့ကို ဖြေဆိုပြီး ကိုယ့်ကိုယ်ကို စမ်းသပ်ပါ။',
    setup: 'ဉာဏ်စမ်း ပြင်ဆင်ရန်', chooseSubject: 'ဘာသာရပ် ရွေးချယ်ပါ', chooseDifficulty: 'အခက်အခဲ ရွေးချယ်ပါ', numberQuestions: 'မေးခွန်းအရေအတွက်',
    allDifficulties: 'အခက်အခဲအားလုံး', allAvailable: 'ရနိုင်သမျှအားလုံး ({count})', questionCount: 'မေးခွန်း {count} ခု',
    available: 'မေးခွန်း {count} ခု ရနိုင်သည်', noAvailable: 'ဤရွေးချယ်မှုများနှင့် ကိုက်ညီသော မေးခွန်းမရှိပါ။', changeFilters: 'အခြားဘာသာရပ် သို့မဟုတ် အခက်အခဲကို ရွေးပါ။',
    start: 'ဉာဏ်စမ်း စတင်ရန်', exit: 'ဉာဏ်စမ်းမှ ထွက်ရန်', questionOf: 'မေးခွန်း {current} / {total}', score: 'အမှတ်',
    correct: 'မှန်', wrong: 'မှား', selectAnswer: 'အကောင်းဆုံးအဖြေကို ရွေးပါ။', correctFeedback: 'မှန်ပါတယ်!', greatJob: 'တော်ပါတယ်!',
    wrongFeedback: 'မမှန်သေးပါ', correctAnswer: 'အဖြေမှန်', explanation: 'အဖြေရှင်းလင်းချက်', next: 'နောက်မေးခွန်း',
    finish: 'ရလဒ်ကြည့်ရန်', complete: 'ဉာဏ်စမ်း ပြီးဆုံးပါပြီ 🎉', resultMessage: 'ကောင်းကောင်းကြိုးစားခဲ့ပါတယ်။ ယုံကြည်မှုတိုးလာစေရန် ဆက်လက်လေ့ကျင့်ပါ။',
    percentage: '{percent}%', retry: 'ပြန်ဖြေမည်', home: 'ပင်မစာမျက်နှာသို့',
  },
  saved: {
    title: 'သိမ်းထားသော မေးခွန်းများ', count: 'မေးခွန်း {count} ခု သိမ်းထားသည်', none: 'သိမ်းထားသော မေးခွန်း မရှိသေးပါ',
    emptyTitle: 'သိမ်းထားသော မေးခွန်း မရှိသေးပါ', emptyDescription: 'အရေးကြီးသော မေးခွန်းများကို နောက်မှပြန်လေ့လာရန် bookmark ကိုနှိပ်ပြီး သိမ်းပါ။',
    browse: 'မေးခွန်းဘဏ် ကြည့်ရန်',
  },
  tutor: {
    welcomeContext: 'မင်္ဂလာပါ။ AI Tutor ပါ 🤖\n\nသင်လေ့လာနေသည်မှာ:\n\n“{question}”\n\nဘယ်လိုကူညီပေးရမလဲ။ အဆင့်ဆင့်ရှင်းပြရန်၊ လွယ်ကူအောင်ရှင်းပြရန် သို့မဟုတ် ဥပမာပေးရန် မေးနိုင်ပါတယ်။',
    welcome: 'မင်္ဂလာပါ။ AI Tutor ပါ 🤖 ၁၁ တန်းမေးခွန်းများကို ကူညီပေးပါမယ်။ ဒီနေ့ ဘယ်အကြောင်းအရာကို လေ့လာချင်ပါသလဲ။',
    title: 'AI Tutor', assistant: 'လေ့လာရေးအကူ', aiHelp: 'AI လေ့လာရေးအကူအညီ', explainQuestion: '🔍 ဒီမေးခွန်းကို ရှင်းပြရန်',
    explainPrompt: 'ဒီမေးခွန်းကို အဆင့်ဆင့် ရှင်းပြပေးနိုင်မလား။', explainSimply: '✨ လွယ်ကူစွာ ရှင်းပြရန်',
    simplePrompt: 'ဒါကို ပိုလွယ်ကူတဲ့နည်းနဲ့ ရှင်းပြပေးနိုင်မလား။', giveExample: '📝 ဥပမာပေးရန်',
    examplePrompt: 'လေ့ကျင့်ရန် အလားတူဥပမာတစ်ခု ပေးနိုင်မလား။', thinking: 'AI Tutor စဉ်းစားနေသည်...',
    placeholder: 'မေးလိုသည်ကို ရိုက်ထည့်ပါ...', failed: 'တောင်းပန်ပါတယ်၊ ယခု မဖြေနိုင်ပါ။ ထပ်မံကြိုးစားပါ။',
    support: '၁၁ တန်း လေ့လာရေးအကူအညီ',
  },
  resources: {
    title: 'လေ့လာရေး အရင်းအမြစ်များ', subtitle: '၁၁ တန်း ဗီဒီယိုသင်ခန်းစာများ', count: 'ဗီဒီယို {count} ခု',
    integration: 'YouTube ချိတ်ဆက်မှု', demo: 'စမ်းသပ်မှုမုဒ် · ဗီဒီယိုများအတွက် YouTube API ချိတ်ဆက်ပါ',
    lessons: '၁၁ တန်း ဗီဒီယိုသင်ခန်းစာများ', watch: 'YouTube တွင်ကြည့်ရန်', watchOn: 'YouTube တွင်ကြည့်ရန်',
  },
  progress: {
    title: 'ကျွန်ုပ်၏ တိုးတက်မှု', year: '၁၁ တန်း · ၂၀၂၆ ပညာသင်နှစ်', viewed: 'ကြည့်ရှုပြီးသော မေးခွန်းများ', saved: 'သိမ်းထားသော မေးခွန်းများ',
    subjectProgress: 'ဘာသာရပ်အလိုက် တိုးတက်မှု', started: 'စတင်ခဲ့သည်', excellent: 'အလွန်ကောင်းသည်', good: 'ကောင်းသည်', keepGoing: 'ဆက်ကြိုးစားပါ!',
    tip: 'လေ့လာရေး အကြံပြုချက်', tipText: 'ဒီအပတ် ရူပဗေဒကို အာရုံစိုက်ပါ — လက်ရှိ ၅၅% ရှိပါတယ်။ တစ်နေ့ မိနစ် ၂၀ လေ့ကျင့်ရုံဖြင့် စာမေးပွဲမတိုင်မီ ရလဒ်တိုးတက်နိုင်ပါတယ်။',
  },
  profile: {
    student: '၁၁ တန်း ကျောင်းသား/သူ', academicYear: '၂၀၂၆ ပညာသင်နှစ်', settings: 'ဆက်တင်များ', notifications: 'အသိပေးချက်များ', reminders: 'လေ့လာရန် သတိပေးချက် {state}',
    language: 'ဘာသာစကား', appearance: 'အသွင်အပြင်', lightTheme: 'အလင်းရောင်', darkTheme: 'အမှောင်', selectAppearance: 'အသွင်အပြင် ရွေးချယ်ပါ', detailedProgress: 'အသေးစိတ် တိုးတက်မှုကြည့်ရန်',
    soundEffects: 'အသံအကျိုးသက်ရောက်မှုများ', backgroundMusic: 'နောက်ခံတေးဂီတ', on: 'ဖွင့်', off: 'ပိတ်',
    about: 'အကြောင်း', aboutApp: 'Learn Smart AI အကြောင်း', privacy: 'ကိုယ်ရေးအချက်အလက် မူဝါဒ', rate: 'အက်ပ်ကို အဆင့်သတ်မှတ်ရန်', feedback: 'အကြံပြုချက်ပေးရန်',
    across: 'ဘာသာရပ် ၅ ခု၏ တိုးတက်မှု။ ဆက်လက်ကြိုးစားပါ။', questionBank: 'မေးခွန်းဘဏ်',
    selectedLanguage: 'မြန်မာ', selectLanguage: 'ဘာသာစကား ရွေးချယ်ပါ', english: 'English', myanmar: 'မြန်မာ',
  },
  subjects: { Mathematics: 'သင်္ချာ', Physics: 'ရူပဗေဒ', Chemistry: 'ဓာတုဗေဒ', Biology: 'ဇီဝဗေဒ', English: 'အင်္ဂလိပ်စာ' },
  difficulties: { Easy: 'လွယ်', Medium: 'အလယ်အလတ်', Hard: 'ခက်' },
};

export type Language = 'en' | 'my';
export type TranslationKey = keyof typeof en;
export const translations = { en, my };
