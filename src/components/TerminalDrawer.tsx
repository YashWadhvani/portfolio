"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, SKILL_CATEGORIES, ALL_REPOSITORIES } from "@/data/portfolioData";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1">
          <p className="text-syntax-storage font-semibold">⚡ Yash Wadhvani Integrated Terminal v2.0.0 [AI-Core]</p>
          <p className="text-editor-textMuted">Type <span className="text-syntax-type font-bold">help</span> to view available terminal commands, or <span className="text-syntax-keyword font-bold">neofetch</span> for system telemetry.</p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [enteredCmds, setEnteredCmds] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setEnteredCmds((prev) => [...prev, cmd]);
    setCmdIndex(-1);

    const parts = cmd.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output: React.ReactNode;

    switch (mainCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-syntax-storage font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div><span className="text-syntax-type font-code font-bold">about</span> - Yash's bio & background</div>
              <div><span className="text-syntax-type font-code font-bold">skills</span> - List categorized tech skills</div>
              <div><span className="text-syntax-type font-code font-bold">projects</span> - View featured GitHub repos</div>
              <div><span className="text-syntax-type font-code font-bold">contact</span> - Display contact channels</div>
              <div><span className="text-syntax-type font-code font-bold">neofetch</span> - Telemetry & architecture</div>
              <div><span className="text-syntax-type font-code font-bold">resume</span> - Download verified resume</div>
              <div><span className="text-syntax-type font-code font-bold">clear</span> - Clear screen history</div>
              <div><span className="text-syntax-type font-code font-bold">date</span> - Display local time</div>
              <div><span className="text-syntax-type font-code font-bold">sudo</span> - Elevated administrative privileges</div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-syntax-storage font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</p>
            <p className="text-editor-textSecondary">{PERSONAL_INFO.bio}</p>
            <p className="text-syntax-keyword">Education: M.Tech Advanced Computing @ MANIT Bhopal &bull; B.Tech CSE (AI/ML) @ KU</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-syntax-storage font-bold">Verified Technical Competencies:</p>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx}>
                <span className="text-syntax-keyword font-semibold">{cat.title}: </span>
                <span className="text-editor-textSecondary">{cat.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-syntax-storage font-bold">Featured Repositories &amp; Systems ({ALL_REPOSITORIES.length}+ Total):</p>
            {ALL_REPOSITORIES.slice(0, 6).map((proj) => (
              <div key={proj.id} className="border-l-2 border-syntax-type pl-2">
                <a href={proj.html_url} target="_blank" rel="noreferrer" className="text-syntax-type font-bold hover:underline">
                  {proj.title} ({proj.language})
                </a>
                <p className="text-editor-textMuted text-[11px]">{proj.description}</p>
              </div>
            ))}
            <p className="text-editor-textMuted text-[10px] italic">View all {ALL_REPOSITORIES.length} repositories on the projects.tsx page.</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-syntax-storage font-bold">Get In Touch:</p>
            <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-syntax-type hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>WhatsApp: <a href={PERSONAL_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-syntax-type hover:underline">{PERSONAL_INFO.phone}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="text-syntax-storage hover:underline">linkedin.com/in/yash-wadhvani</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="text-syntax-keyword hover:underline">github.com/YashWadhvani</a></p>
          </div>
        );
        break;

      case "neofetch":
        output = (
          <div className="font-code text-xs flex flex-col md:flex-row gap-4 items-start py-2">
            <pre className="text-syntax-storage text-[10px] leading-tight select-none font-bold">
{`   __   __           _      
   \\ \\ / /          | |     
    \\ V /__ _ ___  | |__   
     | |/ _\` / __| | '_ \\  
     | | (_| \\__ \\ | | | | 
     \\_/\\__,_|___/ |_| |_| `}
            </pre>
            <div className="space-y-0.5 text-xs">
              <p><span className="text-syntax-storage font-bold">yash@portfolio-ide</span></p>
              <p className="text-editor-textMuted">--------------------------</p>
              <p><span className="text-syntax-keyword font-semibold">Postgrad:</span> M.Tech Advanced Computing (MANIT Bhopal)</p>
              <p><span className="text-syntax-keyword font-semibold">Undergrad:</span> B.Tech CSE AI/ML @ UIT (CGPA: 8.72)</p>
              <p><span className="text-syntax-keyword font-semibold">Industry:</span> Logion Solutions (Full Stack Intern)</p>
              <p><span className="text-syntax-keyword font-semibold">Research:</span> IEEE AIEI 2026 (SafeRoute Navigation)</p>
              <p><span className="text-syntax-keyword font-semibold">Shell:</span> bash / zsh 5.9</p>
              <p><span className="text-syntax-keyword font-semibold">Stack:</span> Flutter, React Native, Next.js, Python, MERN</p>
              <div className="flex gap-1 mt-2">
                <span className="w-3 h-3 bg-red-500 rounded-xs"></span>
                <span className="w-3 h-3 bg-green-500 rounded-xs"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-xs"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-xs"></span>
                <span className="w-3 h-3 bg-purple-500 rounded-xs"></span>
                <span className="w-3 h-3 bg-cyan-500 rounded-xs"></span>
              </div>
            </div>
          </div>
        );
        break;

      case "resume":
      case "cat":
        if (mainCmd === "cat" && arg !== "resume.pdf" && arg !== "resume.txt") {
          output = <p className="text-syntax-string text-xs">cat: {arg || "unspecified file"}: No such file or directory</p>;
        } else {
          confetti({ particleCount: 70, spread: 55, origin: { y: 0.7 } });
          window.open(PERSONAL_INFO.resumeUrl, "_blank");
          output = (
            <p className="text-syntax-type text-xs">
              ✓ Downloading resume: <span className="underline font-bold">YashWadhvani_Resume.pdf</span>
            </p>
          );
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "date":
        output = <p className="text-syntax-variable text-xs">{new Date().toString()}</p>;
        break;

      case "pwd":
        output = <p className="text-editor-textMuted text-xs">/home/yash/projects/portfolio</p>;
        break;

      case "ls":
        output = (
          <div className="flex gap-4 text-xs font-code">
            <span className="text-syntax-storage">home.tsx</span>
            <span className="text-syntax-keyword">about.tsx</span>
            <span className="text-syntax-type">projects.tsx</span>
            <span className="text-syntax-string">contact.tsx</span>
            <span className="text-syntax-variable">resume.pdf</span>
            <span className="text-syntax-func">package.json</span>
          </div>
        );
        break;

      case "sudo":
        output = (
          <p className="text-syntax-string text-xs font-code">
            yash is not in the sudoers file. This incident will be reported. 😉
          </p>
        );
        break;

      default:
        output = (
          <p className="text-syntax-string text-xs">
            command not found: {mainCmd}. Type <span className="text-syntax-type font-bold">help</span> to view all commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (enteredCmds.length === 0) return;
      const nextIdx = cmdIndex === -1 ? enteredCmds.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIdx);
      setInput(enteredCmds[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (enteredCmds.length === 0 || cmdIndex === -1) return;
      const nextIdx = cmdIndex + 1;
      if (nextIdx >= enteredCmds.length) {
        setCmdIndex(-1);
        setInput("");
      } else {
        setCmdIndex(nextIdx);
        setInput(enteredCmds[nextIdx]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-6 left-0 right-0 z-40 bg-editor-bg border-t border-editor-border shadow-vscode transition-all duration-200 ${
        isMaximized ? "h-[85vh]" : "h-72 md:h-80"
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-editor-border bg-editor-card text-xs text-editor-textSecondary select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-editor-textHeading font-medium font-code">
            <TerminalIcon className="w-3.5 h-3.5 text-syntax-storage" />
            <span>TERMINAL</span>
          </div>
          <span className="opacity-40">|</span>
          <span className="text-editor-textMuted font-code">bash (yash@portfolio)</span>
          <span className="hidden md:inline text-[10px] text-syntax-type bg-editor-bg border border-editor-border px-1.5 py-0.2 rounded font-code">
            ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="p-1 rounded hover:bg-editor-hover text-editor-textMuted hover:text-editor-textPrimary transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Restore Size" : "Maximize"}
            className="p-1 rounded hover:bg-editor-hover text-editor-textMuted hover:text-editor-textPrimary transition cursor-pointer"
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            title="Close Panel"
            className="p-1 rounded hover:bg-editor-hover text-editor-textMuted hover:text-editor-textHeading transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Content & History */}
      <div className="h-[calc(100%-38px)] overflow-y-auto p-4 font-code text-xs space-y-3 bg-editor-bg text-editor-textPrimary">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-editor-textMuted">
              <span className="text-syntax-type font-semibold">yash@dev-box</span>
              <span className="opacity-40">:</span>
              <span className="text-syntax-storage font-semibold">~/portfolio</span>
              <span className="text-editor-textPrimary font-bold">$</span>
              <span className="text-editor-textHeading font-medium">{item.command}</span>
            </div>
            <div className="pl-4 text-editor-textPrimary">{item.output}</div>
          </div>
        ))}

        {/* Current Prompt Input */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 text-editor-textMuted pt-1">
          <span className="text-syntax-type font-semibold">yash@dev-box</span>
          <span className="opacity-40">:</span>
          <span className="text-syntax-storage font-semibold">~/portfolio</span>
          <span className="text-editor-textPrimary font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-editor-textPrimary focus:outline-none caret-syntax-storage font-code text-xs"
            placeholder="Type 'help' for commands..."
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
