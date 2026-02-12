import React, { useState } from 'react';
import {
    X,
    Upload,
    Search,
    Check,
    ChevronRight,
    User,
    CreditCard,
    Calendar,
    ShieldCheck,
    Mail,
    Smartphone,
    Info
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SubscriptionFormProps {
    onClose: () => void;
    onSave: (data: any) => void;
}

const plansOptions = [
    "Starter Pack - $99/mo",
    "Professional - $999/yr",
    "Enterprise Plus - Custom",
    "Trial Plan - Free"
];

export function SubscriptionForm({ onClose, onSave }: SubscriptionFormProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlan, setSelectedPlan] = useState(plansOptions[1]);

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-slate-100 animate-in fade-in duration-200 overflow-hidden font-sans">
            {/* Sub-Header / Breadcrumbs */}
            <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Customer Subscriptions</h2>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Home</span>
                        <ChevronRight size={12} strokeWidth={3} />
                        <span>Customer Subscriptions</span>
                        <ChevronRight size={12} strokeWidth={3} />
                        <span className="text-slate-600">Assign New Plan</span>
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
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Main Assignment Card */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                        <div className="flex flex-col lg:flex-row gap-12">

                            {/* Left Column: Customer Profile */}
                            <div className="w-full lg:w-1/3">
                                <div className="aspect-square rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-8 text-center group hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors mb-4 overflow-hidden">
                                        <User size={40} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 mb-1">Drag customer logo or click to upload</p>
                                    <p className="text-xs font-medium text-slate-400">Assigned Profile Image</p>
                                </div>
                            </div>

                            {/* Right Column: Customer & Plan Details */}
                            <div className="flex-grow space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    {/* Row 1 */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                            Customer Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Search or enter customer name"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between ml-1">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                Select Plan <span className="text-red-500">*</span>
                                            </label>
                                        </div>
                                        <div className="relative group">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            <select
                                                value={selectedPlan}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                                            >
                                                {plansOptions.map(opt => <option key={opt}>{opt}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="date"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                            Billing Contact <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="email"
                                                placeholder="it@customer.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Toggles */}
                                <div className="flex flex-wrap items-center gap-4">
                                    {[
                                        { label: "Auto-Renew Subscription", id: "renew" },
                                        { label: "Direct Debit Enabled", id: "debit" },
                                        { label: "Custom Domain Mapping", id: "domain" },
                                    ].map(toggle => (
                                        <div key={toggle.id} className="bg-slate-50 border border-slate-100 rounded-[20px] px-5 py-3 flex items-center gap-4 flex-grow min-w-[200px]">
                                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex-grow">{toggle.label}</span>
                                            <button className="w-10 h-5 bg-blue-600 rounded-full relative transition-colors">
                                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-transform translate-x-0" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Module Overrides / Specific Entitlements */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-900">Module Overrides</h3>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border border-slate-100 rounded-full px-4 py-2">
                                <Info size={14} />
                                <span>Base entitlements from {selectedPlan} plan will be applied.</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {["Finance", "HRMS", "CRM", "Inventory"].map(mod => (
                                <div key={mod} className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-black text-slate-900">{mod}</span>
                                        <button className="w-8 h-4 bg-green-500 rounded-full relative">
                                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-500">View</span>
                                        <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-500">Edit</span>
                                        <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-500">Export</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-24" />
                </div>
            </div>

            {/* Sticky Bottom Footer */}
            <div className="bg-white border-t border-slate-200 px-8 py-6 flex flex-col items-center">
                <div className="flex items-center justify-center gap-3 w-full max-w-lg">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white border border-slate-200 py-3 rounded-xl text-sm font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        className="flex-1 bg-blue-600 py-3 rounded-xl text-sm font-black text-white uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        Assign Plan
                    </button>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-[0.2em]">
                    Copyright 2026 © ROCKEYE. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}
