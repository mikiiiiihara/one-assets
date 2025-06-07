import React, { useEffect } from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

const Component: React.FC<ModalProps> = ({ 
  children, 
  onClose,
  size = "md" 
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full ${sizes[size]} transform transition-all animate-slide-up`}>
          <div className="glass bg-dark-900/95 rounded-2xl shadow-dark border border-white/10 p-6 md:p-8">
            {/* Close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Component.displayName = "Modal";
export const Modal = React.memo(Component);
