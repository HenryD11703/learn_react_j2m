"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import ReviewPanel from "./ReviewPanel";

interface Props {
  files: Record<string, string>;
  aiInstruction: string;
  className?: string;
}

export default function ClientEditor({
  files,
  aiInstruction,
  className = "",
}: Props) {
  return (
    <div className={`h-full flex flex-col bg-[#0A0A0A] ${className}`}>
      <SandpackProvider
        template="react"
        theme="dark"
        files={files}
        className="flex-1 flex flex-col min-h-0 relative group" // Added relative for absolute positioning of children
        options={{
          classes: {
            "sp-wrapper": "flex flex-col h-full",
            "sp-layout": "flex-1 flex min-h-0",
          },
        }}
      >
        {/* Editor Area */}
        <div className="absolute inset-0 z-0">
           <SandpackLayout
            style={{
              height: "100%",
              border: "none",
              borderRadius: 0,
            }}
          >
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              style={{
                height: "100%",
                flex: 1,
                fontFamily: "var(--font-geist-mono)",
              }}
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={true}
              style={{
                height: "100%",
                flex: 1,
              }}
            />
          </SandpackLayout>
        </div>

        {/* Terminal/Review Panel - Overlay Drawer */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
           {/* Pointer events none allows clicking through the empty space if panel is collapsed, 
               but ReviewPanel needs pointer-events-auto on its interactive parts */}
          <ReviewPanel instruction={aiInstruction} />
        </div>
      </SandpackProvider>
    </div>
  );
}
