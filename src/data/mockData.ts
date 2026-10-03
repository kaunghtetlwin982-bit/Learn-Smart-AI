export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: Difficulty;
}

export const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

export const CHAPTERS: Record<string, string[]> = {
  Mathematics: ['Simultaneous Equations', 'Quadratic Equations', 'Algebra', 'Trigonometry'],
  Physics: ["Newton's Laws", 'Forces', 'Work & Energy', 'Optics'],
  Chemistry: ['Atomic Structure', 'Chemical Bonding', 'Acids & Bases'],
  Biology: ['Cell Biology', 'Ecology', 'Human Physiology'],
  English: ['Essay Writing', 'Poetry Analysis', 'Grammar'],
};

export const QUESTIONS: Question[] = [
  { id: 'm1', subject: 'Mathematics', chapter: 'Simultaneous Equations', title: 'Solve Simultaneous Equations', question: 'Solve the system: 2x + 3y = 12 and x − y = 1.', answer: 'x = 3, y = 2', explanation: 'From x − y = 1, x = y + 1. Substitute into the first equation: 2(y + 1) + 3y = 12, so y = 2 and x = 3.', difficulty: 'Medium' },
  { id: 'm2', subject: 'Mathematics', chapter: 'Quadratic Equations', title: 'Solve Using the Quadratic Formula', question: 'Use the quadratic formula to solve x² − 5x + 6 = 0.', answer: 'x = 2 or x = 3', explanation: 'Here a = 1, b = −5, c = 6. Substitution gives x = (5 ± √(25 − 24)) / 2, so the roots are 2 and 3.', difficulty: 'Medium' },
  { id: 'm3', subject: 'Mathematics', chapter: 'Algebra', title: 'Simplify Algebraic Expressions', question: 'Simplify: 3(2x − 4) + 5x − 7.', answer: '11x − 19', explanation: 'Expand the brackets to get 6x − 12. Combine like terms: 6x + 5x − 12 − 7 = 11x − 19.', difficulty: 'Easy' },
  { id: 'm4', subject: 'Mathematics', chapter: 'Trigonometry', title: 'Prove a Trigonometric Identity', question: 'Explain why sin²θ + cos²θ = 1.', answer: 'It follows from the Pythagorean identity.', explanation: 'On the unit circle, a point has coordinates (cos θ, sin θ). The circle equation x² + y² = 1 therefore gives cos²θ + sin²θ = 1.', difficulty: 'Easy' },
  { id: 'p1', subject: 'Physics', chapter: "Newton's Laws", title: "Applying Newton's Second Law", question: 'A 5 kg object experiences a net force of 20 N. Find its acceleration.', answer: '4 m/s²', explanation: 'Newton’s second law is F = ma. Rearrange to a = F/m = 20/5 = 4 m/s².', difficulty: 'Easy' },
  { id: 'p2', subject: 'Physics', chapter: 'Forces', title: 'Friction and Normal Force', question: 'A 10 kg block rests on a horizontal surface. If μ = 0.3, find the friction force when it is sliding.', answer: '29.4 N', explanation: 'The normal force is N = mg = 10 × 9.8 = 98 N. Friction is μN = 0.3 × 98 = 29.4 N.', difficulty: 'Medium' },
  { id: 'p3', subject: 'Physics', chapter: 'Work & Energy', title: 'Work Done by a Force', question: 'How much work is done by a 50 N force moving an object 8 m in the force direction?', answer: '400 J', explanation: 'When force and motion are in the same direction, work = force × distance = 50 × 8 = 400 J.', difficulty: 'Easy' },
  { id: 'p4', subject: 'Physics', chapter: 'Optics', title: "Snell's Law", question: 'Light enters glass (n₂ = 1.5) from air (n₁ = 1.0) at 30°. Find its angle of refraction.', answer: 'Approximately 19.5°', explanation: 'Snell’s law gives n₁ sin θ₁ = n₂ sin θ₂. Thus sin θ₂ = sin 30° / 1.5 = 1/3, so θ₂ ≈ 19.5°.', difficulty: 'Medium' },
  { id: 'c1', subject: 'Chemistry', chapter: 'Atomic Structure', title: 'Electron Configuration', question: 'Write the electron configuration of sulfur (atomic number 16).', answer: '1s² 2s² 2p⁶ 3s² 3p⁴', explanation: 'Sulfur has 16 electrons. Fill orbitals in order, placing up to two electrons in each s orbital and six in each p orbital.', difficulty: 'Medium' },
  { id: 'c2', subject: 'Chemistry', chapter: 'Chemical Bonding', title: 'Ionic vs Covalent Bonding', question: 'How do ionic and covalent bonds differ? Give one example of each.', answer: 'Ionic bonds involve electron transfer (NaCl); covalent bonds involve shared electrons (H₂O).', explanation: 'Ionic bonding commonly occurs when electrons transfer from a metal to a non-metal. Covalent bonding forms when atoms share electron pairs.', difficulty: 'Easy' },
  { id: 'c3', subject: 'Chemistry', chapter: 'Acids & Bases', title: 'pH Calculation', question: 'Calculate the pH of a 0.01 M HCl solution.', answer: 'pH = 2', explanation: 'HCl is a strong acid, so [H⁺] = 0.01 = 10⁻² M. Using pH = −log₁₀[H⁺] gives pH = 2.', difficulty: 'Easy' },
  { id: 'b1', subject: 'Biology', chapter: 'Cell Biology', title: 'Mitosis vs Meiosis', question: 'Give two differences between mitosis and meiosis.', answer: 'Mitosis produces two genetically similar diploid cells; meiosis produces four genetically varied haploid cells.', explanation: 'Mitosis has one division for growth and repair. Meiosis has two divisions to make gametes with half the chromosome number.', difficulty: 'Medium' },
  { id: 'b2', subject: 'Biology', chapter: 'Ecology', title: 'Food Chains and Energy Transfer', question: 'If producers contain 10,000 kJ of energy and about 10% passes to each next trophic level, how much reaches secondary consumers?', answer: '100 kJ', explanation: 'Primary consumers receive about 1,000 kJ. Secondary consumers receive 10% of that, or 100 kJ.', difficulty: 'Medium' },
  { id: 'b3', subject: 'Biology', chapter: 'Human Physiology', title: 'Function of the Alveoli', question: 'Describe how alveoli are adapted for gas exchange.', answer: 'They have a large surface area, thin moist walls, and a rich blood supply.', explanation: 'Many alveoli create a large area. Thin, moist walls shorten the diffusion path, while blood flow maintains a concentration gradient.', difficulty: 'Medium' },
  { id: 'e1', subject: 'English', chapter: 'Essay Writing', title: 'Essay Structure', question: 'Name the three main parts of an essay and describe their purpose.', answer: 'Introduction, body paragraphs, and conclusion.', explanation: 'The introduction presents the topic and thesis. Body paragraphs develop points with evidence. The conclusion draws the argument together.', difficulty: 'Easy' },
  { id: 'e2', subject: 'English', chapter: 'Poetry Analysis', title: 'Identifying Poetic Devices', question: 'Identify the poetic device in: “The wind whispered through the trees.”', answer: 'Personification', explanation: 'The wind is given the human action “whispered,” so the line uses personification. The repeated w sound also creates alliteration.', difficulty: 'Easy' },
  { id: 'e3', subject: 'English', chapter: 'Grammar', title: 'Active vs Passive Voice', question: 'Rewrite in active voice: “The experiment was conducted by the students.”', answer: 'The students conducted the experiment.', explanation: 'In active voice, the subject performs the action. Here, “the students” perform “conducted,” so they become the subject.', difficulty: 'Easy' },
];

