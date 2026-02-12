import { useState } from 'react';
import {
    LayoutDashboard,
    Layers,
    Building2,
    Users,
    Briefcase,
    Settings,
    ShieldCheck,
    ChevronLeft,
    Search,
    MessageSquare,
    Bell,
    User,
    CreditCard,
    PieChart
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { PlanMaster } from './pages/PlanMaster';
import { AccessMatrix } from './pages/AccessMatrix';
import { CustomerSubscriptions } from './pages/CustomerSubscriptions';
import { UsageDashboard } from './pages/UsageDashboard';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function App() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('subscription');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'applications', label: 'Applications', icon: Layers },
        { id: 'companies', label: 'Companies', icon: Building2 },
        { id: 'branches', label: 'Branches', icon: Briefcase },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'subscription', label: 'Plan Master', icon: CreditCard, group: 'Master' },
        { id: 'matrix', label: 'Access Matrix', icon: ShieldCheck, group: 'Master' },
        { id: 'customers', label: 'Customer Plans', icon: Users, group: 'Master' },
        { id: 'usage', label: 'Usage Insights', icon: PieChart, group: 'Reports' },
        { id: 'config', label: 'Config', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden workspace-grid">
            {/* Sidebar */}
            <aside className={cn(
                "flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-30",
                isSidebarCollapsed ? "w-20" : "w-64"
            )}>
                <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-xl">
                        R
                    </div>
                    {!isSidebarCollapsed && (
                        <div className="ml-3">
                            <p className="text-sm font-bold leading-none tracking-tight">ROCKEYE</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ERP Central</p>
                        </div>
                    )}
                </div>

                <nav className="flex-grow py-6 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item, index) => {
                        const isFirstInGroup = index === 0 || navItems[index - 1].group !== item.group;
                        return (
                            <div key={item.id}>
                                {item.group && isFirstInGroup && !isSidebarCollapsed && (
                                    <p className="px-6 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                        {item.group}
                                    </p>
                                )}
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "w-full flex items-center h-12 px-6 transition-all relative group",
                                        activeTab === item.id
                                            ? "text-green-600 bg-green-50/50"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    )}
                                >
                                    <item.icon className={cn("shrink-0", isSidebarCollapsed ? "w-6 h-6" : "w-5 h-5")} />
                                    {!isSidebarCollapsed && <span className="ml-4 text-sm font-semibold">{item.label}</span>}
                                    {activeTab === item.id && (
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-full" />
                                    )}
                                    {isSidebarCollapsed && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </nav>

                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="h-12 border-t border-slate-100 flex items-center px-6 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <ChevronLeft className={cn("w-5 h-5 transition-transform", isSidebarCollapsed && "rotate-180")} />
                    {!isSidebarCollapsed && <span className="ml-4 text-sm font-medium">Collapse Sidebar</span>}
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-20">
                    <div className="flex items-center flex-grow max-w-2xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search resources, users, or plans..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500/50 transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                        <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none">Admin User</p>
                                <p className="text-xs font-semibold text-slate-400 mt-1">Super Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 cursor-pointer hover:border-green-500 transition-all">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content Area */}
                <main className="flex-grow overflow-auto p-8">
                    <div className="max-w-[1600px] mx-auto">
                        {activeTab === 'subscription' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <PlanMaster />
                            </div>
                        )}
                        {activeTab === 'matrix' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <AccessMatrix />
                            </div>
                        )}
                        {activeTab === 'customers' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CustomerSubscriptions />
                            </div>
                        )}
                        {activeTab === 'usage' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <UsageDashboard />
                            </div>
                        )}
                        {activeTab !== 'subscription' && activeTab !== 'matrix' && activeTab !== 'customers' && activeTab !== 'usage' && (
                            <div className="flex flex-col items-center justify-center h-full text-slate-300 py-20">
                                <Layers size={80} strokeWidth={1} />
                                <p className="mt-6 text-xl font-bold italic">Module "{activeTab}" Coming Soon</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
