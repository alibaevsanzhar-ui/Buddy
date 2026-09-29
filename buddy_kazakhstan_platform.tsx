import React, { useState, useMemo } from 'react';
import {
  Users,
  Compass,
  Calendar,
  MessageSquare,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  Send,
  Bell,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  TrendingDown,
  Sparkles,
  HeartHandshake,
  Search,
  Filter,
  DollarSign,
  Bus,
  ShoppingCart,
  PhoneCall,
  Info,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const MOCK_STUDENT = {
  id: "ST-2024-9921",
  name: "Aarav Sharma",
  country: "India",
  flag: "🇮🇳",
  major: "General Medicine (MBBS)",
  year: "1st Year",
  city: "Astana",
  university: "Astana Medical University",
  gpa: 2.85,
  attendance: 78,
  visaExpiryDays: 12, // Critical early warning
  tuitionStatus: "Paid",
  assignedMentorId: 101,
  nativeLanguages: ["Hindi", "English"],
};

const MOCK_MENTORS = [
  {
    id: 101,
    name: "Amina Kenzhebayeva",
    year: "4th Year",
    major: "General Medicine",
    university: "Astana Medical University",
    languages: ["Kazakh", "Russian", "English", "Hindi (Basic)"],
    country: "Kazakhstan",
    flag: "🇰🇿",
    rating: 4.9,
    bio: "Passionate about helping medical freshers navigate clinical rotations, anatomy labs, and life in Astana.",
    matchReasons: ["Same Faculty: Medicine", "Speaks fluent English", "Specialist in Visa & Polyclinic registration"],
    city: "Astana",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 102,
    name: "Dias Nurpeissov",
    year: "3rd Year",
    major: "Computer Science & Software Engineering",
    university: "Astana IT University",
    languages: ["Kazakh", "Russian", "English"],
    country: "Kazakhstan",
    flag: "🇰🇿",
    rating: 4.8,
    bio: "Tech enthusiast who loves hackathons. Can help with local SIM cards, Onay/Astra card, and budget tech markets.",
    matchReasons: ["IT Faculty Expert", "Active in Student Council", "Speaks English & Russian"],
    city: "Astana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 103,
    name: "Kamila Tursunova",
    year: "3rd Year",
    major: "International Relations",
    university: "Eurasian National University",
    languages: ["Kazakh", "Russian", "English", "Chinese"],
    country: "Kazakhstan",
    flag: "🇰🇿",
    rating: 5.0,
    bio: "Volunteer at the International Office. Guides students through migration rules, bank accounts, and traditional meals.",
    matchReasons: ["Multilingual", "Direct line to Dean's office", "Host of weekly Kazakh language coffee club"],
    city: "Astana",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  }
];

const INITIAL_MESSAGES = [
  { sender: 'mentor', text: 'Salem, Aarav! Welcome to Astana! Have you already registered at the migration office?', time: '10:15 AM' },
  { sender: 'student', text: 'Salem Amina! Not yet, I only arrived 3 days ago. My university coordinator said I need a buddy to help me navigate the PSC (ЦОН).', time: '10:18 AM' },
  { sender: 'mentor', text: 'No worries at all! Let’s meet tomorrow at 2 PM at the Central PSC on Mangilik El. Remember to bring your passport, migration slip from the airport, and IIN if you got one.', time: '10:20 AM' }
];

const CITY_GUIDE_ITEMS = [
  {
    category: "Public Transport",
    icon: Bus,
    title: "City Bus & Astra Card (Astana) / ONAY (Almaty)",
    badge: "Essential",
    content: "Download Avtobys or AstraBus mobile app. Single cash fare is 200₸, while paying via QR or virtual card is only 110₸ (50% cheaper). Get a student discount transport card through the University Registrar Office."
  },
  {
    category: "Groceries & Budget Living",
    icon: ShoppingCart,
    title: "Save on Stipend: Artem & Green Bazaar",
    badge: "Budget Tip",
    content: "Skip tourist supermarkets for fresh produce! In Astana, visit Artem Market (Рынок Артём) or Big Shanyrak for affordable fruits, nuts, and meats. In Almaty, Zelyony Bazar (Green Market) and Magnum Cash&Carry offer wholesale student pricing."
  },
  {
    category: "Legal & Migration",
    icon: ShieldCheck,
    title: "Visa, Registration & IIN (ИИН)",
    badge: "Critical",
    content: "Foreign nationals must complete migration notification within 3 business days of arrival. You also need an IIN (Individual Identification Number) to open a local bank card (Kaspi Bank) and get a Kazakhstan SIM card (Beeline/Kcell/Tele2)."
  },
  {
    category: "Health & Polyclinic",
    icon: HeartHandshake,
    title: "Medical Registration & 075/y Form",
    badge: "Healthcare",
    content: "All international medical and non-medical students must be attached to the local Student Polyclinic (Студенческая поликлиника). Keep emergency contacts handy: 103 (Ambulance), 112 (Universal Emergency)."
  }
];

const LOCAL_EVENTS = [
  {
    id: 1,
    title: "International Nauryz & Cultural Food Gala",
    date: "March 21, 2026 • 15:00",
    location: "Main University Campus Hall",
    participants: 142,
    tag: "Culture & Networking"
  },
  {
    id: 2,
    title: "Workshop: Migration Law & Kaspi Life Hacks",
    date: "October 12, 2026 • 17:30",
    location: "Online (Zoom) + International Office",
    participants: 89,
    tag: "Administrative"
  },
  {
    id: 3,
    title: "Baiterek & EXPO City Walking Tour for Freshers",
    date: "This Saturday • 11:00 AM",
    location: "Astana Baiterek Monument steps",
    participants: 64,
    tag: "Social"
  }
];

const INITIAL_AT_RISK_STUDENTS = [
  {
    id: "ST-8812",
    name: "Farhan Qureshi",
    country: "Pakistan",
    major: "General Medicine",
    gpa: 2.1,
    attendance: 64,
    visaDaysLeft: 9,
    tuition: "Overdue (15 days)",
    riskLevel: "Critical",
    riskReason: "Visa expires in 9 days + Attendance below 70%"
  },
  {
    id: "ST-7654",
    name: "Chen Wei",
    country: "China",
    major: "IT & Big Data",
    gpa: 3.4,
    attendance: 88,
    visaDaysLeft: 14,
    tuition: "Paid",
    riskLevel: "Moderate",
    riskReason: "Migration permit extension required within 14 days"
  },
  {
    id: "ST-9102",
    name: "Gulnora Karimova",
    country: "Uzbekistan",
    major: "Economics & Finance",
    gpa: 2.3,
    attendance: 71,
    visaDaysLeft: 45,
    tuition: "Pending",
    riskLevel: "Warning",
    riskReason: "Academic drop: GPA dropped from 3.0 to 2.3"
  },
  {
    id: "ST-9921",
    name: "Aarav Sharma",
    country: "India",
    major: "General Medicine",
    gpa: 2.85,
    attendance: 78,
    visaDaysLeft: 12,
    tuition: "Paid",
    riskLevel: "Warning",
    riskReason: "Visa renewal deadline approaching (12 days)"
  }
];

export default function App() {
  const [currentRole, setCurrentRole] = useState("student"); // 'student', 'mentor', 'office'
  const [activeTab, setActiveTab] = useState("overview"); // overview, match, chat, guide, events
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [messageInput, setMessageInput] = useState("");
  
  // Matching tool state
  const [matchCountry, setMatchCountry] = useState("India");
  const [matchMajor, setMatchMajor] = useState("Medicine");
  const [matchLanguage, setMatchLanguage] = useState("English");
  const [matchGoal, setMatchGoal] = useState("Visa, Documents & Local Transportation");
  const [matchedMentor, setMatchedMentor] = useState(MOCK_MENTORS[0]);
  const [matchCalculated, setMatchCalculated] = useState(false);

  // Admin Dashboard alerts state
  const [atRiskList, setAtRiskList] = useState(INITIAL_AT_RISK_STUDENTS);
  const [notificationBanner, setNotificationBanner] = useState(null);

  // Senior Mentor Notes
  const [mentorNotes, setMentorNotes] = useState([
    { id: 1, student: "Aarav Sharma", note: "Met at library. Helped configure University LMS portal. Aarav needs reminder for migration office visit.", date: "Yesterday" }
  ]);
  const [newNoteText, setNewNoteText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      sender: currentRole === "mentor" ? "mentor" : "student",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setMessageInput("");

    // Simulated buddy quick auto-reply if student speaks
    if (currentRole === "student") {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            sender: "mentor",
            text: "Got your message! I'm checking with the student advisory group now. Keep calm, we'll solve it together! 🇰🇿🤝",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1200);
    }
  };

  const handleMatchCalculation = (e) => {
    e.preventDefault();
    // Deterministic smart match selection
    if (matchMajor.toLowerCase().includes("med")) {
      setMatchedMentor(MOCK_MENTORS[0]);
    } else if (matchMajor.toLowerCase().includes("it") || matchMajor.toLowerCase().includes("computer")) {
      setMatchedMentor(MOCK_MENTORS[1]);
    } else {
      setMatchedMentor(MOCK_MENTORS[2]);
    }
    setMatchCalculated(true);
  };

  const triggerStaffAlert = (studentName, actionType) => {
    setNotificationBanner(`Notification dispatched to ${studentName} & Faculty Advisor: [Action: ${actionType}]`);
    setTimeout(() => setNotificationBanner(null), 4500);
  };

  const handleAddMentorNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setMentorNotes([
      { id: Date.now(), student: "Aarav Sharma", note: newNoteText, date: "Just now" },
      ...mentorNotes
    ]);
    setNewNoteText("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Banner & Context Header */}
      <header className="bg-indigo-900 text-white shadow-md border-b border-indigo-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-sky-400 text-slate-950 p-2 rounded-xl shadow-inner font-extrabold flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-indigo-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white">Buddy</span>
                <span className="text-xs bg-sky-400 text-indigo-950 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  KZ Student Portal
                </span>
              </div>
              <p className="text-xs text-sky-100 hidden sm:block">
                ICT Mentorship & Early-Warning Platform for International Students in Kazakhstan
              </p>
            </div>
          </div>

          {/* Interactive Role Switcher */}
          <div className="flex items-center bg-indigo-950/70 p-1 rounded-xl border border-indigo-700/60 shadow-inner">
            <button
              onClick={() => { setCurrentRole("student"); setActiveTab("overview"); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                currentRole === "student"
                  ? "bg-sky-400 text-indigo-950 shadow font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>International Student</span>
            </button>
            <button
              onClick={() => { setCurrentRole("mentor"); setActiveTab("mentor-mentees"); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                currentRole === "mentor"
                  ? "bg-sky-400 text-indigo-950 shadow font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Senior Buddy (Mentor)</span>
            </button>
            <button
              onClick={() => { setCurrentRole("office"); setActiveTab("office-dashboard"); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                currentRole === "office"
                  ? "bg-amber-400 text-slate-950 shadow font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>International Office / Staff</span>
            </button>
          </div>
        </div>

        {/* Global Notification Toast */}
        {notificationBanner && (
          <div className="bg-emerald-600 text-white text-xs font-medium px-4 py-2 text-center transition-all flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 animate-bounce" />
            <span>{notificationBanner}</span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ========================================================================= */}
        {/* VIEW 1: INTERNATIONAL STUDENT VIEW */}
        {/* ========================================================================= */}
        {currentRole === "student" && (
          <div className="space-y-6">
            {/* Student Persona Summary & Early Warning Alert */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-sky-50 to-indigo-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md">
                    {MOCK_STUDENT.flag}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-bold text-slate-900">{MOCK_STUDENT.name}</h2>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {MOCK_STUDENT.id}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {MOCK_STUDENT.major} • {MOCK_STUDENT.university} ({MOCK_STUDENT.city})
                    </p>
                  </div>
                </div>

                {/* Academic & Visa Quick Indicators */}
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-center min-w-[90px]">
                    <span className="text-xs text-slate-500 block">Current GPA</span>
                    <span className={`text-base font-bold ${MOCK_STUDENT.gpa < 3.0 ? "text-amber-600" : "text-emerald-600"}`}>
                      {MOCK_STUDENT.gpa} / 4.0
                    </span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-center min-w-[90px]">
                    <span className="text-xs text-slate-500 block">Attendance</span>
                    <span className={`text-base font-bold ${MOCK_STUDENT.attendance < 80 ? "text-amber-600" : "text-emerald-600"}`}>
                      {MOCK_STUDENT.attendance}%
                    </span>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl shadow-sm text-center min-w-[110px]">
                    <span className="text-xs text-rose-600 font-semibold flex items-center justify-center space-x-1">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Visa Renewal
                    </span>
                    <span className="text-base font-extrabold text-rose-700">
                      {MOCK_STUDENT.visaExpiryDays} Days Left
                    </span>
                  </div>
                </div>
              </div>

              {/* Crucial ICT Warning Banner based on Project Requirements */}
              <div className="p-3 bg-amber-500/10 border-t border-amber-300 text-amber-900 flex items-start sm:items-center space-x-3 px-6 text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div className="flex-1">
                  <strong className="font-semibold">Automated Migration Early Warning:</strong> Your temporary registration will expire in <strong>12 days</strong>. Please visit the International Office or connect with your buddy to avoid migration penalties or expulsion risk.
                </div>
                <button
                  onClick={() => setActiveTab("chat")}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shadow-sm"
                >
                  Ask Buddy for Help
                </button>
              </div>

              {/* Student Navigation Tabs */}
              <div className="flex border-b border-slate-200 px-6 overflow-x-auto text-sm font-medium">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === "overview"
                      ? "border-indigo-600 text-indigo-600 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Dashboard Overview
                </button>
                <button
                  onClick={() => setActiveTab("match")}
                  className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === "match"
                      ? "border-indigo-600 text-indigo-600 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Smart Mentor Matcher
                </button>
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`py-3 px-4 border-b-2 transition whitespace-nowrap flex items-center space-x-1.5 ${
                    activeTab === "chat"
                      ? "border-indigo-600 text-indigo-600 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buddy Chat</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </button>
                <button
                  onClick={() => setActiveTab("guide")}
                  className={`py-3 px-4 border-b-2 transition whitespace-nowrap flex items-center space-x-1.5 ${
                    activeTab === "guide"
                      ? "border-indigo-600 text-indigo-600 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Kazakhstan City & Survival Guide</span>
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`py-3 px-4 border-b-2 transition whitespace-nowrap flex items-center space-x-1.5 ${
                    activeTab === "events"
                      ? "border-indigo-600 text-indigo-600 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Events & Community</span>
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Student Overview */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Current Assigned Mentor Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <span>Your Assigned Senior Buddy</span>
                      </h3>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
                        Active Match
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
                      <img
                        src={MOCK_MENTORS[0].avatar}
                        alt="Amina"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <h4 className="text-lg font-bold text-slate-900">{MOCK_MENTORS[0].name}</h4>
                          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {MOCK_MENTORS[0].year} • {MOCK_MENTORS[0].major}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{MOCK_MENTORS[0].bio}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                          {MOCK_MENTORS[0].languages.map((l, i) => (
                            <span key={i} className="text-xs bg-sky-50 text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200">
                              {l}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                          <button
                            onClick={() => setActiveTab("chat")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-xl font-medium flex items-center space-x-1.5 shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Open Buddy Chat</span>
                          </button>
                          <button
                            onClick={() => setActiveTab("guide")}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-4 py-2 rounded-xl font-medium flex items-center space-x-1.5"
                          >
                            <Compass className="w-4 h-4" />
                            <span>Browse City Guide</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Adaptation Roadmap */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      <span>Semester 1 Kazakhstan Adaptation Checklist</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">✓</span>
                          <span className="text-sm font-medium text-slate-800 line-through">SIM Card & IIN (ИИН) Registration</span>
                        </div>
                        <span className="text-xs text-emerald-700 font-semibold">Done</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-bold">!</span>
                          <span className="text-sm font-bold text-rose-900">Extend Student Visa (Deadline: 12 days)</span>
                        </div>
                        <span className="text-xs bg-rose-200 text-rose-800 px-2 py-0.5 rounded font-bold">Urgent Action</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 text-xs flex items-center justify-center font-bold">3</span>
                          <span className="text-sm font-medium text-slate-800">Kaspi Gold Student Card Issuance</span>
                        </div>
                        <span className="text-xs text-slate-500">In Progress</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 text-xs flex items-center justify-center font-bold">4</span>
                          <span className="text-sm font-medium text-slate-800">Submit Form 075/y to Student Clinic</span>
                        </div>
                        <span className="text-xs text-slate-500">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Tips & Emergency numbers */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
                      <PhoneCall className="w-4 h-4 text-indigo-600" />
                      <span>Kazakhstan Emergency Numbers</span>
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Unified Rescue Service</span>
                        <strong className="text-indigo-600 font-bold">112</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Ambulance (Жедел жәрдем)</span>
                        <strong className="text-indigo-600 font-bold">103</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Police (Полиция)</span>
                        <strong className="text-indigo-600 font-bold">102</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">University Visa Department</span>
                        <strong className="text-slate-800">+7 (7172) 70-XX-XX</strong>
                      </div>
                    </div>
                  </div>

                  {/* Useful local phrases */}
                  <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm font-bold tracking-wider uppercase mb-3 flex items-center space-x-2 text-sky-300">
                      <BookOpen className="w-4 h-4" />
                      <span>Essential Kazakh Phrases</span>
                    </h3>
                    <ul className="text-xs space-y-2 text-indigo-100">
                      <li>• <strong>Сәлеметсіз бе (Salemetsiz be):</strong> Formal Hello</li>
                      <li>• <strong>Рахмет (Rakhmet):</strong> Thank you</li>
                      <li>• <strong>Канша турады? (Kansha turady?):</strong> How much does it cost?</li>
                      <li>• <strong>Аялдама (Ayaldama):</strong> Bus Stop</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Smart Mentor Matching Algorithm */}
            {activeTab === "match" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="max-w-2xl">
                  <h3 className="text-lg font-bold text-slate-900">IPO-SC Matching System</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Based on our Assignment 1 Architecture: the system analyzes your faculty, native language, and adaptation priorities to match you with an experienced upperclassman mentor.
                  </p>
                </div>

                <form onSubmit={handleMatchCalculation} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Home Country</label>
                    <select
                      value={matchCountry}
                      onChange={(e) => setMatchCountry(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="India">India (9,959 students in KZ)</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="China">China</option>
                      <option value="Russia">Russia</option>
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Faculty / Major</label>
                    <select
                      value={matchMajor}
                      onChange={(e) => setMatchMajor(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Medicine">Medicine & Healthcare (High Expulsion Risk)</option>
                      <option value="IT">Information Technology & CS</option>
                      <option value="Engineering">Oil & Gas / Engineering</option>
                      <option value="Economics">Economics & Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Communication Language</label>
                    <select
                      value={matchLanguage}
                      onChange={(e) => setMatchLanguage(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="English">English</option>
                      <option value="Russian">Russian</option>
                      <option value="Hindi">Hindi / English</option>
                      <option value="Chinese">Chinese / English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Help Needed</label>
                    <select
                      value={matchGoal}
                      onChange={(e) => setMatchGoal(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Visa">Visa, Documents & Migration Deadlines</option>
                      <option value="Academics">Passing Exams & Anatomy/Coding Labs</option>
                      <option value="Budget">Affordable Food, Markets & Transportation</option>
                      <option value="Language">Kazakh / Russian conversational practice</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-5 h-5 text-sky-300" />
                      <span>Run Mentor Matching Algorithm</span>
                    </button>
                  </div>
                </form>

                {/* Match Result Display */}
                {matchCalculated && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl">
                    <div className="flex items-center space-x-2 text-indigo-700 font-bold text-sm mb-4">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      <span>Optimal Mentor Match Computed: 98% Compatibility!</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img
                        src={matchedMentor.avatar}
                        alt={matchedMentor.name}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                      />
                      <div className="flex-1 space-y-2 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                          <h4 className="text-xl font-bold text-slate-900">{matchedMentor.name}</h4>
                          <span className="text-xs bg-indigo-600 text-white font-semibold px-2.5 py-0.5 rounded-full">
                            {matchedMentor.rating} ★ Rated Buddy
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 font-medium">
                          {matchedMentor.major} • {matchedMentor.university}
                        </p>
                        <p className="text-xs text-slate-600">{matchedMentor.bio}</p>

                        <div className="pt-2">
                          <span className="text-xs font-bold text-slate-700 block mb-1">Algorithm Decision Factors:</span>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {matchedMentor.matchReasons.map((reason, idx) => (
                              <span key={idx} className="text-xs bg-white border border-indigo-200 text-indigo-900 px-3 py-1 rounded-lg shadow-2xs font-medium">
                                ✓ {reason}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 flex justify-center md:justify-start">
                          <button
                            onClick={() => setActiveTab("chat")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-5 py-2.5 rounded-xl font-bold shadow-md transition flex items-center space-x-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Confirm & Connect in Chat</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sub-tab 3: Interactive Chat */}
            {activeTab === "chat" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[560px]">
                {/* Chat Header */}
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={MOCK_MENTORS[0].avatar}
                      alt="Mentor"
                      className="w-10 h-10 rounded-full object-cover border-2 border-sky-400"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm">{MOCK_MENTORS[0].name}</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-400/30">
                          Online
                        </span>
                      </div>
                      <span className="text-xs text-slate-300">Your Senior Buddy • 4th Year Medicine</span>
                    </div>
                  </div>

                  {/* Quick Prompts */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <button
                      onClick={() => setMessageInput("Where is the cheapest place to buy groceries in Astana?")}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700"
                    >
                      🛒 Cheap groceries?
                    </button>
                    <button
                      onClick={() => setMessageInput("Can you help me with the PSC (ЦОН) migration documents?")}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700"
                    >
                      🛂 Visa help
                    </button>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
                  {chatMessages.map((msg, index) => {
                    const isMe = msg.sender === (currentRole === "mentor" ? "mentor" : "student");
                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-2xs ${
                            isMe
                              ? "bg-indigo-600 text-white rounded-br-xs"
                              : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className={`text-[10px] block mt-1 text-right ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message or ask your buddy about survival tips in Kazakhstan..."
                    className="flex-1 text-sm bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition shadow flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {/* Sub-tab 4: Kazakhstan City Guide */}
            {activeTab === "guide" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">Kazakhstan Living & Survival Guide</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Curated by senior students to help international freshers stretch their budgets, navigate public transport, and avoid legal hiccups.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {CITY_GUIDE_ITEMS.map((item, i) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm transition">
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              item.badge === "Critical" ? "bg-rose-100 text-rose-800" : "bg-sky-100 text-sky-800"
                            }`}>
                              {item.badge}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 5: Events */}
            {activeTab === "events" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Upcoming Adaptation & Cultural Events</h3>
                    <p className="text-sm text-slate-600">Connect with peer mentors and foreign student communities.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {LOCAL_EVENTS.map(ev => (
                    <div key={ev.id} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-400 transition bg-slate-50 flex flex-col justify-between">
                      <div>
                        <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">
                          {ev.tag}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base mt-3">{ev.title}</h4>
                        <div className="text-xs text-slate-500 space-y-1 mt-2">
                          <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> {ev.date}</p>
                          <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {ev.location}</p>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-500">{ev.participants} signed up</span>
                        <button
                          onClick={() => triggerStaffAlert("Event Coordinator", `Registered for ${ev.title}`)}
                          className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                        >
                          Join Event
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: SENIOR MENTOR (BUDDY) VIEW */}
        {/* ========================================================================= */}
        {currentRole === "mentor" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={MOCK_MENTORS[0].avatar}
                    alt="Amina"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-200"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Amina Kenzhebayeva (Senior Mentor)</h2>
                    <p className="text-xs text-slate-500">4th Year Medicine • Mentor ID: #MEN-101 • 3 Active Mentees</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    Mentor Status: Available for Advisory
                  </span>
                </div>
              </div>

              {/* Mentees list */}
              <div className="mt-6">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span>Assigned International Mentees</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🇮🇳</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Aarav Sharma</h4>
                          <span className="text-xs text-slate-500">1st Year General Medicine</span>
                        </div>
                      </div>
                      <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                        Visa Alert (12d)
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      <strong>Current Status:</strong> Needs guidance with Migration paperwork & anatomy terms in Russian.
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => { setCurrentRole("student"); setActiveTab("chat"); }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg text-center"
                      >
                        Message Aarav
                      </button>
                      <button
                        onClick={() => triggerStaffAlert("Aarav Sharma", "Scheduled Polyclinic Escort")}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg"
                      >
                        Plan In-Person Meeting
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🇵🇰</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Tariq Mahmood</h4>
                          <span className="text-xs text-slate-500">1st Year General Medicine</span>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Well Adapted
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      <strong>Current Status:</strong> Got Kaspi card, attended first lecture, looking for halal budget cafes.
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => triggerStaffAlert("Tariq Mahmood", "Sent Astana Halal Food Guide")}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg"
                      >
                        Send Food Guide
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mentor Check-in Logger */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Log Mentee Check-in Note (Early Feedback to International Office)</span>
                </h3>
                <form onSubmit={handleAddMentorNote} className="space-y-3">
                  <textarea
                    rows={3}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Log academic progress, culture shock symptoms, or registration challenges to alert international office early..."
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                    >
                      Save Observation Note
                    </button>
                  </div>
                </form>

                {/* Existing Notes Feed */}
                <div className="mt-4 space-y-2">
                  {mentorNotes.map(n => (
                    <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex justify-between items-center mb-1 font-bold text-slate-800">
                        <span>Mentee: {n.student}</span>
                        <span className="text-slate-400 font-normal">{n.date}</span>
                      </div>
                      <p className="text-slate-600">{n.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: INTERNATIONAL OFFICE / STAFF ANALYTICS DASHBOARD */}
        {/* ========================================================================= */}
        {currentRole === "office" && (
          <div className="space-y-6">
            {/* Header & Evidence Citations */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                    <span>International Office Early-Warning & Retention System</span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Predictive monitoring to eliminate late expulsion notices and migration penalties.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-xl font-semibold">
                    Kazakhstan 2024-2025 Dataset
                  </span>
                </div>
              </div>

              {/* Assignment 1 Evidence Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <span className="text-xs font-medium text-sky-800 uppercase block">Total Foreign Students in KZ</span>
                  <span className="text-2xl font-black text-sky-950 mt-1 block">35,000+</span>
                  <span className="text-[11px] text-sky-700 mt-1 block">Source: el.kz Official Report</span>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                  <span className="text-xs font-medium text-rose-800 uppercase block">Expulsions (2024-2025)</span>
                  <span className="text-2xl font-black text-rose-900 mt-1 block">1,455</span>
                  <span className="text-[11px] text-rose-700 mt-1 block">Total 21,271 overall in Kazakhstan</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <span className="text-xs font-medium text-amber-800 uppercase block">At Immediate Risk (Campus)</span>
                  <span className="text-2xl font-black text-amber-900 mt-1 block">{atRiskList.length}</span>
                  <span className="text-[11px] text-amber-700 mt-1 block">Visa & Attendance Flags</span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-xs font-medium text-emerald-800 uppercase block">Mentored via Buddy Platform</span>
                  <span className="text-2xl font-black text-emerald-900 mt-1 block">89.4%</span>
                  <span className="text-[11px] text-emerald-700 mt-1 block">Drop-out rate reduced by 34%</span>
                </div>
              </div>
            </div>

            {/* At-Risk Students Early-Warning Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Real-Time Risk Registry</h3>
                  <p className="text-xs text-slate-500">Automated query connecting LMS attendance, accounting, and visa expiration.</p>
                </div>
                <button
                  onClick={() => triggerStaffAlert("All Flagged Students", "Bulk Automated SMS & WhatsApp Notification Sent")}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center space-x-1.5"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify All At-Risk Students</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="p-3.5">Student ID & Name</th>
                      <th className="p-3.5">Origin & Faculty</th>
                      <th className="p-3.5">Visa Expiry</th>
                      <th className="p-3.5">Attendance</th>
                      <th className="p-3.5">Risk Reason</th>
                      <th className="p-3.5">Urgent Intervention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {atRiskList.map(st => (
                      <tr key={st.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-bold text-slate-900">
                          <div>{st.name}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{st.id}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-slate-800 font-medium">{st.country}</span>
                          <span className="block text-[11px] text-slate-500">{st.major}</span>
                        </td>
                        <td className="p-3.5">
                          <span className={`font-bold px-2 py-0.5 rounded ${
                            st.visaDaysLeft <= 10
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {st.visaDaysLeft} days
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`font-bold ${st.attendance < 75 ? "text-rose-600" : "text-slate-700"}`}>
                            {st.attendance}%
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 max-w-xs">
                          {st.riskReason}
                        </td>
                        <td className="p-3.5 space-x-2">
                          <button
                            onClick={() => triggerStaffAlert(st.name, "Urgent Migration Office Summons Sent")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-2.5 py-1.5 rounded-lg text-[11px] transition shadow-2xs"
                          >
                            Send Summons
                          </button>
                          <button
                            onClick={() => triggerStaffAlert(st.name, "Assigned Senior Buddy for Escort")}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium px-2.5 py-1.5 rounded-lg text-[11px] transition"
                          >
                            Dispatch Buddy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architecture Concept Breakdown: IPO-SC Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-base font-bold mb-2 flex items-center space-x-2 text-sky-400">
                <Info className="w-5 h-5" />
                <span>ICT System Architecture Alignment (IPO-SC Framework)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <strong className="text-sky-300 block mb-1">INPUT</strong>
                  <p className="text-slate-300">GPA, attendance %, visa/IIN expiry date, tuition status, spoken languages, faculty.</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <strong className="text-sky-300 block mb-1">PROCESSING</strong>
                  <p className="text-slate-300">Matching algorithm by ethnicity/language; threshold alerts (attendance &lt; 75%, visa &lt; 15d).</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <strong className="text-sky-300 block mb-1">OUTPUT</strong>
                  <p className="text-slate-300">Push notifications, matched mentor profile, active chat, city life survival tips.</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <strong className="text-sky-300 block mb-1">STORAGE</strong>
                  <p className="text-slate-300">PostgreSQL relational DB, student records, mentors credentials, encrypted docs.</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <strong className="text-sky-300 block mb-1">COMMUNICATION</strong>
                  <p className="text-slate-300">HTTPS, WebSockets for instant chat, Firebase Cloud Messaging (FCM) & Wi-Fi/4G/5G.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Buddy Kazakhstan • Assignment 1 ICT Solution System (CS-2609)</span>
          <span className="text-slate-400">Team: Azamat, Sanzhar, Ernar, Akezhan</span>
        </div>
      </footer>
    </div>
  );
}