import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../../features/paste/pasteSlice";

// toast
import { toast } from "react-toastify";

// syntax highlight
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// style
import styles from "./ViewPaste.module.css";

const ViewPaste = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get all pastes from redux
  const pastes = useSelector((state) => state.paste.pastes);

  // find the paste that matches the id
  const paste = pastes.find((p) => p.id === id);

  if (!paste) {
    return <p>No paste found with this id.</p>;
  }

  function handleDelete() {
    dispatch(removeFromPastes(id));
    navigate("/pastes"); // go back to list after delete
  }

  function handleEdit() {
    navigate(`/?pasteId=${id}`); // send back to home form with pasteId
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Paste copied successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
    });
  };

  const handleShare = () => {
    const url = window.location.href; // current URL
    if (navigator.share) {
      // Web Share API (mobile-friendly)
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((err) => toast.error("Share failed!"));
    } else {
      // fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{paste.title}</h2>
      <p className={styles.content}>
        {paste.content.startsWith("```") ? (
          <SyntaxHighlighter
            language={ paste.content.split("\n")[0].replace(/```/, "") || "javascript" }
            style={vscDarkPlus}
            showLineNumbers
          >
            {paste.content.replace(/```.*\n/, "")}{" "} {/* remove first line with ```language */}
          </SyntaxHighlighter>
        ) : (
          <p className={styles.content}>{paste.content}</p>
        )}
      </p>
      <small className={styles.date}>
        Created: {new Date(paste.createdAt).toLocaleString()}
      </small>

      <div className={styles.buttonGroup}>
        <button className={styles.copyButton} onClick={handleCopy}>
          Copy
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.shareButton} onClick={handleShare}>
          Share
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
