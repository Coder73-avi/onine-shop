import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
export default function TextEditor({ text, setText }) {
  const router = useRouter();
  const { quill, quillRef, refresh } = useQuill({});
  // console.log(text);

  useEffect(() => {
    if (quill) {
      if (router.query.hasOwnProperty("q")) {
        if (router.query.q == "update") {
          quill.clipboard.dangerouslyPasteHTML(text);
        }
      }
      // quill.clipboard.dangerouslyPasteHTML(text);
      quill.on("text-change", () => {
        const formText = quillRef.current.firstChild.innerHTML;
        setText(formText);
      });
    }
  }, [quill, quillRef, refresh]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div ref={quillRef} />
      </div>
    </>
  );
}
