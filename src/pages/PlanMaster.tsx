import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Users as UsersIcon,
    Database,
    Globe,
    Tag,
    ArrowRight,
    ChevronDown,
    X,
    Edit2,
    Trash2,
    Copy,
    Building2,
    Briefcase
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Plan {
    id: string;
    name: string;
    type: 'Trial' | 'Monthly' | 'Yearly' | 'Enterprise';
    price: string;
    validity: string;
    users: number;
    companies: number;
    status: 'Active' | 'Draft' | 'Archived';
    modules: string[];
}

import { PlanForm } from '../components/PlanForm';

export function PlanMaster() {
    const [plans, setPlans] = useState<Plan[]>([
        {
            id: 'PLN-001',
            name: 'Starter Pack',
            type: 'Monthly',
            price: '$99',
            validity: '30 Days',
            users: 5,
            companies: 1,
            status: 'Active',
            modules: ['HRMS', 'Financial Accounting']
        },
        {
            id: 'PLN-002',
            name: 'Professional',
            type: 'Yearly',
            price: '$999',
            validity: '365 Days',
            users: 50,
            companies: 5,
            status: 'Active',
            modules: ['HRMS', 'Financial Accounting', 'Inventory', 'CRM']
        },
        {
            id: 'PLN-003',
            name: 'Enterprise Plus',
            type: 'Enterprise',
            price: 'Custom',
            validity: 'Custom',
            users: 500,
            companies: 20,
            status: 'Active',
            modules: ['All Modules', 'Custom Modules']
        }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Plan Master</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Configure and manage your subscription tiers, resource limits, and entitlements.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    New Subscription Plan
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Tiers', value: '3', icon: Tag, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Avg. Revenue', value: '$450', icon: Clock, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Total User Seats', value: '555', icon: UsersIcon, color: 'text-purple-500', bg: 'bg-purple-50' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-100 flex flex-wrap items-center gap-2 shadow-sm">
                <div className="relative flex-grow min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search plans by ID, name, or modules..."
                        className="w-full bg-slate-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-slate-200 transition-all font-medium"
                    />
                </div>
                <button className="h-10 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-2 text-slate-600 text-sm font-bold transition-colors">
                    <Filter size={16} />
                    Status: All
                    <ChevronDown size={14} />
                </button>
                <div className="ml-auto flex items-center gap-2">
                    <button className="h-10 w-10 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors">
                        <Globe size={18} />
                    </button>
                </div>
            </div>

            {/* Plans Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest w-[80px]">ID</th>
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest">Plan Details</th>
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest">Type / Renewal</th>
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest">Resource Limits</th>
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest">Entitlements</th>
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                            <th className="px-6 py-4 font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {plans.map((plan) => (
                            <tr key={plan.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-slate-400 font-mono tracking-tight">{plan.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-green-500 transition-all border border-transparent group-hover:border-slate-200">
                                            <Briefcase size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">{plan.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{plan.price} / {plan.validity}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                                            {plan.type}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Auto-Renew</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2 font-bold text-slate-600">
                                            <UsersIcon size={12} className="text-slate-400" />
                                            {plan.users} <span className="text-[10px] text-slate-400 font-medium">Users</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-slate-600">
                                            <Building2 size={12} className="text-slate-400" />
                                            {plan.companies} <span className="text-[10px] text-slate-400 font-medium">Cos.</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-slate-600">
                                            <UsersIcon size={12} className="text-slate-400" />
                                            10 <span className="text-[10px] text-slate-400 font-medium">Ext.</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                        {plan.modules.slice(0, 2).map(mod => (
                                            <span key={mod} className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black rounded-md border border-green-100 uppercase">
                                                {mod}
                                            </span>
                                        ))}
                                        {plan.modules.length > 2 && (
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded-md uppercase">
                                                +{plan.modules.length - 2} More
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full font-black uppercase text-[9px] tracking-widest">
                                        <CheckCircle2 size={10} />
                                        {plan.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all">
                                            <Copy size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal (High-Fidelity) */}
            {showAddModal && (
                <PlanForm
                    onClose={() => setShowAddModal(false)}
                    onSave={(data) => {
                        console.log('Saved:', data);
                        setShowAddModal(false);
                    }}
                />
            )}
        </div>
    );
}
