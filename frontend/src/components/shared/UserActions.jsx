function UserActions({
  onProfile,
  onSettings,
  onLogout,
  sizeClass = "h-9 w-9",
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        title="Profile"
        onClick={onProfile}
        className={`flex ${sizeClass} items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15`}
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
        onClick={onSettings}
        className={`flex ${sizeClass} items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15`}
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
        className={`flex ${sizeClass} items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15`}
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
  );
}

export default UserActions;
