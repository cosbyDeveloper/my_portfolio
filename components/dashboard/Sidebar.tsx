'use client';

import { useEffect, useState } from 'react';
import {
FaHome,
FaUserTie,
FaFileAlt,
FaBriefcase,
FaBlog,
FaEnvelope,
FaBars,
FaChevronLeft,
FaChevronRight,
FaTimes,
FaQuestionCircle,
} from 'react-icons/fa';

import SidebarFooter from './SidebarFooter';
import { useNavigation, useScrollSpy, isNavItemActive, NavItem } from '@/lib/hooks';

const navItems: NavItem[] = [
{
label: 'Introduction',
icon: FaHome,
section: 'introduction',
},
{
label: 'About',
icon: FaUserTie,
section: 'about',
pageRoute: '/about',
},
{
label: 'Resume',
icon: FaFileAlt,
section: 'resume',
pageRoute: '/resume',
},
{
label: 'Portfolio',
icon: FaBriefcase,
section: 'portfolio',
pageRoute: '/portfolio',
},
{
label: 'Blog',
icon: FaBlog,
section: 'blog',
pageRoute: '/blog',
},
{
label: 'FAQ',
icon: FaQuestionCircle,
section: 'faq',
pageRoute: '/faq',
},
{
label: 'Contact',
icon: FaEnvelope,
section: 'contact',
pageRoute: '/contact',
},
];

const Sidebar = () => {
const { handleNavClick, currentPath } = useNavigation();
const activeSection = useScrollSpy(navItems);

const [collapsed, setCollapsed] = useState<boolean>(() => {
if (typeof window === 'undefined') return false;
return localStorage.getItem('sidebar-collapsed') === 'true';
});
const [mobileOpen, setMobileOpen] = useState(false);

// Persist collapsed state
useEffect(() => {
localStorage.setItem('sidebar-collapsed', String(collapsed));
}, [collapsed]);

const handleItemClick = (item: NavItem) => {
handleNavClick(item);
setMobileOpen(false);
};

const isActive = (item: NavItem) =>
isNavItemActive(item, currentPath, activeSection);

return (
<>
{/* ============ DESKTOP SIDEBAR ============ */}
<aside
className={`hidden lg:block fixed top-0 left-0 h-screen ${
collapsed ? 'w-20' : 'w-60'
} overflow-hidden transition-[width] duration-300 ease-in-out shadow-lg bg-background z-40`}>
<div className='flex flex-col h-full p-4'>
{/* Collapse Toggle */}
<button
onClick={() => setCollapsed(!collapsed)}
className='w-10 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95'
aria-label='Toggle sidebar'>
{collapsed ? <FaChevronRight /> : <FaChevronLeft />}
</button>

{/* Navigation */}
<nav className='mt-4 flex-1 space-y-1'>
{navItems.map((item) => (
<button
key={item.label}
onClick={() => handleItemClick(item)}
aria-current={isActive(item) ? 'page' : undefined}
className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-all duration-300
hover:bg-primary/10 hover:pl-4
${isActive(item) ? 'bg-primary/20 text-primary' : ''}`}>
<div
className={`transition-all duration-300 ${
collapsed ? 'scale-125' : 'scale-100'
}`}>
<item.icon className='text-lg' />
</div>
<span
className={`transition-all duration-300 ${
collapsed
? 'opacity-0 w-0 overflow-hidden -translate-x-2'
: 'opacity-100 w-auto translate-x-0'
}`}>
{item.label}
</span>
</button>
))}
</nav>

{/* Footer */}
<SidebarFooter collapsed={collapsed} />
</div>
</aside>

{/* ============ SPACER FOR DESKTOP CONTENT ============ */}
<div
className={`hidden lg:block ${
collapsed ? 'w-20' : 'w-60'
} transition-[width] duration-300 ease-in-out shrink-0`}
aria-hidden='true'
/>

{/* ============ MOBILE SIDEBAR ============ */}
{/* Mobile hamburger */}
<button
onClick={() => setMobileOpen(true)}
className='lg:hidden fixed top-4 left-4 z-30 m-2 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center bg-background shadow-md transition-all duration-200 hover:scale-105'
aria-label='Open menu'>
<FaBars />
</button>

{/* Mobile sidebar overlay */}
<div
className={`lg:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ease-in-out ${
mobileOpen
? 'opacity-100 visible'
: 'opacity-0 invisible pointer-events-none'
}`}>
{/* Sidebar */}
<div
className={`flex w-72 flex-col bg-background p-4 h-full transform transition-transform duration-300 ease-out ${
mobileOpen ? 'translate-x-0' : '-translate-x-full'
}`}>
{/* Close Button */}
<button
onClick={() => setMobileOpen(false)}
className='mb-4 w-10 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center transition-colors duration-200 hover:scale-105'
aria-label='Close menu'>
<FaTimes />
</button>

{/* Navigation */}
<nav className='space-y-1'>
{navItems.map((item) => (
<button
key={item.label}
onClick={() => handleItemClick(item)}
className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-all duration-200
hover:bg-primary/10 hover:pl-4
${isActive(item) ? 'bg-primary/20 text-primary' : ''}`}>
<item.icon />
<span>{item.label}</span>
</button>
))}
</nav>

{/* Footer */}
<div className='mt-auto pt-10'>
<SidebarFooter />
</div>
</div>

{/* Overlay */}
<div
className={`flex-1 bg-black/40 transition-opacity duration-300 ${
mobileOpen ? 'opacity-100' : 'opacity-0'
}`}
onClick={() => setMobileOpen(false)}
/>
</div>
</>
);
};

export default Sidebar;
