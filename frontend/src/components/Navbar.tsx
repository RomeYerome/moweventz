import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar: React.FC = () => {
    // State to control the mobile menu visibility
    const [isOpen, setIsOpen] = useState(false)

    // Ref for the mobile menu to detect outside clicks
    const menuRef = useRef<HTMLDivElement>(null)

    // Function to toggle mobile menu open/close state
    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    // Effect to close menu if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <nav className="py-3 shadow-sm z-20 relative bg-white">
            {/* Container Flex */}
            <div className="container mx-auto flex justify-between items-center">
                {/* LOGO */}
                <NavLink to="/" className="text-2xl font-bold text-gray-900">
                    MowEventz
                </NavLink>

                {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
                <div className="hidden md:flex space-x-7">
                    {['Home', 'Events', 'About', 'Contact'].map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                            className={({ isActive }) =>
                                `py-1 px-3 transition-all duration-200 ${
                                    isActive
                                        ? 'border-b-2 border-black text-black font-bold'
                                        : 'hover:border-b-2 hover:text-primary'
                                }`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>

                {/* MOBILE MENU BUTTON (Rotates on Toggle) */}
                <button
                    className={`md:hidden text-2xl relative z-30 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* BACKDROP OVERLAY (Closes menu when clicked) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-100 opacity-10 z-10 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* MOBILE NAVIGATION (Slides In & Out) */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen bg-gray-200 w-3/5 shadow-lg transform transition-transform duration-300 ease-in-out z-20
        ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col justify-center items-center space-y-8 text-2xl`}
            >
                {['Home', 'Events', 'About', 'Contact'].map((item) => (
                    <NavLink
                        key={item}
                        to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                        className={({ isActive }) =>
                            `pb-1 transition-all duration-200 ${
                                isActive
                                    ? 'border-b-2 border-black text-black font-bold'
                                    : 'hover:border-b-2 hover:text-primary'
                            }`
                        }
                        onClick={() => setIsOpen(false)} // Close menu when a link is clicked
                    >
                        {item}
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}

export default Navbar
