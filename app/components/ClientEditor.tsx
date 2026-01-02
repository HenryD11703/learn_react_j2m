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
}

export default function ClientEditor({ files, aiInstruction }: Props) {
  return (
    <div className="w-full h-full bg-[#0A0A0A] flex flex-col">
      <SandpackProvider
        template="react"
        theme="dark"
        files={files}
        className="flex flex-col h-full min-h-0" // Important: min-h-0 for nested flex scroll
      >
        {/* Editor Area - Takes all available space */}
        <div className="flex-1 min-h-0 relative">
          <SandpackLayout
            style={{
              height: "100%",
              borderRadius: 0,
              border: "none",
            }}
          >
            <SandpackCodeEditor
              showTabs={true}
              showLineNumbers={true}
              showInlineErrors={true}
              wrapContent={true}
              style={{
                height: "100%",
                fontSize: "13px",
                fontFamily: "var(--font-geist-mono)", // Assuming we have this, or default mono
              }}
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={true}
              style={{ height: "100%" }}
            />
          </SandpackLayout>
        </div>

        {/* Terminal/Review Panel - Sits at bottom */}
        <div className="z-10">
          <ReviewPanel instruction={aiInstruction} />
        </div>
      </SandpackProvider>
    </div>
  );
}
