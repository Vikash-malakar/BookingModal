import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
export const Toast = ({ toasts, onDismiss }) => {
    if (toasts.length === 0)
        return null;
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0", children: toasts.map((toast) => (_jsxs("div", { className: "pointer-events-auto bg-slate-900 text-white rounded-xl shadow-xl p-3.5 border border-slate-700/80 flex items-start gap-3 transform transition-all duration-300 animate-slide-up", children: [toast.type === 'info' ? (_jsx(Info, { className: "w-5 h-5 text-teal-400 shrink-0 mt-0.5" })) : (_jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h5", { className: "text-xs font-bold text-white tracking-tight", children: toast.title }), _jsx("p", { className: "text-xs text-slate-300 mt-0.5 leading-snug", children: toast.message })] }), _jsx("button", { onClick: () => onDismiss(toast.id), className: "text-slate-400 hover:text-white p-1 rounded-md transition-colors", "aria-label": "Dismiss notification", children: _jsx(X, { className: "w-3.5 h-3.5" }) })] }, toast.id))) }));
};
