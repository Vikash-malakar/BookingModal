import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MapPin, Star, ArrowRight, Compass } from 'lucide-react';
export const HeroSlider = ({ slides, onSelectSlide, onSearch }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [searchDestination, setSearchDestination] = useState('');
    const [searchSeason, setSearchSeason] = useState('any');
    const [searchStyle, setSearchStyle] = useState('all');
    const autoPlayInterval = 6500;
    const timerRef = useRef(null);
    const isInteractingRef = useRef(false);
    const totalSlides = slides.length;
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);
    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    // Autoplay management
    useEffect(() => {
        if (!isPlaying) {
            if (timerRef.current)
                clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(() => {
            if (!isInteractingRef.current) {
                nextSlide();
            }
        }, autoPlayInterval);
        return () => {
            if (timerRef.current)
                clearInterval(timerRef.current);
        };
    }, [isPlaying, nextSlide]);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight')
                nextSlide();
            if (e.key === 'ArrowLeft')
                prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);
    // Touch swipe handling
    const minSwipeDistance = 45;
    const handleTouchStart = (e) => {
        isInteractingRef.current = true;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        isInteractingRef.current = false;
        if (!touchStart || !touchEnd)
            return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            nextSlide();
        }
        else if (isRightSwipe) {
            prevSlide();
        }
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch({
            destination: searchDestination,
            season: searchSeason,
            style: searchStyle,
        });
        // Smooth scroll to curated section
        const elem = document.getElementById('curated');
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const activeSlide = slides[currentIndex];
    return (_jsxs("section", { className: "relative w-full h-[620px] sm:h-[680px] lg:h-[760px] overflow-hidden bg-slate-950 select-none", onMouseEnter: () => { isInteractingRef.current = true; }, onMouseLeave: () => { isInteractingRef.current = false; }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, "aria-label": "Featured Destinations Hero Slider", "aria-roledescription": "carousel", children: [slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (_jsxs("div", { className: `absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`, "aria-hidden": !isActive, children: [_jsx("div", { className: `w-full h-full transform transition-transform duration-7000 ease-out bg-cover bg-center ${isActive ? 'scale-105' : 'scale-100'}`, style: { backgroundImage: `url(${slide.imageUrl})` }, children: _jsx("div", { className: `w-full h-full bg-gradient-to-br ${slide.fallbackGradient} opacity-60 mix-blend-multiply` }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/30" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" })] }, slide.id));
            }), _jsx("div", { className: "relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-28 sm:pb-32 lg:pb-36", children: _jsxs("div", { className: "max-w-3xl space-y-4", children: [_jsxs("div", { className: "flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-teal-300", children: [_jsxs("span", { className: "flex items-center gap-1.5 bg-teal-950/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-teal-500/30", children: [_jsx(MapPin, { className: "w-3.5 h-3.5" }), activeSlide.location, ", ", activeSlide.country] }), _jsx("span", { className: "text-white/60", "aria-hidden": "true", children: "\u00B7" }), _jsx("span", { className: "text-white/90", children: activeSlide.duration }), _jsx("span", { className: "text-white/60", "aria-hidden": "true", children: "\u00B7" }), _jsx("span", { className: "text-white/90", children: activeSlide.groupType }), _jsx("span", { className: "text-white/60", "aria-hidden": "true", children: "\u00B7" }), _jsxs("span", { className: "flex items-center gap-1 text-amber-300", children: [_jsx(Star, { className: "w-3.5 h-3.5 fill-amber-300" }), activeSlide.rating, " (", activeSlide.reviewsCount, ")"] })] }), _jsx("h1", { className: "text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight", style: { textWrap: 'balance' }, children: activeSlide.title }), _jsx("p", { className: "text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none", children: activeSlide.subtitle }), _jsxs("div", { className: "flex items-center flex-wrap gap-2 pt-1 text-xs text-white/80", children: [_jsx("span", { className: "font-semibold text-white", children: "Highlights:" }), activeSlide.highlights.map((h, i) => (_jsxs("span", { className: "inline-flex items-center", children: [i > 0 && _jsx("span", { className: "mx-1.5 text-white/40", children: "/" }), h] }, h)))] }), _jsxs("div", { className: "flex items-center flex-wrap gap-4 pt-3", children: [_jsxs("button", { onClick: () => onSelectSlide(activeSlide), className: "px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-teal-950/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-95 flex items-center gap-2 group whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white", children: [_jsx("span", { children: "Explore Itinerary" }), _jsx(ArrowRight, { className: "w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" })] }), _jsxs("div", { className: "flex items-center gap-2 text-white/90 text-sm pl-1", children: [_jsx("span", { className: "text-white/60", children: "From" }), _jsxs("span", { className: "text-2xl font-bold text-white tabular-nums", children: ["$", activeSlide.price.toLocaleString()] }), _jsx("span", { className: "text-xs text-white/60", children: "/ guest" })] })] })] }) }), _jsxs("div", { className: "absolute z-30 bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setIsPlaying(!isPlaying), className: "p-2 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white/80 hover:text-white border border-white/10 transition-all duration-200 active:scale-90", title: isPlaying ? 'Pause slideshow' : 'Play slideshow', "aria-label": isPlaying ? 'Pause slideshow' : 'Play slideshow', children: isPlaying ? _jsx(Pause, { className: "w-3.5 h-3.5" }) : _jsx(Play, { className: "w-3.5 h-3.5" }) }), _jsx("div", { className: "flex items-center gap-1.5", role: "tablist", "aria-label": "Slide Selection", children: slides.map((slide, idx) => {
                                    const isActive = idx === currentIndex;
                                    return (_jsx("button", { onClick: () => goToSlide(idx), className: `h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white ${isActive ? 'w-8 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'}`, "aria-label": `Go to slide ${idx + 1}: ${slide.location}`, "aria-selected": isActive, role: "tab" }, slide.id));
                                }) }), _jsxs("span", { className: "text-xs font-mono text-white/60 ml-1 tabular-nums", children: ["0", currentIndex + 1, " / 0", totalSlides] })] }), _jsx("div", { className: "hidden md:flex items-center gap-2", children: slides.map((slide, idx) => (_jsxs("button", { onClick: () => goToSlide(idx), className: `text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${idx === currentIndex
                                ? 'bg-white/20 text-white backdrop-blur-xs border border-white/30'
                                : 'text-white/60 hover:text-white hover:bg-white/10'}`, children: [_jsx("div", { className: "font-semibold truncate max-w-[100px]", children: slide.location }), _jsxs("div", { className: "text-[10px] text-teal-300", children: ["$", slide.price] })] }, slide.id))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: prevSlide, className: "p-3 rounded-full bg-slate-900/80 hover:bg-teal-700 text-white border border-white/15 shadow-md transition-all duration-200 hover:-translate-x-0.5 active:scale-90 focus-visible:ring-2 focus-visible:ring-white", "aria-label": "Previous slide", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }), _jsx("button", { onClick: nextSlide, className: "p-3 rounded-full bg-slate-900/80 hover:bg-teal-700 text-white border border-white/15 shadow-md transition-all duration-200 hover:translate-x-0.5 active:scale-90 focus-visible:ring-2 focus-visible:ring-white", "aria-label": "Next slide", children: _jsx(ChevronRight, { className: "w-5 h-5" }) })] })] }), _jsx("div", { className: "hidden lg:block absolute z-30 bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 pointer-events-auto", children: _jsxs("form", { onSubmit: handleSearchSubmit, className: "bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-2xl border border-slate-200/80 grid grid-cols-4 gap-3 items-center", children: [_jsxs("div", { className: "px-3 border-r border-slate-200", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 uppercase tracking-wider", children: "Destination" }), _jsx("input", { type: "text", placeholder: "e.g. Italy, Alps, Japan", value: searchDestination, onChange: (e) => setSearchDestination(e.target.value), className: "w-full text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden py-1" })] }), _jsxs("div", { className: "px-3 border-r border-slate-200", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 uppercase tracking-wider", children: "Season" }), _jsxs("select", { value: searchSeason, onChange: (e) => setSearchSeason(e.target.value), className: "w-full text-sm font-medium text-slate-800 bg-transparent focus:outline-hidden py-1 cursor-pointer", children: [_jsx("option", { value: "any", children: "Any Season" }), _jsx("option", { value: "spring", children: "Spring (Apr - May)" }), _jsx("option", { value: "summer", children: "Summer (Jun - Aug)" }), _jsx("option", { value: "autumn", children: "Autumn (Sep - Nov)" }), _jsx("option", { value: "winter", children: "Winter (Dec - Mar)" })] })] }), _jsxs("div", { className: "px-3", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-500 uppercase tracking-wider", children: "Travel Style" }), _jsxs("select", { value: searchStyle, onChange: (e) => setSearchStyle(e.target.value), className: "w-full text-sm font-medium text-slate-800 bg-transparent focus:outline-hidden py-1 cursor-pointer", children: [_jsx("option", { value: "all", children: "All Styles" }), _jsx("option", { value: "couples", children: "Couples Romantic" }), _jsx("option", { value: "solo", children: "Solo Explorations" }), _jsx("option", { value: "adventure", children: "Alpine & Wilderness" }), _jsx("option", { value: "family", children: "Small Family" })] })] }), _jsxs("button", { type: "submit", className: "w-full h-full py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-all duration-200 hover:shadow-md active:scale-95 flex items-center justify-center gap-2", children: [_jsx(Compass, { className: "w-4 h-4" }), _jsx("span", { children: "Search Trips" })] })] }) })] }));
};
