"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Zap,
  Clock,
  Headphones,
  Sparkles,
  ArrowRight,
  Mic,
  Brain,
  Globe,
  Volume2,
  User,
  Smartphone,
  Download,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-600 dark:to-gray-400 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-black dark:text-white">Tella AI</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              className="border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-black dark:border-gray-500 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black bg-transparent transition-all duration-200"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-gray-200/80 text-gray-700 border-gray-400 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600">
          <Sparkles className="w-3 h-3 mr-1" />
          Powered by Advanced AI
        </Badge>

        <h1 className="w-full max-w-7xl mx-auto text-3xl md:text-7xl font-bold text-black dark:text-white mb-6 leading-tight">
          Transform News Into
          <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {" "}
            2-Minute Podcasts
          </span>
        </h1>

        <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Stay informed with AI-generated podcasts that turn breaking news and trending stories into engaging 2-minute
          audio experiences. Perfect for your commute, workout, or coffee break.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white dark:from-white dark:to-gray-200 dark:hover:from-gray-100 dark:hover:to-white dark:text-black px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Play className="w-5 h-5 mr-2" />
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-400 px-8 py-6 text-lg rounded-xl bg-transparent transition-all duration-200"
          >
            <Link href="/demo">
              <Headphones className="w-5 h-5 mr-2" />
              Listen to Demo
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-black dark:text-white mb-2">10K+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Daily Podcasts Generated</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">2 Min</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Average Listen Time</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm md:text-bases">News Sources</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">Why Choose Tella AI?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI tells you what matters to you
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="AI-Powered Intelligence"
              description="Advanced natural language processing transforms complex news articles into engaging, easy-to-understand audio content."
            />

            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Perfect 2-Minute Format"
              description="Optimized for busy lifestyles. Get the essential information without the fluff, perfectly timed for any break."
            />

            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Global News Coverage"
              description="Stay updated with breaking news from trusted sources worldwide, all processed and delivered in real-time."
            />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Volume2 className="w-6 h-6" />}
              title="Human-Like Voice"
              description="Natural-sounding AI voices that feel authentic and engaging, making your news consumption experience truly immersive."
            />

            <FeatureCard
              icon={<User className="w-6 h-6" />}
              title="Personalised News"
              description="AI learns your interests and preferences to deliver customised news content that matters most to you, filtering out the noise."
            />
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl p-12 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-600 dark:to-gray-400 rounded-2xl flex items-center justify-center mr-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-gray-200 text-gray-700 border-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                  <Download className="w-3 h-3 mr-1" />
                  Mobile App Available
                </Badge>
              </div>

              <h2 className="text-4xl font-bold text-black dark:text-white mb-4">Take Tella AI Everywhere</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Download our mobile app and never miss important news. Listen to personalized 2-minute podcasts
                on-the-go across all your devices.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-white dark:bg-black rounded-lg flex items-center justify-center">
                      <span className="text-black dark:text-white font-bold text-sm">📱</span>
                    </div>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Download on the</div>
                      <div className="text-lg font-bold">App Store</div>
                    </div>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-white dark:bg-black rounded-lg flex items-center justify-center">
                      <span className="text-black dark:text-white font-bold text-sm">▶️</span>
                    </div>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Get it on</div>
                      <div className="text-lg font-bold">Google Play</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black rounded-[2.5rem] overflow-hidden">
                    {/* Phone Screen Content */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-xs font-semibold text-black dark:text-white">9:41</div>
                        <div className="flex space-x-1">
                          <div className="w-4 h-2 bg-black dark:bg-white rounded-sm"></div>
                          <div className="w-1 h-2 bg-black dark:bg-white rounded-sm"></div>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="flex items-center mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg flex items-center justify-center mr-3">
                          <Mic className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-black dark:text-white">Tella AI</span>
                      </div>

                      {/* Single Podcast Card */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center w-full max-w-[200px]">
                          <div className="flex items-center justify-center mb-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">2 min • Daily Brief</span>
                          </div>
                          <div className="text-lg font-bold text-black dark:text-white mb-4">
                            Your Personalized News Podcast
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-black dark:bg-white h-2 rounded-full w-1/2"></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <span>0:58</span>
                            <span>2:00</span>
                          </div>
                          <Button
                            size="icon"
                            className="mt-4 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                          >
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Download className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">From breaking news to your ears in minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-600 dark:to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              1
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">AI Scans News</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our AI continuously monitors trusted news sources for breaking stories and trending topics.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-500 dark:to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-black font-bold text-xl">
              2
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Smart Processing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced algorithms extract key information and craft engaging, conversational scripts.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-black font-bold text-xl">
              3
            </div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Instant Podcast</h3>
            <p className="text-gray-600 dark:text-gray-400">
              High-quality audio is generated and delivered to your device in perfect 2-minute episodes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-800/30 dark:to-gray-700/30 rounded-3xl p-12 text-center backdrop-blur-sm border border-gray-400/30 dark:border-gray-600/20">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Ready to Transform Your News Experience?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who stay informed with AI-powered podcasts. Start your free trial today and never
            miss important news again.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white dark:from-white dark:to-gray-200 dark:hover:from-gray-100 dark:hover:to-white dark:text-black px-12 py-6 text-xl font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="w-6 h-6 mr-2" />
            Get Started Free
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-300 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-600 dark:to-gray-400 rounded-lg flex items-center justify-center">
              <Mic className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-bold text-black dark:text-white">Tella AI</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">© 2024 Tella AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}


const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group bg-gradient-to-br from-white/80 to-gray-50/90 dark:from-gray-800/40 dark:to-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700/50 p-8 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg">
    <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-600 dark:to-gray-400 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-black dark:text-white mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);