type Video = { id: string; title: string; subject: string; chapter: string; duration: string; views: string; thumbnail: string; url: string };
const video = (id: string, title: string, subject: string, chapter: string, url: string): Video => ({
  id, title, subject, chapter, url, duration: '', views: '',
  thumbnail: `https://img.youtube.com/vi/${new URL(url).pathname.split('/').pop()}/hqdefault.jpg`,
});

export const VIDEOS: Video[] = [
  video('v1', 'Solve Simultaneous Equations', 'Mathematics', 'Simultaneous Equations', 'https://youtu.be/68hMhae269k?si=onqMgJQTjCITos_B'),
  video('v2', 'Solve Using the Quadratic Formula', 'Mathematics', 'Quadratic Equations', 'https://youtu.be/maejPmUzqpM?si=ZNMPABXk2POnalLV'),
  video('v3', 'Simplify Algebraic Expressions', 'Mathematics', 'Algebra', 'https://youtu.be/1MmhAq-XVN0?si=G2U8Fh128R7FY-9Q'),
  video('v4', 'Prove a Trigonometric Identity', 'Mathematics', 'Trigonometry', 'https://youtu.be/lRDHqGqRNwg?si=b28Fzgi8h4aB4rbP'),
  video('v5', "Applying Newton's Second Law", 'Physics', "Newton's Laws", 'https://youtu.be/g550H4e5FCY?si=T9fZ1WVTQOYDSsXb'),
  video('v6', 'Friction and Normal Force', 'Physics', 'Forces', 'https://youtu.be/fRQq4_ry9-Q?si=_eDKMXH2jOJvWlCQ'),
  video('v7', 'Work Done by a Force', 'Physics', 'Work & Energy', 'https://youtu.be/Pf5EHVxc4XI?si=W9Hfjkr_2ZlMPrd5'),
  video('v8', "Snell's Law", 'Physics', 'Optics', 'https://youtu.be/ZEUQwjBb-fY?si=6FUUpsPwoF_sJytz'),
  video('v9', 'Electron Configuration', 'Chemistry', 'Atomic Structure', 'https://youtu.be/NIwcDnFjj98?si=_HSJknuBoz6etjPM'),
  video('v10', 'Ionic vs Covalent Bonding', 'Chemistry', 'Chemical Bonding', 'https://youtu.be/lLkj0qpA8eI?si=WBPc6ejQ7cCB5PE4'),
  video('v11', 'pH Calculation', 'Chemistry', 'Acids & Bases', 'https://youtu.be/OEW4-Sfyvik?si=_o5Alcb9VyHRaiDe'),
  video('v12', 'Mitosis vs Meiosis', 'Biology', 'Cell Biology', 'https://youtu.be/zrKdz93WlVk?si=3j3dp9gi49B-Puh0'),
  video('v13', 'Food Chains and Energy Transfer', 'Biology', 'Ecology', 'https://youtu.be/e8vzQWjzjm0?si=pYJGUUC49BV1sO7q'),
  video('v14', 'Function of the Alveoli', 'Biology', 'Human Physiology', 'https://youtu.be/mZvzl8KH6iI?si=Hy08vaWbXYDqI3kb'),
  video('v15', 'Essay Structure', 'English', 'Essay Writing', 'https://youtu.be/7P4fzbzwwAg?si=QupsNbFnmykwuSb'),
  video('v16', 'Identifying Poetic Devices', 'English', 'Poetry Analysis', 'https://youtu.be/OY2zPFQsKSI?si=E5_utWXUje0XWaL5'),
  video('v17', 'Active vs Passive Voice', 'English', 'Grammar', 'https://youtu.be/fo46yFWIJzU?si=4I_19R7kvUypwBP0'),
];

export const SUBJECT_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  Mathematics: { bg: '#EEF2FF', text: '#4F46E5', icon: '📐' },
  Physics: { bg: '#FFF7ED', text: '#EA580C', icon: '⚡' },
  Chemistry: { bg: '#F0FDF4', text: '#16A34A', icon: '🧪' },
  Biology: { bg: '#FDF4FF', text: '#9333EA', icon: '🌿' },
  English: { bg: '#FFF1F2', text: '#E11D48', icon: '📖' },
};

export const SUBJECT_PROGRESS: Record<string, number> = {
  Mathematics: 70, Physics: 55, Chemistry: 80, Biology: 75, English: 60,
};
