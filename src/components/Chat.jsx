import { useEffect, useMemo, useState } from "react";
import Detail from "./Detail";
import List from "./List";

const sampleChats = [
  {
    id: 1,
    name: "Rahma",
    status: "Online",
    lastSeen: "Active now",
    avatar: "R",
    email: "rahma@chatapp.dev",
    phone: "+1 202 555 0198",
    role: "Project Manager",
    timezone: "UTC-5",
    lastMessage: "Can we deploy tonight? ",
    time: "10:24 PM",
    unread: 2,
    messages: [
      {
        id: 1,
        fromMe: false,
        text: "Hey, can we deploy tonight? lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        timestamp: "10:20 PM",
        read: true,
      },
      {
        id: 2,
        fromMe: true,
        text: "Yes, after final testing. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        timestamp: "10:21 PM",
        read: true,
      },
      {
        id: 3,
        fromMe: false,
        text: "Perfect. I will prepare notes.",
        timestamp: "10:24 PM",
        read: false,
      },
    ],
  },
  {
    id: 2,
    name: "Helmi",
    status: "Away",
    lastSeen: "Last seen 8m ago",
    avatar: "H",
    email: "helmi@chatapp.dev",
    phone: "+1 202 555 0145",
    role: "Frontend Engineer",
    timezone: "UTC+1",
    lastMessage: "UI is looking good now.",
    time: "09:58 PM",
    unread: 0,
    messages: [
      {
        id: 1,
        fromMe: true,
        text: "Did you check the new login page?",
        timestamp: "09:55 PM",
        read: true,
      },
      {
        id: 2,
        fromMe: false,
        text: "Yes, UI is looking good now.",
        timestamp: "09:58 PM",
        read: true,
      },
    ],
  },
  {
    id: 3,
    name: "Maher",
    status: "Online",
    lastSeen: "Active now",
    avatar: "M",
    email: "maher@chatapp.dev",
    phone: "+1 202 555 0112",
    role: "Product Designer",
    timezone: "UTC+3",
    lastMessage: "Let’s sync in 10 mins.",
    time: "09:41 PM",
    unread: 1,
    messages: [
      {
        id: 1,
        fromMe: false,
        text: "Let's sync in 10 mins.",
        timestamp: "09:38 PM",
        read: true,
      },
      {
        id: 2,
        fromMe: true,
        text: "Sure, I am joining.",
        timestamp: "09:41 PM",
        read: false,
      },
    ],
  },
];

