import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Sparkles, Minus, Plus } from 'lucide-react';
export const BookingModal = ({ isOpen, onClose, selectedDestination, destinations, onBookingSuccess, }) => {
    const [destinationId, setDestinationId] = useState('');
    const [guests, setGuests] = useState(2);
    const [selectedDate, setSelectedDate] = useState('2026-06-15');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (selectedDestination) {
            setDestinationId(selectedDestination.id);
        }
        else if (destinations.length > 0 && !destinationId) {
            setDestinationId(destinations[0].id);
        }
    }, [selectedDestination, destinations]);
    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setErrors({});
        }
    }, [isOpen]);
    if (!isOpen)
        return null;
    const currentTrip = destinations.find((d) => d.id === destinationId) || destinations[0];
    const totalCost = (currentTrip?.price || 0) * guests;
    const handleIncrementGuests = () => {
        if (guests < 8)
            setGuests(guests + 1);
    };
    const handleDecrementGuests = () => {
        if (guests > 1)
            setGuests(guests - 1);
    };
    const validate = () => {
        const errs = {};
        if (!fullName.trim())
            errs.fullName = 'Please enter your full name';
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
            errs.email = 'Please provide a valid email address';
        if (!phone.trim())
            errs.phone = 'Please provide a contact phone number';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate())
            return;
        setIsSubmitted(true);
        onBookingSuccess({
            tripName: currentTrip.title,
            guests,
            total: totalCost,
        });
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm", onClick: onClose, role: "dialog", "aria-modal": "true", children: _jsxs("div", { className: "relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs font-semibold text-teal-400 uppercase tracking-wider", children: "Reserve Your Journey" }), _jsx("h3", { className: "text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5", children: "Expedition Reservation" })] }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors", "aria-label": "Close booking modal", children: _jsx(X, { className: "w-5 h-5" }) })] }), isSubmitted ? (_jsxs("div", { className: "p-8 text-center space-y-5", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce", children: _jsx(CheckCircle, { className: "w-8 h-8" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "text-2xl font-bold text-slate-900", children: "Expedition Reserved!" }), _jsxs("p", { className: "text-sm text-slate-600 max-w-md mx-auto", children: ["Thank you, ", _jsx("strong", { children: fullName }), ". A dedicated trip curator has reserved your spots for ", _jsx("strong", { children: currentTrip.title }), " and dispatched your itinerary package to ", _jsx("strong", { children: email }), "."] })] }), _jsxs("div", { className: "bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-sm mx-auto", children: [_jsxs("div", { className: "flex justify-between text-slate-600", children: [_jsx("span", { children: "Confirmation ID:" }), _jsxs("span", { className: "font-mono font-bold text-slate-900", children: ["TRV-", Math.floor(100000 + Math.random() * 900000)] })] }), _jsxs("div", { className: "flex justify-between text-slate-600", children: [_jsx("span", { children: "Departure Date:" }), _jsx("span", { className: "font-medium text-slate-900", children: selectedDate })] }), _jsxs("div", { className: "flex justify-between text-slate-600", children: [_jsx("span", { children: "Party Size:" }), _jsxs("span", { className: "font-medium text-slate-900", children: [guests, " Guests"] })] }), _jsxs("div", { className: "flex justify-between text-slate-600 pt-2 border-t border-slate-200 font-bold", children: [_jsx("span", { className: "text-slate-900", children: "Total Investment:" }), _jsxs("span", { className: "text-teal-800 font-mono text-sm", children: ["$", totalCost.toLocaleString()] })] })] }), _jsx("div", { className: "pt-2", children: _jsx("button", { onClick: onClose, className: "px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-all duration-200 active:scale-95", children: "Return to Site" }) })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "p-6 sm:p-8 space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5", children: "Select Expedition" }), _jsx("select", { value: destinationId, onChange: (e) => setDestinationId(e.target.value), className: "w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 cursor-pointer", children: destinations.map((d) => (_jsxs("option", { value: d.id, children: [d.title, " (", d.country, ") \u2014 $", d.price.toLocaleString()] }, d.id))) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5", children: "Departure Window" }), _jsx("div", { className: "relative", children: _jsx("input", { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), min: "2026-05-01", className: "w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600" }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5", children: "Number of Guests" }), _jsxs("div", { className: "flex items-center justify-between border border-slate-300 rounded-lg p-1 bg-slate-50", children: [_jsx("button", { type: "button", onClick: handleDecrementGuests, disabled: guests <= 1, className: "p-1.5 rounded-md hover:bg-white text-slate-600 disabled:opacity-40 transition-all duration-150 active:scale-90", "aria-label": "Decrease guest count", children: _jsx(Minus, { className: "w-4 h-4" }) }), _jsxs("span", { className: "font-bold text-slate-900 text-sm font-mono tabular-nums", children: [guests, " ", guests === 1 ? 'Guest' : 'Guests'] }), _jsx("button", { type: "button", onClick: handleIncrementGuests, disabled: guests >= 8, className: "p-1.5 rounded-md hover:bg-white text-slate-600 disabled:opacity-40 transition-all duration-150 active:scale-90", "aria-label": "Increase guest count", children: _jsx(Plus, { className: "w-4 h-4" }) })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1", children: "Full Name" }), _jsx("input", { type: "text", placeholder: "e.g. Eleanor Vance", value: fullName, onChange: (e) => setFullName(e.target.value), className: `w-full px-3.5 py-2 rounded-lg border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 ${errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'}` }), errors.fullName && _jsx("p", { className: "text-xs text-rose-600 mt-1", children: errors.fullName })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1", children: "Email Address" }), _jsx("input", { type: "email", placeholder: "you@domain.com", value: email, onChange: (e) => setEmail(e.target.value), className: `w-full px-3.5 py-2 rounded-lg border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 ${errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'}` }), errors.email && _jsx("p", { className: "text-xs text-rose-600 mt-1", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1", children: "Phone Number" }), _jsx("input", { type: "tel", placeholder: "+1 (555) 000-0000", value: phone, onChange: (e) => setPhone(e.target.value), className: `w-full px-3.5 py-2 rounded-lg border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 ${errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'}` }), errors.phone && _jsx("p", { className: "text-xs text-rose-600 mt-1", children: errors.phone })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1", children: "Special Notes or Dietary Requirements (Optional)" }), _jsx("textarea", { rows: 2, placeholder: "e.g. Vegetarian, celebrating anniversary, airport assistance...", value: notes, onChange: (e) => setNotes(e.target.value), className: "w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 resize-none" })] })] }), _jsxs("div", { className: "p-4 bg-slate-50 rounded-xl border border-slate-200/90 flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("span", { className: "text-xs text-slate-500 block", children: ["Total Investment (", guests, " Guests)"] }), _jsxs("span", { className: "text-xl font-bold text-slate-900 tabular-nums", children: ["$", totalCost.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-xs text-emerald-700", children: [_jsx(ShieldCheck, { className: "w-4 h-4" }), _jsx("span", { children: "100% Secure & Flexible Deposit" })] })] }), _jsxs("button", { type: "submit", className: "w-full py-3 px-5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 flex items-center justify-center gap-2", children: [_jsx(Sparkles, { className: "w-4 h-4" }), _jsx("span", { children: "Confirm & Secure Reservation" })] })] }))] }) }));
};
