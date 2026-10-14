import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { X, Heart, Trash2, ArrowRight, Compass } from 'lucide-react';
export const WishlistDrawer = ({ isOpen, onClose, savedDestinations, onRemove, onBook, onViewDetails, }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300", onClick: onClose, role: "dialog", "aria-modal": "true", children: _jsx("div", { className: "absolute inset-y-0 right-0 max-w-full flex pl-10", children: _jsxs("div", { className: "w-screen max-w-md bg-white shadow-2xl flex flex-col", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 rounded-md bg-rose-100 text-rose-600", children: _jsx(Heart, { className: "w-4 h-4 fill-rose-600" }) }), _jsxs("h3", { className: "text-lg font-bold text-slate-900", children: ["Saved Expeditions (", savedDestinations.length, ")"] })] }), _jsx("button", { onClick: onClose, className: "p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors", "aria-label": "Close wishlist", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: savedDestinations.length === 0 ? (_jsxs("div", { className: "py-20 text-center space-y-3", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto", children: _jsx(Compass, { className: "w-6 h-6" }) }), _jsx("p", { className: "text-sm font-semibold text-slate-700", children: "No saved journeys yet" }), _jsx("p", { className: "text-xs text-slate-500 max-w-xs mx-auto", children: "Click the heart icon on any expedition card to save it for quick comparison." })] })) : (savedDestinations.map((dest) => (_jsxs("div", { className: "flex gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-teal-500/50 transition-colors", children: [_jsx("img", { src: dest.imageUrl, alt: dest.title, className: "w-20 h-20 rounded-lg object-cover shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[11px] font-semibold text-teal-700", children: dest.country }), _jsx("h4", { className: "text-sm font-bold text-slate-900 truncate", children: dest.title }), _jsxs("div", { className: "text-xs text-slate-500 mt-0.5", children: ["$", dest.price.toLocaleString(), " / guest"] })] }), _jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsx("button", { onClick: () => {
                                                        onClose();
                                                        onViewDetails(dest);
                                                    }, className: "text-xs font-semibold text-slate-700 hover:text-teal-700", children: "Details" }), _jsx("button", { onClick: () => {
                                                        onClose();
                                                        onBook(dest);
                                                    }, className: "text-xs font-semibold text-teal-700 hover:text-teal-800", children: "Book Now" }), _jsx("button", { onClick: () => onRemove(dest.id), className: "ml-auto text-slate-400 hover:text-rose-600 p-1", title: "Remove from wishlist", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] })] })] }, dest.id)))) }), savedDestinations.length > 0 && (_jsxs("div", { className: "p-5 border-t border-slate-200 bg-slate-50 space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-slate-600", children: "Total Estimated:" }), _jsxs("span", { className: "font-bold text-slate-900 font-mono", children: ["$", savedDestinations.reduce((acc, d) => acc + d.price, 0).toLocaleString()] })] }), _jsxs("button", { onClick: () => {
                                    onClose();
                                    onBook(savedDestinations[0]);
                                }, className: "w-full py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2", children: [_jsx("span", { children: "Reserve First Saved Journey" }), _jsx(ArrowRight, { className: "w-4 h-4" })] })] }))] }) }) }));
};
