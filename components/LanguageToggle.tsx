'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-6 right-6 z-50 px-4 py-2 cyber-btn rounded-lg uppercase tracking-wider text-sm font-bold"
        >
            <Globe size={16} className="inline mr-2" />
            {language}
        </button>
    );
}
