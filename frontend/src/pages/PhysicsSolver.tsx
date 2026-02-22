import { useState, useRef } from "react";
import { fetchAnswerAndVideoUrl } from "../apis/manimSolution";
import NavButton from "../components/button/NavButtons";
// import Header from "../components/chatInterface/Header.jsx";
type Subject = "physics" | "mathematics";
type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  subject?: Subject;
  videoSolution?: string;
  isLoading?: boolean;
  imageUrl?: string;
}

interface VideoSolution {
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  url: string;
}

const SAMPLE_VIDEOS: VideoSolution[] = [
  {
    title: "Newton's Laws of Motion - Complete Explanation",
    channel: "Physics with Professor Dave",
    duration: "14:32",
    thumbnail: "https://img.youtube.com/vi/kKKM8Y-u7ds/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
  },
  {
    title: "Calculus Integration Techniques Explained",
    channel: "3Blue1Brown",
    duration: "18:45",
    thumbnail: "https://img.youtube.com/vi/rfG8ce4nNh0/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=rfG8ce4nNh0",
  },
  {
    title: "Quantum Mechanics for Beginners",
    channel: "MinutePhysics",
    duration: "9:18",
    thumbnail: "https://img.youtube.com/vi/p7bzE1E5PMY/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=p7bzE1E5PMY",
  },
];

async function askClaude(question: string, subject: Subject, imageBase64?: string): Promise<{ answer: string; video: VideoSolution }> {
  const systemPrompt = `You are an expert ${subject} tutor. Provide clear, step-by-step solutions to ${subject} problems. 
Format your response with:
1. **Understanding the Problem** - Brief restatement
2. **Key Concepts** - Relevant formulas/theorems
3. **Step-by-Step Solution** - Detailed working
4. **Final Answer** - Boxed or clearly stated answer
5. **Key Takeaways** - What to remember

Use LaTeX-style notation where helpful (write it as plain text like F = ma, E = mc^2, etc.).`;

  const messages: any[] = [];
  
  if (imageBase64) {
    messages.push({
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageBase64 } },
        { type: "text", text: question || `Please solve this ${subject} problem shown in the image.` }
      ]
    });
  } else {
    messages.push({ role: "user", content: question });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });

  const data = await response.json();
  const answer = data.content?.map((b: any) => b.text || "").join("") || "Unable to generate solution.";
  const video = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)];

  return { answer, video };
}

