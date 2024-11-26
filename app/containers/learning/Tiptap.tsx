/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Node, mergeAttributes } from '@tiptap/core';
import {
  ReactNodeViewRenderer,
  useEditor,
  EditorContent,
  NodeViewWrapper,
} from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { data, questions } from './questions';
// Custom React Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomComponent = ({ node }: any) => {
  console.log(node);
  const options = node?.attrs?.content?.options || {};
  return (
    <NodeViewWrapper
      className="custom-component"
      style={{ border: '1px solid black', padding: '10px' }}
    >
      <p>{node?.attrs?.content?.question}</p>
      <ul>
        {Object.keys(options).map((option: any) => (
          <li key={option} className="flex items-center gap-2">
            <input type="radio" name="question1" /> {option}. {options[option]}
          </li>
        ))}
      </ul>
    </NodeViewWrapper>
  );
};

// Custom Extension
const CustomExtension = Node.create({
  name: 'customComponent',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      content: {
        default: 'Default Content',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="customComponent"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'customComponent' }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomComponent);
  },
});

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomExtension],
    content: '123',
  });
  const [index, setIndex] = useState(0);

  const addCustomComponent = () => {
    editor?.commands.insertContent({
      type: 'customComponent',
      attrs: { content: questions[index] },
    });
    setIndex(index + 1);
  };
  useEffect(() => {
    editor?.commands?.setContent(data);
  }, [editor]);

  return (
    <div className="relative flex flex-col gap-2">
      <div>
        <Button type="button" variant="outline" onClick={addCustomComponent}>
          Add Custom Component
        </Button>
      </div>
      <EditorContent editor={editor} />
      <div className="bg-white w-full p-2">
        <Button
          type="button"
          className="mx-auto"
          onClick={() => {
            console.log(editor?.getJSON());
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TiptapEditor;
