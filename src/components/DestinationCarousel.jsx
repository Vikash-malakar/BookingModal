import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star, Clock, Users, ArrowUpRight } from 'lucide-react';
export const DestinationCarousel = ({ destinations, onSelectDestination, onBookDestination, wishlist, onToggleWishlist, filterCategory, onCategoryChange, }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    // Filter destinations based on selected category
    const filtered = destinations.filter((d) => {
        if (filterCategory === 'all')
            return true;
        return d.category === filterCategory;
    });
    // Responsive cards per view
    useEffect(() => {
        const updateCardsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCardsPerView(1);
            }
            else if (width < 1024) {
                setCardsPerView(2);
            }
            else if (width < 1280) {
                setCardsPerView(3);
            }
            else {
                setCardsPerView(4);
            }
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);
    // Reset index when filter changes or items change
    useEffect(() => {
        setCurrentIndex(0);
    }, [filterCategory]);
    const maxIndex = Math.max(0, filtered.length - cardsPerView);
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, [maxIndex]);
    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    }, [maxIndex]);
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
            nextSlide();
        }
        else if (distance < -40) {
            prevSlide();
        }
    };
    const categories = [
        { label: 'All Expeditions', value: 'all' },
        { label: 'Mediterranean & Coastal', value: 'coastal' },
        { label: 'Alpine & Glacial', value: 'alpine' },
        { label: 'Cultural & Heritage', value: 'cultural' },
        { label: 'Wilderness & Fjords', value: 'wilderness' },
        { label: 'Tropical & Rainforest', value: 'tropical' },
    ];
    return (_jsx("section", { id: "curated", className: "py-20 bg-slate-50 relative overflow-hidden", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs font-semibold tracking-wider text-teal-700 uppercase mb-1", children: "Curated Expeditions" }), _jsx("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900", children: "Journeys Crafted for the Curious" })] }), _jsxs("div", { className: "flex items-center gap-2 self-end md:self-auto", children: [_jsxs("span", { className: "text-xs text-slate-500 font-mono mr-2 tabular-nums", children: ["Showing ", Math.min(currentIndex + 1, filtered.length), "-", Math.min(currentIndex + cardsPerView, filtered.length), " of ", filtered.length] }), _jsx("button", { onClick: prevSlide, className: "p-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-all duration-200 active:scale-95 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed", "aria-label": "Previous expeditions slide", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }), _jsx("button", { onClick: nextSlide, className: "p-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-all duration-200 active:scale-95 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed", "aria-label": "Next expeditions slide", children: _jsx(ChevronRight, { className: "w-5 h-5" }) })] })] }), _jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar", role: "tablist", children: categories.map((cat) => {
                        const isSelected = filterCategory === cat.value;
                        return (_jsx("button", { onClick: () => onCategoryChange(cat.value), role: "tab", "aria-selected": isSelected, className: `px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-teal-600 ${isSelected
                                ? 'bg-teal-700 text-white shadow-xs'
                                : 'bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}`, children: cat.label }, cat.value));
                    }) }), _jsx("div", { className: "relative overflow-hidden", ref: containerRef, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: filtered.length === 0 ? (_jsxs("div", { className: "py-16 text-center bg-white rounded-xl border border-slate-200", children: [_jsx("p", { className: "text-slate-600 font-medium", children: "No expeditions found in this category." }), _jsx("button", { onClick: () => onCategoryChange('all'), className: "mt-3 text-sm text-teal-700 font-semibold hover:underline", children: "View all expeditions" })] })) : (_jsx("div", { className: "flex transition-transform duration-500 ease-out will-change-transform", style: {
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                        }, children: filtered.map((dest) => {
                            const isSaved = wishlist.includes(dest.id);
                            return (_jsx("div", { className: "shrink-0 px-2 sm:px-3", style: { width: `${100 / cardsPerView}%` }, children: _jsxs("article", { className: "group h-full flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1", children: [_jsxs("div", { className: "relative aspect-4/3 overflow-hidden bg-slate-900", children: [_jsx("img", { src: dest.imageUrl, alt: dest.title, loading: "lazy", referrerPolicy: "no-referrer", className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105", onError: (e) => {
                                                        // Fallback container if remote fails
                                                        e.currentTarget.style.display = 'none';
                                                    } }), _jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${dest.fallbackGradient} -z-10` }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" }), _jsxs("div", { className: "absolute top-3 left-3 right-3 flex items-center justify-between", children: [_jsx("span", { className: "px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900/70 backdrop-blur-xs rounded-md", children: dest.country }), _jsx("button", { onClick: (e) => {
                                                                e.stopPropagation();
                                                                onToggleWishlist(dest.id);
                                                            }, className: `p-2 rounded-full backdrop-blur-xs transition-all duration-200 active:scale-80 ${isSaved
                                                                ? 'bg-rose-500 text-white shadow-sm'
                                                                : 'bg-slate-900/50 text-white/90 hover:bg-slate-900/80 hover:text-white'}`, "aria-label": isSaved ? 'Remove from wishlist' : 'Save to wishlist', children: _jsx(Heart, { className: `w-4 h-4 transition-transform duration-200 ${isSaved ? 'fill-white scale-110' : ''}` }) })] }), _jsxs("div", { className: "absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs", children: [_jsxs("div", { className: "flex items-center gap-1 font-semibold", children: [_jsx(Star, { className: "w-3.5 h-3.5 fill-amber-400 text-amber-400" }), _jsx("span", { children: dest.rating }), _jsxs("span", { className: "text-white/70 font-normal", children: ["(", dest.reviewsCount, ")"] })] }), _jsx("span", { className: "text-white/90 font-medium", children: dest.difficulty })] })] }), _jsxs("div", { className: "p-5 flex-1 flex flex-col justify-between space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3.5 h-3.5" }), dest.durationDays, " Days"] }), _jsx("span", { "aria-hidden": "true", children: "\u00B7" }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3.5 h-3.5" }), dest.groupSize] })] }), _jsx("h3", { className: "text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-teal-700 transition-colors", children: dest.title }), _jsx("p", { className: "mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed", children: dest.tagline })] }), _jsxs("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between gap-2", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[11px] text-slate-500 block", children: "From" }), _jsxs("span", { className: "text-lg font-bold text-slate-900 tabular-nums", children: ["$", dest.price.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => onSelectDestination(dest), className: "px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-all duration-200 active:scale-95", children: "Itinerary" }), _jsxs("button", { onClick: () => onBookDestination(dest), className: "px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-all duration-200 active:scale-95 shadow-xs flex items-center gap-1", children: [_jsx("span", { children: "Book" }), _jsx(ArrowUpRight, { className: "w-3.5 h-3.5" })] })] })] })] })] }) }, dest.id));
                        }) })) }), maxIndex > 0 && (_jsx("div", { className: "flex items-center justify-center gap-1.5 mt-6 sm:mt-8", children: Array.from({ length: maxIndex + 1 }).map((_, idx) => (_jsx("button", { onClick: () => setCurrentIndex(idx), className: `h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 bg-teal-700' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`, "aria-label": `Go to carousel page ${idx + 1}` }, idx))) }))] }) }));
};
