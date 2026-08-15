"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const DoubleCheckIcon = ({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 16 11"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.045 0.584961L11.9883 1.52829L5.85833 7.65829L2.55833 4.35829L3.50167 3.41496L5.85833 5.77163L11.045 0.584961ZM14.345 0.584961L15.2883 1.52829L9.15833 7.65829L8.215 6.71496L14.345 0.584961ZM9.15833 9.54496L5.85833 6.24496L6.80167 5.30163L9.15833 7.65829L14.345 2.47163L15.2883 3.41496L9.15833 9.54496Z" />
  </svg>
);

const SearchIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const MoreVerticalIcon = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

const StatusCircleIcon = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
  </svg>
);

const NewChatIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="12" y1="8" x2="12" y2="14" />
    <line x1="9" y1="11" x2="15" y2="11" />
  </svg>
);

const PaperclipIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const MicrophoneIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const EmojiIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={3} />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={3} />
  </svg>
);

const PlayIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const LockIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export interface ChatMessage {
  id: number;
  sender: string;
  avatarInitial?: string;
  text: string;
  isCurrentUser: boolean;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: string;
  reaction?: string;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: "Alex (Design Lead)",
    avatarInitial: "A",
    text: "Hey team! 👋 The Whatsapp Macbook UI component is ready for Great UI!",
    isCurrentUser: false,
    timestamp: "10:41 AM",
  },
  {
    id: 2,
    sender: "You",
    avatarInitial: "Y",
    text: "Awesome! The desktop dual-pane view looks super clean 💻✨",
    isCurrentUser: true,
    timestamp: "10:41 AM",
  },
  {
    id: 3,
    sender: "Alex (Design Lead)",
    avatarInitial: "A",
    text: "Check out the audio notes and real-time message stream:",
    isCurrentUser: false,
    timestamp: "10:42 AM",
    isAudio: true,
    audioDuration: "0:32",
  },
  {
    id: 4,
    sender: "You",
    avatarInitial: "Y",
    text: "Pushed to registry! Super clean 🚀",
    isCurrentUser: true,
    timestamp: "10:43 AM",
    reaction: "🔥 5",
  },
];

interface SidebarChatItem {
  id: string;
  name: string;
  initial: string;
  avatarUrl?: string;
  lastMsg: string;
  time: string;
  unreadCount?: number;
  isActive?: boolean;
}

const SIDEBAR_CHATS: SidebarChatItem[] = [
  {
    id: "1",
    name: "Alex (Design Lead)",
    initial: "A",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    lastMsg: "Pushed to registry! Super clean 🚀",
    time: "10:43 AM",
    isActive: true,
  },
  {
    id: "2",
    name: "Product Design Sync",
    initial: "P",
    avatarUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    lastMsg: "Sarah: Let's review the new tokens at 3 PM",
    time: "10:15 AM",
    unreadCount: 3,
  },
  {
    id: "3",
    name: "Sarah Miller",
    initial: "S",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    lastMsg: "Got the updated Figma file, thanks!",
    time: "9:40 AM",
  },
  {
    id: "4",
    name: "Frontend Core Team",
    initial: "F",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    lastMsg: "Build completed successfully in 1.2s",
    time: "Yesterday",
  },
];

export interface MacbookMockupProps {
  headerTitle?: string;
  headerSubtitle?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  userAvatarUrl?: string;
  messages?: ChatMessage[];
  autoPlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MacbookMockup({
  headerTitle = "Alex (Design Lead)",
  headerSubtitle = "online",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  avatarFallback = "A",
  userAvatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  messages = DEFAULT_MESSAGES,
  autoPlay = true,
  className,
  children,
}: MacbookMockupProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!autoPlay || children) {
      return;
    }

    let isMounted = true;
    let t1: NodeJS.Timeout,
      t2: NodeJS.Timeout,
      t3: NodeJS.Timeout,
      t4: NodeJS.Timeout,
      tReset: NodeJS.Timeout;

