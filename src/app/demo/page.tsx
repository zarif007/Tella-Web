"use client"

import { Button } from "@/components/ui/button";
import { Headphones, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchGoogleNews } from "./actions";
import { useTransition, useState } from "react";
import summarizeNews from "./summarize";
import AudioPlayer from "./AudioPlayer";
import { convertTextToSpeech } from "./tts";

export default function DemoPage() {
    const [isPending, startTransition] = useTransition();
    const queries = ["bangladesh", "real madrid", "ai", "technology", "sports"];
    const [audioUrl, setAudioUrl] = useState<string | null>(null);


    async function handleFetch() {
        startTransition(async () => {
            const allResults: { title: string, content: string }[] = [];
            for (const query of queries) {
                const res = await fetchGoogleNews(query);
                if (Array.isArray(res.content)) {
                    allResults.push(...res.content);
                }
            }
            const allSummaries = await summarizeNews(allResults);
            const summary = await summarizeNews(allSummaries || "");
            if (typeof summary === 'string' && summary.trim().length > 0) {
                const result = await convertTextToSpeech(summary);
                if (result.success && result.audioBlob) {
                    const audioUrl = URL.createObjectURL(result.audioBlob);
                    setAudioUrl(audioUrl);
                } else {
                    console.error('TTS Error:', result.error);
                }
            } else {
                console.error('No summary generated for TTS.');
            }
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black px-4">
            <div className="max-w-xl w-full bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-600 dark:to-gray-400 rounded-2xl flex items-center justify-center mb-6">
                    <Headphones className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Listen to a Demo Podcast</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Experience how Tella AI turns news into a crisp, engaging 2-minute podcast. Hit play and enjoy!
                </p>
                <AudioPlayer audioUrl={audioUrl} />
                <Button onClick={handleFetch} disabled={isPending} className="mt-4 w-full">
                    {isPending ? "Loading..." : "Hear"}
                </Button>
                <Link href="/" className="mt-4 w-full flex justify-end">
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
} 