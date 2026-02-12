'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export interface KPICardProps {
    title: string;
    value: string | number;
    icon: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    color: 'indigo' | 'purple' | 'emerald' | 'amber' | 'teal' | 'blue' | 'rose';
    delay?: number;
    footer?: React.ReactNode;
}

const colorMap = {
    indigo: {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        border: 'border-indigo-500/20',
        hoverBorder: 'hover:border-indigo-500/30',
    },
    purple: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/20',
        hoverBorder: 'hover:border-purple-500/30',
    },
    emerald: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/20',
        hoverBorder: 'hover:border-emerald-500/30',
    },
    amber: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/20',
        hoverBorder: 'hover:border-amber-500/30',
    },
    teal: {
        bg: 'bg-teal-500/10',
        text: 'text-teal-400',
        border: 'border-teal-500/20',
        hoverBorder: 'hover:border-teal-500/30',
    },
    blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/30',
    },
    rose: {
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        border: 'border-rose-500/20',
        hoverBorder: 'hover:border-rose-500/30',
    },
};

export const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    icon,
    change,
    trend = 'neutral',
    color,
    delay = 0,
    footer
}) => {
    const styles = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={`glass-panel p-5 rounded-xl group ${styles.hoverBorder} transition-colors relative overflow-hidden`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon icon={icon} width={48} />
            </div>

            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${styles.bg} ${styles.text} border ${styles.border}`}>
                    <Icon icon={icon} width={18} />
                </div>

                {change && (
                    <span className={`text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-full border 
            ${trend === 'up' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                            trend === 'down' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                                'text-slate-400 bg-slate-400/10 border-slate-400/20'}`}>
                        {change}
                        {trend === 'up' && <Icon icon="lucide:arrow-up-right" width={10} />}
                        {trend === 'down' && <Icon icon="lucide:arrow-down-right" width={10} />}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {value}
                </h3>
            </div>

            {footer && (
                <div className="mt-3 text-xs text-slate-500">
                    {footer}
                </div>
            )}
        </motion.div>
    );
};
