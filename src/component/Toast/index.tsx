interface ToastProps {
  readonly visible: boolean;
  readonly message: string;
}

export default function index({ visible, message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none
        bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl
        flex items-center gap-space-sm
        ${visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}
    >
      <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
      <span className="font-body-md text-body-md font-medium">{message}</span>
    </div>
  );
}