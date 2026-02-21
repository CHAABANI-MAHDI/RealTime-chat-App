function OverlayModal({ isOpen, onClose, containerClassName, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={containerClassName} onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-2xl border border-white/20 bg-[#132219]/95 p-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default OverlayModal;
