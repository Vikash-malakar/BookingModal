import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HeroSlider } from './components/HeroSlider.jsx';
import { DestinationCarousel } from './components/DestinationCarousel.jsx';
import { InteractiveExplorer } from './components/InteractiveExplorer.jsx';
import { ExperiencesSection } from './components/ExperiencesSection.jsx';
import { TestimonialsSlider } from './components/TestimonialsSlider.jsx';
import { TripDetailModal } from './components/TripDetailModal.jsx';
import { BookingModal } from './components/BookingModal.jsx';
import { WishlistDrawer } from './components/WishlistDrawer.jsx';
import { Toast } from './components/Toast.jsx';
import { Footer } from './components/Footer.jsx';
import { HERO_SLIDES, DESTINATIONS } from './data/travelData.js';
export default function App() {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [bookingDestination, setBookingDestination] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [wishlist, setWishlist] = useState(['dest-amalfi', 'dest-kyoto']);
    const [toasts, setToasts] = useState([]);
    // Toast notification dispatcher
    const showToast = useCallback((title, message, type = 'info') => {
        const id = Date.now().toString() + Math.random().toString();
        setToasts((prev) => [...prev, { id, title, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4500);
    }, []);
    const dismissToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };
    // Toggle wishlist item
    const toggleWishlist = (id) => {
        const trip = DESTINATIONS.find((d) => d.id === id);
        const tripTitle = trip ? trip.title : 'Expedition';
        if (wishlist.includes(id)) {
            setWishlist((prev) => prev.filter((item) => item !== id));
            showToast('Removed from Wishlist', `${tripTitle} was removed from your saved list.`, 'info');
        }
        else {
            setWishlist((prev) => [...prev, id]);
            showToast('Saved to Wishlist', `${tripTitle} is saved for quick comparison!`, 'success');
        }
    };
    // Handle slide click from HeroSlider
    const handleHeroSlideSelect = (slide) => {
        const matched = DESTINATIONS.find((d) => d.id === `dest-${slide.id.split('-')[0]}`) || DESTINATIONS[0];
        setSelectedDestination(matched);
    };
    // Handle hero search submission
    const handleHeroSearch = (query) => {
        showToast('Search Applied', `Searching routes for "${query.destination || 'All Destinations'}"...`, 'info');
        if (query.destination.toLowerCase().includes('italy') || query.destination.toLowerCase().includes('amalfi') || query.destination.toLowerCase().includes('coast')) {
            setFilterCategory('coastal');
        }
        else if (query.destination.toLowerCase().includes('alps') || query.destination.toLowerCase().includes('swiss')) {
            setFilterCategory('alpine');
        }
        else if (query.destination.toLowerCase().includes('japan') || query.destination.toLowerCase().includes('kyoto')) {
            setFilterCategory('cultural');
        }
        else if (query.destination.toLowerCase().includes('iceland')) {
            setFilterCategory('wilderness');
        }
    };
    // Trigger booking modal for specific destination
    const handleOpenBooking = (destination) => {
        if (destination) {
            setBookingDestination(destination);
        }
        else {
            setBookingDestination(selectedDestination || DESTINATIONS[0]);
        }
        setIsBookingOpen(true);
    };
    // Booking completion callback
    const handleBookingSuccess = (details) => {
        showToast('Reservation Confirmed', `Your booking request for ${details.tripName} (${details.guests} guests) has been received.`, 'success');
    };
    const savedDestinations = DESTINATIONS.filter((d) => wishlist.includes(d.id));
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 flex flex-col antialiased font-sans selection:bg-teal-500 selection:text-white", children: [_jsx(Navbar, { onOpenBooking: () => handleOpenBooking(), wishlistCount: wishlist.length, onOpenWishlist: () => setIsWishlistOpen(true) }), _jsxs("main", { className: "flex-1", children: [_jsx(HeroSlider, { slides: HERO_SLIDES, onSelectSlide: handleHeroSlideSelect, onSearch: handleHeroSearch }), _jsx(DestinationCarousel, { destinations: DESTINATIONS, onSelectDestination: (dest) => setSelectedDestination(dest), onBookDestination: (dest) => handleOpenBooking(dest), wishlist: wishlist, onToggleWishlist: toggleWishlist, filterCategory: filterCategory, onCategoryChange: setFilterCategory }), _jsx(InteractiveExplorer, { destinations: DESTINATIONS, onSelectDestination: (dest) => setSelectedDestination(dest), onBookDestination: (dest) => handleOpenBooking(dest) }), _jsx(ExperiencesSection, { onOpenBooking: () => handleOpenBooking() }), _jsx(TestimonialsSlider, {})] }), _jsx(Footer, { onShowToast: showToast }), _jsx(TripDetailModal, { destination: selectedDestination, onClose: () => setSelectedDestination(null), onBook: (dest) => handleOpenBooking(dest), isWishlisted: selectedDestination ? wishlist.includes(selectedDestination.id) : false, onToggleWishlist: toggleWishlist }), _jsx(BookingModal, { isOpen: isBookingOpen, onClose: () => setIsBookingOpen(false), selectedDestination: bookingDestination, destinations: DESTINATIONS, onBookingSuccess: handleBookingSuccess }), _jsx(WishlistDrawer, { isOpen: isWishlistOpen, onClose: () => setIsWishlistOpen(false), savedDestinations: savedDestinations, onRemove: toggleWishlist, onBook: (dest) => handleOpenBooking(dest), onViewDetails: (dest) => setSelectedDestination(dest) }), _jsx(Toast, { toasts: toasts, onDismiss: dismissToast })] }));
}
