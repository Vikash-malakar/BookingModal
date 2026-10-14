import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Heart, Sparkles } from 'lucide-react';
export const Navbar = ({ onOpenBooking, wishlistCount, onOpenWishlist }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            }
            else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [
        { label: 'Destinations', href: '#destinations' },
        { label: 'Curated Trips', href: '#curated' },
        { label: 'Trip Explorer', href: '#explorer' },
        { label: 'Experiences', href: '#experiences' },
        { label: 'Traveler Stories', href: '#testimonials' },
    ];
    return (_jsxs("header", { className: `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-slate-200/80 text-slate-900'
            : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-5 text-white'}`, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between gap-8 h-10", children: [_jsxs("a", { href: "#", className: "flex items-center gap-2 group whitespace-nowrap shrink-0 transition-transform duration-200 active:scale-95", "aria-label": "traavellio home", children: [_jsx("div", { className: `p-1.5 rounded-lg transition-colors duration-200 ${isScrolled ? 'bg-teal-700 text-white shadow-xs' : 'bg-white/20 text-white backdrop-blur-xs'}`, children: _jsx(Compass, { className: "w-5 h-5 transition-transform duration-500 group-hover:rotate-45" }) }), _jsx("span", { className: `text-xl font-bold tracking-tight font-sans transition-colors duration-200 ${isScrolled ? 'text-slate-900' : 'text-white'}`, children: "traavellio" })] }), _jsx("nav", { className: "hidden lg:flex items-center gap-7 text-sm font-medium tracking-normal", "aria-label": "Main Navigation", children: navLinks.map((link) => (_jsx("a", { href: link.href, className: `whitespace-nowrap shrink-0 transition-all duration-200 relative py-1 hover:-translate-y-0.5 ${isScrolled
                                    ? 'text-slate-600 hover:text-teal-700'
                                    : 'text-white/85 hover:text-white'}`, children: link.label }, link.label))) }), _jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [_jsxs("button", { onClick: onOpenWishlist, className: `relative p-2 rounded-lg transition-all duration-200 active:scale-90 flex items-center justify-center ${isScrolled
                                        ? 'text-slate-600 hover:text-teal-700 hover:bg-slate-100'
                                        : 'text-white/85 hover:text-white hover:bg-white/10'}`, title: "Saved Expeditions", "aria-label": `Wishlist with ${wishlistCount} items`, children: [_jsx(Heart, { className: `w-5 h-5 transition-transform duration-200 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500 scale-105' : ''}` }), wishlistCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse", children: wishlistCount }))] }), _jsxs("button", { onClick: onOpenBooking, className: "hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-teal-700 rounded-lg shadow-xs transition-all duration-200 hover:bg-teal-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2", children: [_jsx(Sparkles, { className: "w-4 h-4" }), _jsx("span", { children: "Book Expedition" })] }), _jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: `lg:hidden p-2 rounded-lg transition-all duration-200 active:scale-90 focus-visible:ring-2 focus-visible:ring-teal-500 ${isScrolled
                                        ? 'text-slate-700 hover:bg-slate-100'
                                        : 'text-white hover:bg-white/10'}`, "aria-expanded": mobileMenuOpen, "aria-label": "Toggle navigation menu", children: mobileMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] })] }) }), _jsx("div", { className: `lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 border-b border-slate-200/80 bg-white shadow-lg text-slate-800' : 'max-h-0 opacity-0 pointer-events-none'}`, children: _jsxs("div", { className: "px-5 pt-3 pb-6 space-y-3", children: [navLinks.map((link) => (_jsx("a", { href: link.href, onClick: () => setMobileMenuOpen(false), className: "block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-teal-700 transition-colors", children: link.label }, link.label))), _jsx("div", { className: "pt-2 border-t border-slate-100", children: _jsxs("button", { onClick: () => {
                                    setMobileMenuOpen(false);
                                    onOpenBooking();
                                }, className: "w-full py-3 px-4 rounded-lg bg-teal-700 text-white font-semibold text-center hover:bg-teal-800 transition-all duration-200 active:scale-95 shadow-sm flex items-center justify-center gap-2", children: [_jsx(Sparkles, { className: "w-4 h-4" }), _jsx("span", { children: "Plan Custom Expedition" })] }) })] }) })] }));
};
