import { useState } from 'react';
import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const RichEditor = () => {
  const [value, setValue] = useState(EditorState.createEmpty());

  const handelState = (data) => {
    console.log(data);
    setValue(data);
  };
  console.log(value);
  const { editorState } = value;
  return (
    <div>
      <div>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          editorState={editorState}
          onEditorStateChange={handelState}
        />
      </div>
    </div>
  );
};

export default RichEditor;
