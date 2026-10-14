import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Pause, Play } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData.js';
export const TestimonialsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const total = TESTIMONIALS.length;
    const isHoveredRef = useRef(false);
    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
    }, [total]);
    const prevTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    }, [total]);
    useEffect(() => {
        if (!isPlaying)
            return;
        const interval = setInterval(() => {
            if (!isHoveredRef.current) {
                nextTestimonial();
            }
        }, 6000);
        return () => clearInterval(interval);
    }, [isPlaying, nextTestimonial]);
    // Touch handlers
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd)
            return;
        const distance = touchStart - touchEnd;
        if (distance > 40) {
            nextTestimonial();
        }
        else if (distance < -40) {
            prevTestimonial();
        }
    };
    const active = TESTIMONIALS[currentIndex];
    return (_jsx("section", { id: "testimonials", className: "py-20 bg-slate-50 relative overflow-hidden", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [_jsx("div", { className: "text-xs font-semibold tracking-wider text-teal-700 uppercase mb-1", children: "Traveler Dispatches" }), _jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900", children: "Unfiltered Stories from the Trail" })] }), _jsxs("div", { className: "max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 relative", onMouseEnter: () => { isHoveredRef.current = true; }, onMouseLeave: () => { isHoveredRef.current = false; }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, "aria-roledescription": "carousel", "aria-label": "Traveler reviews slider", children: [_jsx("div", { className: "absolute top-6 right-6 text-teal-100 -z-0 pointer-events-none", children: _jsx(Quote, { className: "w-20 h-20 sm:w-28 sm:h-28 rotate-180" }) }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-2", children: [_jsxs("div", { className: "flex items-center gap-1 text-amber-400", children: [Array.from({ length: active.rating }).map((_, i) => (_jsx(Star, { className: "w-4 h-4 fill-amber-400 text-amber-400" }, i))), _jsx("span", { className: "ml-2 text-xs font-bold text-slate-700", children: "5.0 Verified Review" })] }), _jsxs("div", { className: "inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80", children: [_jsx(CheckCircle2, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Verified Expedition Alum" })] })] }), _jsxs("blockquote", { className: "text-base sm:text-xl lg:text-2xl text-slate-800 font-medium leading-relaxed italic mb-8", children: ["\"", active.quote, "\""] }), _jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-100", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: active.avatar, alt: active.name, className: "w-12 h-12 rounded-full object-cover border-2 border-teal-600/30 shadow-xs" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm sm:text-base font-bold text-slate-900", children: active.name }), _jsxs("div", { className: "text-xs text-slate-500", children: [active.role, " \u00B7 ", active.location] })] })] }), _jsxs("div", { className: "text-right text-xs", children: [_jsx("div", { className: "font-semibold text-teal-800", children: active.trip }), _jsx("div", { className: "text-slate-400", children: active.date })] })] })] }), _jsxs("div", { className: "mt-8 pt-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setIsPlaying(!isPlaying), className: "p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors", title: isPlaying ? 'Pause slider' : 'Resume slider', children: isPlaying ? _jsx(Pause, { className: "w-3.5 h-3.5" }) : _jsx(Play, { className: "w-3.5 h-3.5" }) }), _jsx("div", { className: "flex items-center gap-1.5 ml-2", children: TESTIMONIALS.map((t, idx) => (_jsx("button", { onClick: () => setCurrentIndex(idx), className: `h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-teal-700' : 'w-2 bg-slate-200 hover:bg-slate-300'}`, "aria-label": `Go to review from ${t.name}` }, t.id))) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: prevTestimonial, className: "p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all duration-200 active:scale-90", "aria-label": "Previous review", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), _jsx("button", { onClick: nextTestimonial, className: "p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all duration-200 active:scale-90", "aria-label": "Next review", children: _jsx(ChevronRight, { className: "w-4 h-4" }) })] })] })] })] }) }));
};
