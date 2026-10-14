import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Anchor, Utensils, Home, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { SIGNATURE_EXPERIENCES } from '../data/travelData.js';
export const ExperiencesSection = ({ onOpenBooking }) => {
    const [activeTab, setActiveTab] = useState(0);
    const getIcon = (id) => {
        switch (id) {
            case 'exp-private-charter':
                return _jsx(Anchor, { className: "w-4 h-4" });
            case 'exp-culinary-masters':
                return _jsx(Utensils, { className: "w-4 h-4" });
            case 'exp-wild-stays':
                return _jsx(Home, { className: "w-4 h-4" });
            default:
                return _jsx(Compass, { className: "w-4 h-4" });
        }
    };
    const currentExp = SIGNATURE_EXPERIENCES[activeTab];
    return (_jsxs("section", { id: "experiences", className: "py-20 bg-slate-900 text-white relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" }), _jsx("div", { className: "absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "max-w-2xl mb-12", children: [_jsx("div", { className: "text-xs font-semibold tracking-wider text-teal-400 uppercase mb-2", children: "The traavellio Difference" }), _jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white", children: "Signature Immersion Standards" }), _jsx("p", { className: "mt-3 text-sm sm:text-base text-slate-300", children: "We don\u2019t do cookie-cutter tour buses. Every itinerary is engineered around four core pillars of authentic exploration." })] }), _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar", role: "tablist", children: SIGNATURE_EXPERIENCES.map((exp, idx) => {
                            const isActive = idx === activeTab;
                            return (_jsxs("button", { onClick: () => setActiveTab(idx), role: "tab", "aria-selected": isActive, className: `flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 focus-visible:ring-2 focus-visible:ring-teal-400 ${isActive
                                    ? 'bg-teal-600 text-white shadow-md shadow-teal-900/50'
                                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50'}`, children: [getIcon(exp.id), _jsx("span", { children: exp.title })] }, exp.id));
                        }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800/60 rounded-2xl border border-slate-700/60 p-6 sm:p-10 backdrop-blur-xs", children: [_jsxs("div", { className: "lg:col-span-6 space-y-6", children: [_jsxs("div", { className: "inline-block px-2.5 py-1 text-xs font-medium text-teal-300 bg-teal-950/80 border border-teal-800/40 rounded-md", children: [currentExp.category, " Pillar"] }), _jsx("h3", { className: "text-2xl sm:text-3xl font-bold text-white tracking-tight", children: currentExp.subtitle }), _jsx("p", { className: "text-sm sm:text-base text-slate-300 leading-relaxed", children: currentExp.description }), _jsx("div", { className: "space-y-3 pt-2", children: currentExp.perks.map((perk) => (_jsxs("div", { className: "flex items-center gap-3 text-xs sm:text-sm text-slate-200", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-teal-400 shrink-0" }), _jsx("span", { children: perk })] }, perk))) }), _jsx("div", { className: "pt-4", children: _jsxs("button", { onClick: onOpenBooking, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm", children: [_jsx("span", { children: "Customize Your Experience" }), _jsx(ArrowRight, { className: "w-4 h-4" })] }) })] }), _jsxs("div", { className: "lg:col-span-6 relative aspect-16/10 rounded-xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl", children: [_jsx("img", { src: currentExp.imageUrl, alt: currentExp.title, loading: "lazy", referrerPolicy: "no-referrer", className: "w-full h-full object-cover transition-transform duration-700 hover:scale-105" }), _jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${currentExp.fallbackGradient} -z-10` }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" }), _jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200", children: [_jsx("span", { className: "bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-md font-mono", children: currentExp.title }), _jsx("span", { className: "text-teal-400 font-medium", children: "Bespoke Standard" })] })] })] })] })] }));
};
