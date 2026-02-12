import { useState } from 'react';
import {
    Shield,
    ChevronDown,
    ChevronRight,
    Check,
    X,
    Info,
    Lock,
    Eye,
    PlusCircle,
    Edit3,
    Trash2,
    CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Permission {
    feature: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
}

interface ModulePermissions {
    module: string;
    features: Permission[];
}

export function AccessMatrix() {
    const [selectedPlan, setSelectedPlan] = useState('Professional');
    const [expandedModules, setExpandedModules] = useState<string[]>(['Finance', 'HRMS']);

    const modulesData: ModulePermissions[] = [
        {
            module: 'Finance',
            features: [
                { feature: 'Journal Entry', view: true, create: true, edit: true, delete: false, approve: true },
                { feature: 'Bank Reconciliation', view: true, create: true, edit: false, delete: false, approve: false },
                { feature: 'Financial Reports', view: true, create: false, edit: false, delete: false, approve: false },
            ]
        },
        {
            module: 'HRMS',
            features: [
                { feature: 'Employee Directory', view: true, create: true, edit: true, delete: false, approve: false },
                { feature: 'Payroll Processing', view: true, create: true, edit: true, delete: false, approve: true },
                { feature: 'Leave Management', view: true, create: true, edit: true, delete: true, approve: true },
            ]
        },
        {
            module: 'Inventory',
            features: [
                { feature: 'Stock Adjustment', view: true, create: true, edit: false, delete: false, approve: true },
                { feature: 'Warehouse Transfer', view: true, create: true, edit: true, delete: false, approve: false },
            ]
        }
    ];

    const toggleModule = (module: string) => {
        setExpandedModules(prev =>
            prev.includes(module) ? prev.filter(m => m !== module) : [...prev, module]
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Access Rights Matrix</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Define granular permission sets for each subscription tier.</p>
                </div>
                <div className="flex items-center gap-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Selected Plan:</label>
                    <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all"
                    >
                        <option>Starter Pack</option>
                        <option>Professional</option>
                        <option>Enterprise Plus</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Matrix Header */}
                <div className="grid grid-cols-12 bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                    <div className="col-span-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Module / Feature</div>
                    <div className="col-span-8 grid grid-cols-5 text-center">
                        {['View', 'Create', 'Edit', 'Delete', 'Approve'].map(action => (
                            <div key={action} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{action}</div>
                        ))}
                    </div>
                </div>

                {/* Matrix Body */}
                <div className="divide-y divide-slate-50">
                    {modulesData.map((module) => (
                        <div key={module.module} className="animate-in fade-in duration-300">
                            {/* Module Row */}
                            <button
                                onClick={() => toggleModule(module.module)}
                                className="w-full grid grid-cols-12 items-center py-4 px-6 hover:bg-slate-50/30 transition-colors group"
                            >
                                <div className="col-span-4 flex items-center gap-3">
                                    {expandedModules.includes(module.module) ? (
                                        <ChevronDown size={16} className="text-slate-400" />
                                    ) : (
                                        <ChevronRight size={16} className="text-slate-400" />
                                    )}
                                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs">
                                        {module.module[0]}
                                    </div>
                                    <span className="text-sm font-black text-slate-900">{module.module}</span>
                                </div>
                                <div className="col-span-8 grid grid-cols-5 h-2">
                                    {/* Visual indicator of bulk permissions could go here */}
                                </div>
                            </button>

                            {/* Feature Rows */}
                            {expandedModules.includes(module.module) && (
                                <div className="bg-slate-50/20 divide-y divide-slate-50/50">
                                    {module.features.map((feature) => (
                                        <div key={feature.feature} className="grid grid-cols-12 items-center py-4 px-6 hover:bg-white transition-colors">
                                            <div className="col-span-4 pl-12">
                                                <span className="text-sm font-semibold text-slate-600">{feature.feature}</span>
                                            </div>
                                            <div className="col-span-8 grid grid-cols-5 text-center">
                                                {[
                                                    { key: 'view', value: feature.view },
                                                    { key: 'create', value: feature.create },
                                                    { key: 'edit', value: feature.edit },
                                                    { key: 'delete', value: feature.delete },
                                                    { key: 'approve', value: feature.approve },
                                                ].map((action) => (
                                                    <div key={action.key} className="flex justify-center">
                                                        <button className={cn(
                                                            "w-6 h-6 rounded-md flex items-center justify-center transition-all",
                                                            action.value
                                                                ? "bg-green-500 text-white shadow-sm shadow-green-500/20"
                                                                : "bg-slate-100 text-slate-300 hover:bg-red-50 hover:text-red-400"
                                                        )}>
                                                            {action.value ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                <Info className="text-blue-500 w-5 h-5 shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-bold text-blue-700 leading-relaxed uppercase tracking-wide">Pro Tip</p>
                    <p className="text-xs font-medium text-blue-600 mt-0.5 leading-relaxed">
                        Changes made to the matrix are versioned. Active subscriptions will be notified of permission changes on their next session.
                    </p>
                </div>
            </div>

            {/* Save Action */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all">
                    Discard Changes
                </button>
                <button className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Save Matrix Changes
                </button>
            </div>
        </div>
    );
}