function SubjectBadge({ subject }: { subject: Subject }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
        subject === "physics"
          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
          : "bg-violet-500/20 text-violet-400 border border-violet-500/30"
      }`}
    >
      {subject === "physics" ? "⚛" : "∑"} {subject.toUpperCase()}
    </span>
  );
}

function VideoCard({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="group mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/40 hover:bg-slate-800 transition-all duration-200">

      {/* 🎬 VIDEO AREA */}
      <div className="relative w-full overflow-hidden rounded-lg">

        <video
          ref={videoRef}
          src={videoUrl}
        //   poster={video.thumbnail}
          controls={playing}
          className="w-full h-52 object-cover rounded-lg bg-black"
        />

        {/* ▶ PLAY BUTTON OVERLAY */}
        {!playing && (
          <div
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 group-hover:bg-black/30 transition"
          >
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* ⏱ DURATION */}
        {/* {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded">
            {video.duration}
          </span>
        )} */}
      </div>

      {/* 📄 TEXT CONTENT */}
      {/* <div className="mt-3">
        <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {video.title}
        </p>

        <p className="text-xs text-slate-500 mt-1">{video.channel}</p> */}
      {/* </div> */}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 mb-6">
        <div className="max-w-[75%]">
          {message.subject && (
            <div className="flex justify-end mb-1.5">
              <SubjectBadge subject={message.subject} />
            </div>
          )}
          {message.imageUrl && (
            <img src={message.imageUrl} alt="uploaded" className="w-full max-w-xs rounded-xl mb-2 ml-auto border border-slate-700" />
          )}
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed shadow-lg shadow-cyan-900/20">
            {message.content}
          </div>
        </div>
        <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
          U
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-6">
      <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white shadow-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.346.346A3.51 3.51 0 0113 20.5h-2a3.51 3.51 0 01-2.393-.954l-.346-.346z" />
        </svg>
      </div>
      <div className="max-w-[80%]">
        {message.isLoading ? (
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">Solving...</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm px-5 py-4 shadow-xl">
            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-mono">
              {message.content}
            </div>
            {message.videoSolution && <VideoCard videoUrl={message.videoSolution} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PhysicsMathSolver() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState<Subject>("physics");
  const [uploadedImage, setUploadedImage] = useState<{ url: string; base64: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;
    if (isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      subject,
    };

    const loadingMsg: Message = {
      id: Date.now().toString() + "_loading",
      role: "assistant",
      content: "",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setUploadedImage(null);
    setIsLoading(true);
    scrollToBottom();

    try {
    //   const { answer, video } = await askClaude(question, subject, uploadedImage?.base64);
         const { answer, videoUrl } = await fetchAnswerAndVideoUrl(question);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? { ...m, content: answer, videoSolution: videoUrl, isLoading: false }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? { ...m, content: "Sorry, I encountered an error. Please try again.", isLoading: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex flex-col" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavButton/>
        </div>
      </header>

      {/* Chat Area */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 flex flex-col">
        {!hasMessages ? (
          /* Welcome / Drop Zone */
          <div className="flex-1 flex flex-col items-center justify-center py-16 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/20 mb-6 shadow-2xl shadow-cyan-500/10">
                <span className="text-4xl">🔬</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Ask any{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  Physics
                </span>{" "}
                or{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  Math
                </span>{" "}
                question
              </h2>
              <p className="text-slate-500 text-sm max-w-sm">
                Upload an image of your question or type it below. Get step-by-step solutions + video explanations.
              </p>
            </div>

            {/* Drop Zone */}
            {/* <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full max-w-md border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-slate-600 hover:bg-slate-800/30"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
                📎
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-300">Drop your question image here</p>
                <p className="text-xs text-slate-600 mt-1">PNG, JPG, JPEG supported</p>
              </div>
              <span className="text-xs text-cyan-500 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 rounded-full">
                Click to Browse
              </span>
            </div> */}

            {/* Quick examples */}
            {/* <div className="flex flex-wrap gap-2 justify-center">
              {[
                { text: "Solve F = ma for acceleration", s: "physics" as Subject },
                { text: "Integrate ∫ x² dx", s: "mathematics" as Subject },
                { text: "Explain quantum entanglement", s: "physics" as Subject },
                { text: "Find the derivative of sin(x²)", s: "mathematics" as Subject },
              ].map((ex) => (
                <button
                  key={ex.text}
                  onClick={() => { setInput(ex.text); setSubject(ex.s); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                >
                  {ex.text}
                </button>
              ))}
            </div> */}
          </div>
        ) : (
          /* Messages */
          <div ref={chatRef} className="flex-1 py-6 overflow-y-auto">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="sticky bottom-0 py-4 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/95 to-transparent">
          {/* Image Preview */}
          {/* {uploadedImage && (
            <div className="mb-2 flex items-center gap-2">
              <div className="relative">
                <img src={uploadedImage.url} alt="upload preview" className="h-14 w-20 object-cover rounded-lg border border-slate-700" />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white hover:bg-red-400"
                >
                  ×
                </button>
              </div>
              <span className="text-xs text-slate-500">Image ready to submit</span>
            </div>
          )} */}

          <div className={`flex items-end gap-2 bg-slate-800/70 backdrop-blur-xl border rounded-2xl px-4 py-3 shadow-2xl transition-all duration-200 ${
            isLoading ? "border-slate-700/30" : "border-slate-700/50 focus-within:border-cyan-500/40"
          }`}>
            {/* <button
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 w-8 h-8 rounded-lg bg-slate-700/60 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all mb-0.5"
              title="Upload image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button> */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask a ${subject} question... (Enter to send)`}
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 resize-none outline-none leading-relaxed max-h-32 min-h-[24px]"
              style={{ fontFamily: "inherit" }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !uploadedImage)}
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg mb-0.5 ${
                isLoading || (!input.trim() && !uploadedImage)
                  ? "bg-slate-700/40 text-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30 active:scale-95"
              }`}
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}