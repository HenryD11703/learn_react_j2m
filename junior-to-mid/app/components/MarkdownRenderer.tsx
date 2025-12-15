"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mb-4 text-white">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-xl font-bold mb-3 mt-6 text-white">{children}</h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mb-2 mt-4 text-white">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">
      {children}
    </ol>
  ),

  li: ({ children }) => <li className="text-gray-300">{children}</li>,

  pre: ({ children }) => (
    <pre className="overflow-x-auto mb-4 max-w-full code-scroll">
      {children}
    </pre>
  ),

  code({ node, children, ...props }) {
    const isBlock = node?.tagName === "pre";

    return isBlock ? (
      <code
        className="block bg-black/30 text-emerald-400 p-3 rounded text-xs font-mono overflow-x-auto mb-4 border border-white/10 code-scroll"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className="bg-white/10 text-emerald-400 px-1.5 py-0.5 rounded text-xs font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },

  strong: ({ children }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),

  em: ({ children }) => <em className="italic text-gray-300">{children}</em>,

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-white/20 pl-4 italic text-gray-400 my-4">
      {children}
    </blockquote>
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}
