import { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertTriangle,
    XCircle,
    Calendar,
    ExternalLink,
    ChevronDown,
    UserPlus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { SubscriptionForm } from '../components/SubscriptionForm';

interface CustomerSubscription {
    id: string;
    customerName: string;
    planName: string;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Trial' | 'Expired' | 'Suspended' | 'Cancelled';
    billingCycle: 'Monthly' | 'Yearly';
}

export function CustomerSubscriptions() {
    const [subscriptions] = useState<CustomerSubscription[]>([
        {
            id: 'sub_1',
            customerName: 'Acme Corp',
            planName: 'Enterprise Plus',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            status: 'Active',
            billingCycle: 'Yearly'
        },
        {
            id: 'sub_2',
            customerName: 'Global Tech',
            planName: 'Professional',
            startDate: '2024-02-15',
            endDate: '2024-03-15',
            status: 'Trial',
            billingCycle: 'Monthly'
        },
        {
            id: 'sub_3',
            customerName: 'Small Biz Inc',
            planName: 'Starter Pack',
            startDate: '2023-11-01',
            endDate: '2023-11-30',
            status: 'Expired',
            billingCycle: 'Monthly'
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

    const getStatusStyle = (status: CustomerSubscription['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-50 text-green-600 border-green-100';
            case 'Trial': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Expired': return 'bg-red-50 text-red-600 border-red-100';
            case 'Suspended': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Cancelled': return 'bg-slate-100 text-slate-500 border-slate-200';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const getStatusIcon = (status: CustomerSubscription['status']) => {
        switch (status) {
            case 'Active': return <CheckCircle2 size={12} />;
            case 'Trial': return <Clock size={12} />;
            case 'Expired': return <XCircle size={12} />;
            case 'Suspended': return <AlertTriangle size={12} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Subscriptions</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Manage customer plan assignments, renewals, and billing cycles.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-slate-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <UserPlus size={18} strokeWidth={2.5} />
                    Assign New Plan
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-100 flex flex-wrap items-center gap-2 shadow-sm">
                <div className="relative flex-grow min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search customers or plans..."
                        className="w-full bg-slate-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-slate-200 transition-all font-medium"
                    />
                </div>
                <button className="h-10 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-2 text-slate-600 text-sm font-bold transition-colors">
                    <Filter size={16} />
                    Status: All
                    <ChevronDown size={14} />
                </button>
                <button className="h-10 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-2 text-slate-600 text-sm font-bold transition-colors">
                    Billing: All
                    <ChevronDown size={14} />
                </button>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Plan</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {subscriptions.map((sub) => (
                            <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 transition-all border border-transparent group-hover:border-slate-200 uppercase font-black text-xs">
                                            {sub.customerName.substring(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{sub.customerName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{sub.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-bold text-slate-900">{sub.planName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                                        {sub.billingCycle}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                            <Calendar size={12} className="text-slate-400" />
                                            {sub.startDate} <span className="text-slate-300 mx-1">→</span> {sub.endDate}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border", getStatusStyle(sub.status))}>
                                        {getStatusIcon(sub.status)}
                                        {sub.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all">
                                            <ExternalLink size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddForm && (
                <SubscriptionForm
                    onClose={() => setShowAddForm(false)}
                    onSave={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
}