    const runSequence = () => {
      if (!isMounted) return;
      setVisibleMessages([]);
      setShowTyping(false);

      t1 = setTimeout(() => {
        if (!isMounted) return;
        setVisibleMessages([messages[0]]);
        setShowTyping(true);
      }, 800);

      t2 = setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages([messages[0], messages[1]]);
        setTimeout(() => {
          if (isMounted) setShowTyping(true);
        }, 650);
      }, 2700);

      t3 = setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages([messages[0], messages[1], messages[2]]);
      }, 5000);

      t4 = setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setVisibleMessages(messages);
      }, 7400);

      tReset = setTimeout(() => {
        if (isMounted) {
          setCycleKey((prev) => prev + 1);
        }
      }, 11500);
    };

    runSequence();

    return () => {
      isMounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tReset);
    };
  }, [autoPlay, children, messages, cycleKey]);

  const displayMessages = !autoPlay || children ? messages : visibleMessages;

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-[480px] transform-gpu flex-col items-center justify-center py-4 select-none [perspective:1200px] sm:max-w-[620px] md:max-w-[720px]",
        className,
      )}
    >
      <motion.div
        initial={{ rotateX: -70, opacity: 0, scale: 0.92 }}
        animate={{ rotateX: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 20, mass: 0.9 }}
        style={{ transformOrigin: "bottom center" }}
        className="relative z-10 flex h-[320px] w-full transform-gpu flex-col overflow-hidden rounded-t-2xl bg-neutral-900 p-2 sm:h-[390px] sm:p-2.5 md:h-[430px] dark:bg-neutral-950"
      >
        <div className="relative isolate flex h-full w-full transform-gpu overflow-hidden rounded-t-[10px] bg-white text-neutral-900 transition-colors dark:bg-[#111b21] dark:text-neutral-100">
          <div className="flex w-[170px] shrink-0 flex-col bg-[#f0f2f5] transition-colors sm:w-[220px] md:w-[250px] dark:bg-[#111b21]">
            <div className="flex shrink-0 items-center justify-between bg-[#f0f2f5] px-3 py-2 dark:bg-[#202c33]">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-xs font-bold text-white dark:bg-emerald-700">
                {userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt="You"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>Y</span>
                )}
              </div>
              <div className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-400">
                <button
                  type="button"
                  aria-label="Status"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <StatusCircleIcon />
                </button>
                <button
                  type="button"
                  aria-label="New chat"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <NewChatIcon />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <MoreVerticalIcon />
                </button>
              </div>
            </div>

            <div className="p-2">
              <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1 text-xs text-neutral-400 dark:bg-[#202c33]">
                <SearchIcon className="h-3.5 w-3.5 shrink-0 text-neutral-500 dark:text-neutral-400" />
                <span className="truncate text-[10.5px]">Search chat...</span>
                <FilterIcon className="ml-auto h-3 w-3 shrink-0 text-neutral-400" />
              </div>
            </div>

            <div className="flex-1 [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {SIDEBAR_CHATS.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2.5 px-3 py-2.5 transition-colors",
                    chat.isActive
                      ? "bg-neutral-200/70 dark:bg-[#2a3942]"
                      : "hover:bg-neutral-200/40 dark:hover:bg-[#202c33]/60",
                  )}
                >
                  {chat.isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#00a884]" />
                  )}

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-xs font-bold text-white sm:h-8 sm:w-8 dark:bg-emerald-900">
                    {chat.avatarUrl ? (
                      <img
                        src={chat.avatarUrl}
                        alt={chat.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{chat.initial}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-[11px] font-semibold text-neutral-900 dark:text-neutral-100">
                        {chat.name}
                      </span>
                      <span className="shrink-0 text-[9px] text-neutral-400 dark:text-neutral-400">
                        {chat.time}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-neutral-500 dark:text-neutral-400">
                      {chat.lastMsg}
                    </p>
                  </div>

                  {chat.unreadCount && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-[9px] font-bold text-white">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-w-0 flex-1 flex-col bg-[#efeae2] transition-colors dark:bg-[#0b141a]">
            <div className="z-10 flex shrink-0 items-center justify-between bg-[#f0f2f5] px-3.5 py-2 dark:bg-[#202c33]">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-xs font-bold text-white dark:bg-emerald-900">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={headerTitle}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span>{avatarFallback}</span>
                  )}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-xs leading-tight font-semibold text-neutral-900 dark:text-neutral-100">
                    {headerTitle}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    {headerSubtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <SearchIcon />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <MoreVerticalIcon />
                </button>
              </div>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-end space-y-2.5 overflow-hidden p-3.5">
              {children ? (
                <div className="h-full w-full [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {children}
                </div>
              ) : (
                <>
                  <div className="mx-auto my-1 flex max-w-[90%] items-center justify-center gap-1 rounded-md bg-[#ffeebd] px-3 py-1 text-center text-[9.5px] text-amber-900 dark:bg-[#182229] dark:text-amber-200/80">
                    <LockIcon className="h-2.5 w-2.5 shrink-0 text-amber-700 dark:text-amber-400" />
                    <span>Messages and calls are end-to-end encrypted.</span>
                  </div>

                  <div className="mx-auto my-0.5 rounded-md bg-white/80 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-neutral-500 uppercase dark:bg-[#182229]/90 dark:text-neutral-400">
                    TODAY
                  </div>

                  <div className="flex flex-1 [scrollbar-width:none] flex-col justify-end space-y-2.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <AnimatePresence mode="sync">
                      {displayMessages.map((msg) => (
                        <motion.div
                          key={`${cycleKey}-${msg.id}`}
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                          className={`flex flex-col ${msg.isCurrentUser ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={cn(
                              "relative max-w-[75%] rounded-lg px-3 py-1.5 text-xs transition-colors",
                              msg.isCurrentUser
                                ? "rounded-tr-none bg-[#dcf8c6] text-neutral-900 dark:bg-[#005c4b] dark:text-neutral-100"
                                : "rounded-tl-none bg-white text-neutral-900 dark:bg-[#202c33] dark:text-neutral-100",
                            )}
                          >
                            {!msg.isCurrentUser && (
                              <p className="mb-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                                {msg.sender}
                              </p>
                            )}

                            {msg.isAudio ? (
                              <div className="flex min-w-[180px] items-center gap-3 py-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIsPlayingAudio(!isPlayingAudio)
                                  }
                                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
                                >
                                  <PlayIcon className="ml-0.5 h-3 w-3" />
                                </button>
                                <div className="flex flex-1 flex-col gap-1">
                                  <div className="flex h-3 items-center gap-0.5">
                                    {[
                                      40, 75, 30, 90, 60, 100, 45, 80, 50, 70,
                                      35, 90, 65, 40, 85, 55,
                                    ].map((h, idx) => (
                                      <span
                                        key={idx}
                                        className="w-1 rounded-full bg-emerald-600/80 dark:bg-emerald-400/80"
                                        style={{ height: `${h}%` }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[9px] text-neutral-500 dark:text-neutral-400">
                                    Audio note • {msg.audioDuration}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="xs:text-xs text-[11.5px] leading-snug">
                                {msg.text}
                              </p>
                            )}

                            <div className="mt-0.5 flex items-center justify-end gap-1">
                              <span
                                className={cn(
                                  "text-[9px]",
                                  msg.isCurrentUser
                                    ? "text-emerald-800/70 dark:text-emerald-200/60"
                                    : "text-neutral-400 dark:text-neutral-400",
                                )}
                              >
                                {msg.timestamp}
                              </span>
                              {msg.isCurrentUser && (
                                <DoubleCheckIcon className="h-3.5 w-3.5 text-[#53bdeb]" />
                              )}
                            </div>

                            {msg.reaction && (
                              <div className="py-0.2 absolute right-2 -bottom-2 rounded-full bg-white px-1.5 text-[9px] dark:bg-[#182229]">
                                {msg.reaction}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {showTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-start"
                        >
                          <div className="flex items-center gap-1.5 rounded-lg rounded-tl-none bg-white px-3 py-2 dark:bg-[#202c33]">
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              typing
                            </span>
                            <div className="flex items-center gap-1">
                              {[0, 1, 2].map((dotIndex) => (
                                <motion.span
                                  key={dotIndex}
                                  className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                                  animate={{
                                    y: [0, -3, 0],
                                    opacity: [0.4, 1, 0.4],
                                  }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: dotIndex * 0.15,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            <div className="z-10 flex shrink-0 items-center gap-2 bg-[#f0f2f5] p-2.5 dark:bg-[#111b21]">
              <button
                type="button"
                className="p-1 text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
              >
                <EmojiIcon />
              </button>
              <button
                type="button"
                className="p-1 text-neutral-600 transition-colors hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
              >
                <PaperclipIcon />
              </button>
              <div className="flex-1 rounded-lg bg-white px-3 py-1.5 text-xs text-neutral-400 dark:bg-[#2a3942] dark:text-neutral-400">
                Type a message
              </div>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white transition-colors hover:bg-emerald-600"
              >
                <MicrophoneIcon />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-20 flex h-3.5 w-[520px] items-start justify-center rounded-b-xl bg-neutral-300 sm:h-4 sm:w-[670px] md:w-[770px] dark:bg-neutral-800">
        <div className="h-1.5 w-14 rounded-b-md bg-neutral-400/90 sm:w-20 dark:bg-neutral-700/90" />
      </div>
    </div>
  );
}

export default MacbookMockup;

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_s
 */
