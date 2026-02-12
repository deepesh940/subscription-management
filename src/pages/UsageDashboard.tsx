import { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Database,
    PieChart as PieChartIcon,
    Activity,
    Filter,
    ChevronDown,
    Download
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const usageTrendData = [
    { name: 'Jan', usage: 4000 },
    { name: 'Feb', usage: 3000 },
    { name: 'Mar', usage: 2000 },
    { name: 'Apr', usage: 2780 },
    { name: 'May', usage: 1890 },
    { name: 'Jun', usage: 2390 },
    { name: 'Jul', usage: 3490 },
];

const planDistributionData = [
    { name: 'Starter', value: 400, color: '#94a3b8' },
    { name: 'Professional', value: 300, color: '#00d285' },
    { name: 'Enterprise', value: 100, color: '#0f172a' },
];

export function UsageDashboard() {
    const [timeRange, setTimeRange] = useState('Last 30 Days');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Usage Dashboard</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Real-time monitoring of subscription usage and entitlement consumption.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-10 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-600 text-sm font-bold transition-all hover:border-slate-300">
                        <Filter size={16} />
                        {timeRange}
                        <ChevronDown size={14} />
                    </button>
                    <button className="h-10 px-4 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-sm font-bold transition-all hover:bg-slate-800">
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Avg. API Calls', value: '1.2M', trend: '+12.5%', isUp: true, icon: Activity, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Storage Used', value: '842 GB', trend: '+2.1%', isUp: true, icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Active Users', value: '14,204', trend: '-1.4%', isUp: false, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Limit Alerts', value: '24', trend: 'Critical', isUp: false, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase",
                                stat.isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Usage Trend */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900">Usage Trend</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Daily interaction volume</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Successful Requests</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={usageTrendData}>
                                <defs>
                                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00d285" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#00d285" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '16px',
                                        border: '1px solid #f1f5f9',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="usage"
                                    stroke="#00d285"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorUsage)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Plan Distribution */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900">Plan Distribution</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 mb-8">Market share by plan type</p>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={planDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {planDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                        {planDistributionData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-slate-900">{(item.value / 800 * 100).toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
