import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useTheme } from "next-themes";

interface AudioPlayerProps {
    audioUrl?: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
    const { theme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Generate waveform data
    const waveformBars = Array.from({ length: 120 }, (_, i) => {
        const amplitude = Math.sin(i * 0.1) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        return Math.max(0.1, amplitude + noise);
    });

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || duration === 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;

        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleSpeedChange = () => {
        const rates = [1, 1.25, 1.5, 2];
        const currentIndex = rates.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % rates.length;
        const newRate = rates[nextIndex];

        setPlaybackRate(newRate);
        if (audioRef.current) {
            audioRef.current.playbackRate = newRate;
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? currentTime / duration : 0;

    return (
        <div className="w-full mx-auto mb-4">
            <audio
                ref={audioRef}
                src={audioUrl || "/demo-podcast.mp3"}
                preload="metadata"
            />

            <div className={`rounded-lg p-3 grid gap-2 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
                }`} style={{
                    gridTemplateColumns: 'auto 1fr auto',
                    alignItems: 'center'
                }}>
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${theme === 'light'
                        ? 'bg-gray-200 hover:bg-gray-300'
                        : 'bg-white hover:bg-gray-200'
                        }`}
                >
                    {isPlaying ? (
                        <Pause className={`w-5 h-5 ${theme === 'light' ? 'text-black' : 'text-black'}`} />
                    ) : (
                        <Play className={`w-5 h-5 ml-0.5 ${theme === 'light' ? 'text-black' : 'text-black'}`} />
                    )}
                </button>

                {/* Time Display and Waveform */}
                <div className="flex flex-col gap-2 w-full overflow-hidden">
                    <div className="flex justify-between text-sm">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div
                        className="flex items-center gap-px h-12 cursor-pointer"
                        onClick={handleWaveformClick}
                    >
                        {waveformBars.map((height, i) => {
                            const barProgress = i / waveformBars.length;
                            const isPlayed = barProgress <= progress;

                            return (
                                <div
                                    key={i}
                                    className={`flex-1 rounded-full transition-colors duration-75 ${isPlayed
                                        ? (theme === 'light' ? 'bg-black' : 'bg-white')
                                        : (theme === 'light' ? 'bg-gray-300' : 'bg-gray-700')
                                        }`}
                                    style={{
                                        height: `${height * 100}%`,
                                        minHeight: '6px',
                                        maxHeight: '36px'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Speed Control */}
                <button
                    onClick={handleSpeedChange}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${theme === 'light'
                        ? 'bg-gray-200 hover:bg-gray-300 text-black'
                        : 'bg-gray-800 hover:bg-gray-600 text-white'
                        }`}
                >
                    {playbackRate}x
                </button>
            </div>

            <style jsx>{`
                @media (max-width: 640px) {
                    .w-full {
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                    }
                    .h-12 {
                        height: 2.5rem;
                    }
                    .w-10 {
                        width: 2rem;
                        height: 2rem;
                    }
                    .text-sm {
                        font-size: 0.75rem;
                    }
                    .text-xs {
                        font-size: 0.65rem;
                    }
                    .px-2 {
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                    }
                    .py-1 {
                        padding-top: 0.25rem;
                        padding-bottom: 0.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AudioPlayer;