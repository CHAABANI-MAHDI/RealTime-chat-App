import { useEffect, useMemo, useState } from "react";

function List({ chats, selectedChatId, onSelectChat, currentUser, onLogout }) {
  // Feature: search input state
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || "My Profile",
    email: currentUser?.email || "me@chatapp.dev",
    phone: currentUser?.phone || "+1 000 000 0000",
    image: "",
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const [preferences, setPreferences] = useState({
    showMessagePreview: true,
    showUnreadBadge: true,
    muteNotifications: false,
  });

  // Feature: filtered chat results
  const filteredChats = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return chats;
    }

    return chats.filter((chat) => {
      const name = chat.name?.toLowerCase() ?? "";
      const message = chat.lastMessage?.toLowerCase() ?? "";
      return name.includes(query) || message.includes(query);
    });
  }, [chats, searchTerm]);

  const profileInitial = profile.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const openProfileEditor = () => {
    setDraftProfile(profile);
    setIsProfileOpen(true);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setProfile((previous) => ({
      ...previous,
      name: currentUser.name || previous.name,
      email: currentUser.email || previous.email,
      phone: currentUser.phone || previous.phone,
    }));
  }, [currentUser]);

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setDraftProfile((previous) => ({
        ...previous,
        image: typeof fileReader.result === "string" ? fileReader.result : "",
      }));
    };
    fileReader.readAsDataURL(file);
  };

  const saveProfile = () => {
    setProfile(draftProfile);
    setIsProfileOpen(false);
  };

  return (
    <aside className="relative flex h-full w-full flex-col border-r border-white/15 bg-[#193027]/65 p-4 md:p-5">
      {/* Feature: list header */}
      <div className="mb-4">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/15 bg-black/20 p-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/25 text-sm font-semibold text-white">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{profileInitial}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white/95">
                {profile.name}
              </p>
              <p className="truncate text-xs text-white/65">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              title="Profile"
              onClick={openProfileEditor}
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
              onClick={() => setIsSettingsOpen(true)}
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

        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Messages
            </h2>
            <p className="text-xs text-white/70">Recent conversations</p>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/90">
            {filteredChats.length}
          </span>
        </div>

        {/* Feature: search and add user */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none transition-colors focus:border-lime-200/45"
          />
          <button
            type="button"
            title="Add new user"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg leading-none text-white/90 transition-colors hover:bg-white/15"
          >
            +
          </button>
        </div>
      </div>

      {/* Feature: chat items */}
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
        {filteredChats.length === 0 ? (
          // Feature: empty search state
          <div className="rounded-lg border border-white/15 bg-black/15 p-3 text-sm text-white/75">
            No users found.
          </div>
        ) : (
          filteredChats.map((chat) => {
            const isActive = chat.id === selectedChatId;

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => onSelectChat(chat.id)}
                className={`w-full rounded-2xl border p-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border-lime-200/45 bg-white/18 shadow-lg"
                    : "border-white/15 bg-black/15 hover:bg-white/12"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/30 font-semibold text-white">
                    <span>{chat.avatar}</span>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-[#2d4a2f] ${
                        chat.status === "Online"
                          ? "bg-lime-300"
                          : "bg-amber-300"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-white">
                        {chat.name}
                      </p>
                      <span className="text-[11px] text-white/65">
                        {chat.time}
                      </span>
                    </div>
                    {preferences.showMessagePreview && (
                      <p className="truncate text-sm text-white/80">
                        {chat.lastMessage}
                      </p>
                    )}
                  </div>
                  {preferences.showUnreadBadge && chat.unread > 0 && (
                    <span className="rounded-full bg-lime-300/85 px-2 py-0.5 text-xs font-semibold text-[#1d2a1d]">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {isProfileOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
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
                    {draftProfile.image ? (
                      <img
                        src={draftProfile.image}
                        alt="Draft profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {draftProfile.name?.trim()?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </span>
                    )}
                  </div>
                  <label className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/15">
                    Upload new image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-1 text-left text-xs text-white/70">Name</p>
                <input
                  type="text"
                  value={draftProfile.name}
                  onChange={(event) =>
                    setDraftProfile((previous) => ({
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
                  value={draftProfile.email}
                  onChange={(event) =>
                    setDraftProfile((previous) => ({
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
                  value={draftProfile.phone}
                  onChange={(event) =>
                    setDraftProfile((previous) => ({
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
                onClick={() => setIsProfileOpen(false)}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/90 hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProfile}
                className="rounded-lg bg-[#5e8b5a]/85 px-3 py-2 text-xs font-medium text-white hover:bg-[#5e8b5a]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-[#132219]/95 p-4 shadow-2xl">
            <h3 className="mb-1 text-base font-semibold text-white">
              Settings
            </h3>
            <p className="mb-4 text-xs text-white/65">
              Suggested quick preferences for cleaner chat experience.
            </p>

            <div className="space-y-2.5">
              <p className="text-left text-xs font-semibold uppercase tracking-wide text-white/60">
                Chat list
              </p>
              <button
                type="button"
                onClick={() =>
                  setPreferences((previous) => ({
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
                  {preferences.showMessagePreview ? "On" : "Off"}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setPreferences((previous) => ({
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
                  {preferences.showUnreadBadge ? "On" : "Off"}
                </span>
              </button>

              <p className="pt-1 text-left text-xs font-semibold uppercase tracking-wide text-white/60">
                Notifications
              </p>

              <button
                type="button"
                onClick={() =>
                  setPreferences((previous) => ({
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
                  {preferences.muteNotifications ? "On" : "Off"}
                </span>
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="rounded-lg bg-[#5e8b5a]/85 px-3 py-2 text-xs font-medium text-white hover:bg-[#5e8b5a]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default List;
