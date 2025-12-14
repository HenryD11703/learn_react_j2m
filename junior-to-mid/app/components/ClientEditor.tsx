"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import ReviewPanel from "./ReviewPanel";

interface Props {
  startingCode: string;
  aiInstruction: string;
}

export default function ClientEditor({ startingCode, aiInstruction }: Props) {
  return (
    <div className="relative w-full h-full bg-[#0A0A0A]">
      <SandpackProvider
        template="react"
        theme="dark"
        files={{ "/App.js": startingCode }}
      >
        {/* Editor con altura FORZADA */}
        <div className="absolute inset-0 bottom-[72px]">
          <SandpackLayout
            style={{
              height: "100%",
              minHeight: "100%",
            }}
          >
            <SandpackCodeEditor
              showTabs={false}
              style={{
                height: "100%",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              style={{ height: "100%" }}
              showRefreshButton={true}
            />
          </SandpackLayout>
        </div>

        {/* Review Panel - altura fija */}
        <div className="absolute bottom-0 left-0 right-0 h-[72px]">
          <ReviewPanel instruction={aiInstruction} />
        </div>
      </SandpackProvider>
    </div>
  );
}
