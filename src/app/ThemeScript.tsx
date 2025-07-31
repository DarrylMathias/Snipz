"use client";

import Script from "next/script";

export function ThemeScript() {
  return (
    <Script id="theme-script" strategy="beforeInteractive">
      {`
        // Apply dark class immediately
        document.documentElement.classList.add('dark');
        
        // Inline critical dark theme styles
        const style = document.createElement('style');
        style.textContent = \`
          :root {
            --background: #000000;
            --foreground: #ffffff;
            --accent: #1f2937;
            --border: #374151;
          }
          [data-theme="dark"], .dark {
            --background: #000000;
            --foreground: #ffffff;
            --accent: #1f2937;
            --border: #374151;
          }
          .bg-background { background-color: var(--background); }
          .text-foreground { color: var(--foreground); }
          .bg-accent { background-color: var(--accent); }
          .border-border { border-color: var(--border); }
        \`;
        document.head.appendChild(style);
      `}
    </Script>
  );
}