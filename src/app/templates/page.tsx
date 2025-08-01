"use client"
import React from 'react';
import {
  Zap, 
  Copy, 
  Search,
  Clock,
  Sparkles
} from 'lucide-react';
import SidebarSnippets from '@/components/SidebarSnippets';

export default function Component(){
  return(
    <SidebarSnippets>
      <Templates />
    </SidebarSnippets>
  )
}

function Templates() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* <div className="flex justify-center mb-8">
            <div className="p-6 bg-violet-500/10 rounded-2xl border border-violet-500/20">
              <FileCode className="w-16 h-16 text-violet-500" />
            </div>
          </div> */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-violet-500">Templates</span>{" "}
            <span className=" text-white mt-2">Coming Soon</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Ready-made code templates are coming to make your development workflow even faster. 
            Browse, customize, and save professional code snippets in seconds.
          </p>
          <div className="flex items-center justify-center space-x-3 text-zinc-500">
            <Clock className="w-5 h-5" />
            <span className="text-lg">Expected release: October, 2025</span>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What&apos;s Coming
            </h2>
            <p className="text-zinc-400 text-lg">
              Professional code templates at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-violet-500/10 rounded-lg">
                  <Zap className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Lightning Fast Setup
                  </h3>
                  <p className="text-zinc-400">
                    Get started instantly with pre-configured templates for popular frameworks and languages
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-violet-500/10 rounded-lg">
                  <Search className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Smart Search & Filter
                  </h3>
                  <p className="text-zinc-400">
                    Find exactly what you need with intelligent search and category filtering
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-violet-500/10 rounded-lg">
                  <Copy className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    One-Click Copy
                  </h3>
                  <p className="text-zinc-400">
                    Copy entire templates or specific sections with a single click
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-violet-500/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Customizable Templates
                  </h3>
                  <p className="text-zinc-400">
                    Modify templates to fit your needs and save your own variations
                  </p>
                </div>
              </div>
            </div>

            {/* Mock Template Preview */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-x-hidden">
              <div className="bg-zinc-800 px-4 py-3 border-b border-zinc-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-zinc-400 text-sm ml-4">React Component Template</span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2 text-sm font-mono">
                  <div className="text-violet-400">import React from &apos;react&apos;;</div>
                  <div className="text-zinc-500">{'// Template: Functional Component'}</div>
                  <span className="text-blue-400">export default function</span>
                  <span className="text-yellow-400"> ComponentName</span>
                  <span className="text-white">() {'{'}</span>
                  <div className="text-zinc-300 ml-4">return (</div>
                  <div className="text-green-400 ml-8">&lt;div&gt;</div>
                  <div className="text-zinc-300 ml-12">Hello World</div>
                  <div className="text-green-400 ml-8">&lt;/div&gt;</div>
                  <div className="text-zinc-300 ml-4">);</div>
                  <div className="text-white">{'}'}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">React • JavaScript</span>
                    <button className="px-3 py-1 bg-violet-500 hover:bg-violet-600 text-white text-xs rounded transition-colors">
                      Copy Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Categories Preview */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-3">
                Template Categories
              </h3>
              <p className="text-zinc-400">Choose from hundreds of ready-to-use code templates</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'React Components', icon: '⚛️', count: '50+' },
                { name: 'Node.js Utilities', icon: '🟢', count: '30+' },
                { name: 'Python Scripts', icon: '🐍', count: '40+' },
                { name: 'CSS Animations', icon: '🎨', count: '25+' },
                { name: 'JavaScript Functions', icon: '⚡', count: '60+' },
                { name: 'API Endpoints', icon: '🔗', count: '35+' },
                { name: 'Database Queries', icon: '🗄️', count: '20+' },
                { name: 'And many more...', icon: '✨', count: '100+' }
              ].map((category, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 rounded-xl p-6 text-center hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-x-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h4 className="text-white font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                      {category.name}
                    </h4>
                    <div className="inline-flex items-center px-2 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full">
                      <span className="text-violet-300 text-xs font-medium">{category.count} templates</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}