function Chat({ currentUser, onLogout }) {
  // Feature: selected chat state
  const [selectedChatId, setSelectedChatId] = useState(
    sampleChats[0]?.id ?? null,
  );

  // Feature: mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileProfile, setMobileProfile] = useState({
    name: currentUser?.name || "My Profile",
    email: currentUser?.email || "me@chatapp.dev",
    phone: currentUser?.phone || "+1 000 000 0000",
    image: "",
  });
  const [mobileDraftProfile, setMobileDraftProfile] = useState(mobileProfile);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);
  const [mobilePreferences, setMobilePreferences] = useState({
    showMessagePreview: true,
    showUnreadBadge: true,
    muteNotifications: false,
  });

  // Feature: active chat data
  const selectedChat = useMemo(
    () => sampleChats.find((chat) => chat.id === selectedChatId) ?? null,
    [selectedChatId],
  );

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setMobileProfile((previous) => ({
      ...previous,
      name: currentUser.name || previous.name,
      email: currentUser.email || previous.email,
      phone: currentUser.phone || previous.phone,
    }));
  }, [currentUser]);

  const mobileProfileInitial =
    mobileProfile.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const openMobileProfileEditor = () => {
    setMobileDraftProfile(mobileProfile);
    setIsMobileProfileOpen(true);
  };

  const handleMobileImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setMobileDraftProfile((previous) => ({
        ...previous,
        image: typeof fileReader.result === "string" ? fileReader.result : "",
      }));
    };
    fileReader.readAsDataURL(file);
  };

  const saveMobileProfile = () => {
    setMobileProfile(mobileDraftProfile);
    setIsMobileProfileOpen(false);
  };

  return (
    <>
      {/* Feature: mobile chat layout */}
      <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/25 bg-[#132219]/75 text-white shadow-2xl backdrop-blur-2xl md:hidden">
        {/* Feature: mobile top bar */}
        <div className="flex items-center gap-2 border-b border-white/15 bg-[#0d1712]/80 px-4 py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg border border-white/20 bg-white/10 p-2 text-white/90 transition-colors hover:bg-white/15"
            title="Toggle sidebar"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="flex-1 text-sm font-semibold tracking-wide text-white/95">
            {selectedChat?.name || "Messages"}
          </h2>
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] text-white/80">
            {sampleChats.length}
          </span>
        </div>

        {/* Feature: mobile sidebar chat list */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-[82%] max-w-[320px] border-r border-white/15 bg-[#0f1a14]/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/15 p-4">
              <h3 className="font-semibold text-white">Chats</h3>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded text-white/70 hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mx-3 mt-3 mb-2 rounded-2xl border border-white/15 bg-black/20 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/25 text-sm font-semibold text-white">
                    {mobileProfile.image ? (
                      <img
                        src={mobileProfile.image}
                        alt="Mobile profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{mobileProfileInitial}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white/95">
                      {mobileProfile.name}
                    </p>
                    <p className="truncate text-xs text-white/65">
                      {mobileProfile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title="Profile"
                    onClick={openMobileProfileEditor}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M5.121 17.804A9.955 9.955 0 0112 15c2.6 0 4.967.992 6.758 2.618M15 9a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="Settings"
                    onClick={() => setIsMobileSettingsOpen(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M10.325 4.317a1 1 0 011.35-.936l.925.37a1 1 0 00.75 0l.925-.37a1 1 0 011.35.936l.08.993a1 1 0 00.592.823l.897.408a1 1 0 01.455 1.372l-.49.865a1 1 0 000 .985l.49.865a1 1 0 01-.455 1.372l-.897.408a1 1 0 00-.592.823l-.08.993a1 1 0 01-1.35.936l-.925-.37a1 1 0 00-.75 0l-.925.37a1 1 0 01-1.35-.936l-.08-.993a1 1 0 00-.592-.823l-.897-.408a1 1 0 01-.455-1.372l.49-.865a1 1 0 000-.985l-.49-.865a1 1 0 01.455-1.372l.897-.408a1 1 0 00.592-.823l.08-.993z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 13.5A1.5 1.5 0 1012 10.5a1.5 1.5 0 000 3z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="Logout"
                    onClick={onLogout}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12H4m0 0l3.5-3.5M4 12l3.5 3.5M14 5h3a2 2 0 012 2v10a2 2 0 01-2 2h-3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {sampleChats.map((chat) => {
                const isActive = chat.id === selectedChatId;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => {
                      setSelectedChatId(chat.id);
                      setSidebarOpen(false);
                    }}
                    title={`${chat.name} • ${chat.status}`}
                    className={`w-full rounded-2xl border px-3 py-2 text-left transition-all ${
                      isActive
                        ? "border-lime-300/70 bg-lime-200/20"
                        : "border-white/15 bg-white/10"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-sm font-semibold text-white">
                        <span>{chat.avatar}</span>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-[#1a2f23] ${
                            chat.status === "Online"
                              ? "bg-lime-300"
                              : "bg-amber-300"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium text-white/95">
                          {chat.name}
                        </p>
                        {mobilePreferences.showMessagePreview && (
                          <p className="truncate text-xs text-white/65">
                            {chat.lastMessage}
                          </p>
                        )}
                      </div>
                      {mobilePreferences.showUnreadBadge && chat.unread > 0 && (
                        <span className="rounded-full bg-lime-300/85 px-2 py-0.5 text-[10px] font-semibold text-[#1d2a1d]">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature: mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {isMobileProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm md:hidden">
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-[#132219]/95 p-4 shadow-2xl">
              <h3 className="mb-3 text-base font-semibold text-white">
                Edit profile
              </h3>

              <div className="space-y-2">
                <div>
                  <p className="mb-1 text-left text-xs text-white/70">
                    Profile image
                  </p>
                  <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-black/20 px-3 py-2">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/25 text-xs font-semibold text-white">
                      {mobileDraftProfile.image ? (
                        <img
                          src={mobileDraftProfile.image}
                          alt="Mobile draft profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {mobileDraftProfile.name
                            ?.trim()
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <label className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/15">
                      Upload new image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMobileImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-left text-xs text-white/70">Name</p>
                  <input
                    type="text"
                    value={mobileDraftProfile.name}
                    onChange={(event) =>
                      setMobileDraftProfile((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none"
                  />
                </div>
                <div>
                  <p className="mb-1 text-left text-xs text-white/70">Email</p>
                  <input
                    type="email"
                    value={mobileDraftProfile.email}
                    onChange={(event) =>
                      setMobileDraftProfile((previous) => ({
                        ...previous,
                        email: event.target.value,
                      }))
                    }
                    placeholder="Your email"
                    className="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none"
                  />
                </div>
                <div>
                  <p className="mb-1 text-left text-xs text-white/70">Phone</p>
                  <input
                    type="text"
                    value={mobileDraftProfile.phone}
                    onChange={(event) =>
                      setMobileDraftProfile((previous) => ({
                        ...previous,
                        phone: event.target.value,
                      }))
                    }
                    placeholder="Phone number"
                    className="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/90 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveMobileProfile}
                  className="rounded-lg bg-[#5e8b5a]/85 px-3 py-2 text-xs font-medium text-white hover:bg-[#5e8b5a]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isMobileSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm md:hidden">
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-[#132219]/95 p-4 shadow-2xl">
              <h3 className="mb-1 text-base font-semibold text-white">
                Settings
              </h3>
              <p className="mb-4 text-xs text-white/65">
                Quick preferences for mobile chat list.
              </p>

              <div className="space-y-2.5">
                <p className="text-left text-xs font-semibold uppercase tracking-wide text-white/60">
                  Chat list
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setMobilePreferences((previous) => ({
                      ...previous,
                      showMessagePreview: !previous.showMessagePreview,
                    }))
                  }
                  className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-left"
                >
                  <span className="text-sm text-white/90">
                    Show last message preview
                  </span>
                  <span className="text-xs text-white/70">
                    {mobilePreferences.showMessagePreview ? "On" : "Off"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMobilePreferences((previous) => ({
                      ...previous,
                      showUnreadBadge: !previous.showUnreadBadge,
                    }))
                  }
                  className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-left"
                >
                  <span className="text-sm text-white/90">
                    Show unread badges
                  </span>
                  <span className="text-xs text-white/70">
                    {mobilePreferences.showUnreadBadge ? "On" : "Off"}
                  </span>
                </button>

                <p className="pt-1 text-left text-xs font-semibold uppercase tracking-wide text-white/60">
                  Notifications
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setMobilePreferences((previous) => ({
                      ...previous,
                      muteNotifications: !previous.muteNotifications,
                    }))
                  }
                  className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-left"
                >
                  <span className="text-sm text-white/90">
                    Mute notifications
                  </span>
                  <span className="text-xs text-white/70">
                    {mobilePreferences.muteNotifications ? "On" : "Off"}
                  </span>
                </button>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsMobileSettingsOpen(false)}
                  className="rounded-lg bg-[#5e8b5a]/85 px-3 py-2 text-xs font-medium text-white hover:bg-[#5e8b5a]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature: mobile chat detail panel */}
        <div className="min-h-0 flex-1">
          <Detail chat={selectedChat} />
        </div>
      </div>

      {/* Feature: desktop 3-panel layout */}
      <div className="hidden h-full w-full overflow-hidden rounded-3xl border border-white/25 bg-[#132219]/75 text-white shadow-2xl backdrop-blur-2xl md:grid md:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)]">
        <List
          chats={sampleChats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          currentUser={currentUser}
          onLogout={onLogout}
        />
        <Detail chat={selectedChat} />
      </div>
    </>
  );
}

export default Chat;
