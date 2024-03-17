import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const localStorageKey = "editorContent";

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  // Load initial content from localStorage if available
  const savedContent = localStorage.getItem(localStorageKey) || initialContent;
  const parsedInitialContent = savedContent
    ? JSON.parse(savedContent)
    : [
        {
          type: "paragraph",
          content: "Use '/' for commands",
        },
      ];

  // Creates a new editor instance with the (validated) initial content.
  const editor = useCreateBlockNote({
    initialContent: parsedInitialContent,
    onChange: (newContent) => {
      const stringifiedContent = JSON.stringify(newContent, null, 2);
      onChange(stringifiedContent); // Propagate changes up
      localStorage.setItem(localStorageKey, stringifiedContent); // Persist changes to local storage
    },
    uploadFile: handleUpload,
  });

  // No need for useEffect to subscribe to changes; handled in onChange

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
      />
    </div>
  );
};

export default Editor;
