import React, { useState } from 'react';
import {
    X,
    Upload,
    Search,
    Check,
    ChevronRight,
    Briefcase,
    Smartphone,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Hash,
    Tag,
    Clock,
    ArrowUpCircle,
    ArrowDownCircle,
    CheckCircle2,
    Users as UsersIcon,
    Globe,
    Building2,
    GitMerge,
    Database,
    Zap,
    ChevronDown,
    Layout,
    Settings,
    Circle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PlanFormProps {
    onClose: () => void;
    onSave: (data: any) => void;
}

interface Branch {
    id: string;
    name: string;
    role: string;
    isChecked: boolean;
    isDefault: boolean;
}

interface Module {
    id: string;
    name: string;
    isOpen: boolean;
    type: 'single-role' | 'branch-role';
    role?: string;
    branches: Branch[];
}

const initialModules: Module[] = [
    {
        id: 'erp_central',
        name: 'ERP Central',
        isOpen: true,
        type: 'single-role',
        role: 'Project User',
        branches: []
    },
    {
        id: 'maintenance_service',
        name: 'Maintenance & Service',
        isOpen: true,
        type: 'branch-role',
        branches: [
            { id: 'b1', name: 'Holistic O&G Kenya', role: '', isChecked: false, isDefault: false },
            { id: 'b2', name: 'Holistic O&G Global', role: '', isChecked: false, isDefault: false },
            { id: 'b3', name: 'Holistic Oil & Gas', role: '', isChecked: false, isDefault: false },
            { id: 'b4', name: 'DigiNergy', role: '', isChecked: false, isDefault: false },
            { id: 'b5', name: 'ABC', role: 'Company Admin', isChecked: true, isDefault: true },
        ]
    },
    {
        id: 'hrms',
        name: 'HRMS',
        isOpen: false,
        type: 'single-role',
        role: 'Select Role',
        branches: []
    },
    {
        id: 'finance',
        name: 'Finance',
        isOpen: false,
        type: 'single-role',
        role: 'Select Role',
        branches: []
    }
];

export function PlanForm({ onClose, onSave }: PlanFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [modules, setModules] = useState<Module[]>(initialModules);

    const toggleAccordion = (id: string) => {
        setModules(prev => prev.map(m => m.id === id ? { ...m, isOpen: !m.isOpen } : m));
    };

    const toggleBranch = (moduleId: string, branchId: string) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    branches: m.branches.map(b => b.id === branchId ? { ...b, isChecked: !b.isChecked } : b)
                };
            }
            return m;
        }));
    };

    const setDefaultBranch = (moduleId: string, branchId: string) => {
        setModules(prev => prev.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    branches: m.branches.map(b => ({ ...b, isDefault: b.id === branchId }))
                };
            }
            return m;
        }));
    };

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-slate-100 animate-in fade-in duration-200 overflow-hidden font-sans">
            {/* Sub-Header / Breadcrumbs */}
            <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Plan Master</h2>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Home</span>
                        <ChevronRight size={12} strokeWidth={3} />
                        <span>Master Data</span>
                        <ChevronRight size={12} strokeWidth={3} />
                        <span className="text-slate-600">Create Subscription Plan</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto px-8 py-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Section 1: Global Configuration */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Globe className="text-blue-500" size={20} />
                            Global Configuration
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {/* Plan ID */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                    Plan ID <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="text" placeholder="e.g. PLN-ENT-2024" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                                </div>
                            </div>

                            {/* Plan Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                    Plan Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="text" placeholder="e.g. Enterprise Plus" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                                </div>
                            </div>

                            {/* Plan Type */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Plan Type</label>
                                <div className="relative group">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none">
                                        <option>Trial</option>
                                        <option>Monthly</option>
                                        <option>Yearly</option>
                                        <option>Enterprise</option>
                                    </select>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Pricing (USD)</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                                    <input type="number" placeholder="99.00" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                                </div>
                            </div>

                            {/* Validity */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Validity (Days)</label>
                                <div className="relative group">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="number" placeholder="365" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                                </div>
                            </div>

                            {/* Renewal Cycle */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Renewal Cycle</label>
                                <div className="relative group">
                                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none">
                                        <option>Auto</option>
                                        <option>Manual</option>
                                        <option>None</option>
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Plan Status</label>
                                <div className="relative group">
                                    <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all appearance-none">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                        <option>Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Upgrade/Downgrade Flags */}
                        <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-slate-50">
                            {[
                                { label: "Upgrade Allowed", id: "upgrade", icon: ArrowUpCircle },
                                { label: "Downgrade Allowed", id: "downgrade", icon: ArrowDownCircle },
                            ].map(toggle => (
                                <div key={toggle.id} className="bg-slate-50 border border-slate-100 rounded-[24px] px-6 py-4 flex items-center gap-4 flex-grow max-w-[300px]">
                                    <toggle.icon size={20} className="text-slate-400" />
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex-grow">{toggle.label}</span>
                                    <button className="w-10 h-5 bg-green-500 rounded-full relative transition-colors shadow-inner shadow-green-600/20">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Limits Configuration */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Zap className="text-orange-500" size={20} />
                            Limits Configuration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {[
                                { label: "Max Users", icon: UsersIcon, placeholder: "50" },
                                { label: "Max External Users", icon: UsersIcon, placeholder: "10" },
                                { label: "Max Companies", icon: Building2, placeholder: "5" },
                            ].map(limit => (
                                <div key={limit.label} className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                        {limit.label}
                                    </label>
                                    <div className="relative group">
                                        <limit.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                        <input type="number" placeholder={limit.placeholder} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Module Entitlements (Redesigned Accordion) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-slate-900 ml-4 flex items-center gap-2">
                            <Layout className="text-green-500" size={20} />
                            Module Entitlements
                        </h3>

                        {modules.map(mod => (
                            <div key={mod.id} className="bg-white rounded-[24px] border border-slate-100 shadow-lg shadow-slate-200/30 overflow-hidden">
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleAccordion(mod.id)}
                                    className="w-full px-8 py-5 flex items-center justify-between bg-blue-50/50 hover:bg-blue-50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("transition-transform duration-200", mod.isOpen ? "rotate-180" : "")}>
                                            <ChevronDown size={20} className="text-slate-900" />
                                        </div>
                                        <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{mod.name}</span>
                                    </div>
                                </button>

                                {/* Accordion Content */}
                                {mod.isOpen && (
                                    <div className="p-8 space-y-6">
                                        {mod.type === 'single-role' ? (
                                            <div className="max-w-xs">
                                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.66667%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat">
                                                    <option>{mod.role}</option>
                                                    <option>Admin</option>
                                                    <option>Manager</option>
                                                    <option>User</option>
                                                </select>
                                                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {mod.branches.map(branch => (
                                                    <div key={branch.id} className="flex items-center gap-4 py-3 group">
                                                        {/* Branch Icon */}
                                                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                                                            <Globe size={20} />
                                                        </div>

                                                        {/* Checkbox */}
                                                        <button
                                                            onClick={() => toggleBranch(mod.id, branch.id)}
                                                            className={cn(
                                                                "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                                                branch.isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200"
                                                            )}
                                                        >
                                                            {branch.isChecked && <Check size={12} strokeWidth={4} />}
                                                        </button>

                                                        {/* Name */}
                                                        <span className="text-sm font-bold text-slate-700 flex-grow">{branch.name}</span>

                                                        {/* Role Select */}
                                                        <div className="w-48">
                                                            <select className="w-full bg-white border border-slate-100 rounded-xl py-2 px-3 text-sm font-bold text-slate-500 focus:outline-none focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M4%206L8%2010L12%206%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:16px_16px] bg-[right_8px_center] bg-no-repeat">
                                                                <option>{branch.role || 'Select Role'}</option>
                                                                <option>Admin</option>
                                                                <option>User</option>
                                                            </select>
                                                        </div>

                                                        {/* Default Toggle */}
                                                        <button
                                                            onClick={() => setDefaultBranch(mod.id, branch.id)}
                                                            className="flex items-center gap-2 group/default"
                                                        >
                                                            <div className={cn(
                                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                                branch.isDefault ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200"
                                                            )}>
                                                                {branch.isDefault && <div className="w-2 h-2 bg-white rounded-full" />}
                                                            </div>
                                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Default</span>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="h-24" />
                </div>
            </div>

            {/* Sticky Bottom Footer */}
            <div className="bg-white border-t border-slate-200 px-8 py-6 flex flex-col items-center shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-center gap-3 w-full max-w-lg">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        className="flex-2 bg-slate-900 py-4 rounded-2xl text-xs font-black text-white uppercase tracking-[0.2em] hover:bg-black shadow-xl shadow-slate-900/10 transition-all active:scale-95 px-8"
                    >
                        Save Plan
                    </button>
                    <button
                        className="flex-1 bg-green-500 py-4 rounded-2xl text-xs font-black text-white uppercase tracking-[0.2em] hover:bg-green-600 shadow-xl shadow-green-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        Save & Next
                    </button>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-[0.3em] opacity-50">
                    PROPRIETARY INTERFACE © ROCKEYE SYSTEM 2026
                </p>
            </div>
        </div>
    );
}
