import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToPastes, updateToPastes } from "../../features/paste/pasteSlice";
import { toast } from "react-toastify";
import styles from "./Home.module.css";

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create paste
  function createPaste(paste) {
    const newPaste = {
      id: Date.now().toString(),
      title: paste.pasteTitle,
      content: paste.pasteContent,
      createdAt: new Date().toISOString(),
    };

    console.log("Paste created:", newPaste);
    dispatch(addToPastes(newPaste));
    toast.success("Paste created successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
    });
  }

  // update paste
  function updatePaste(id, paste) {
    console.log("Paste updated:", id);
    dispatch(
      updateToPastes({
        id,
        title: paste.pasteTitle,
        content: paste.pasteContent,
      })
    );
    toast.info("Paste updated successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
    });
    navigate("/pastes"); // go back to list after update
  }

  // prefill form values for editing
  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p.id === pasteId);
      if (paste) {
        reset({
          pasteTitle: paste.title,
          pasteContent: paste.content,
        });
      }
    }
  }, [pasteId, pastes, reset]);

  // submit valid data only
  function onSubmit(data) {
    if (pasteId) {
      updatePaste(pasteId, data);
    } else {
      createPaste(data);
    }
    reset();
    setSearchParam({});
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.titleContainer}>
          <input className={styles.input}
            {...register("pasteTitle", {
              required: "Please enter title",
              minLength: { value: 2, message: "Enter atleast two characters" },
            })}
            placeholder="Enter title"
          />
          <button type="submit" className={styles.button}>
            {pasteId ? "Update Paste" : "Add Paste"}
          </button>
          {errors.pasteTitle && <p className={styles.error}>{errors.pasteTitle.message}</p>}
        </div>
        {/* Textarea for content */}
        <div>
          <textarea className={styles.textarea}
            {...register("pasteContent", {
              required: "Please enter paste content",
              minLength: {
                value: 2,
                message: "Content must have atleast two characters",
              },
            })}
            placeholder="Enter content here"
            rows="10"
          />
          {errors.pasteContent && <p className={styles.error}>{errors.pasteContent.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default Home;
