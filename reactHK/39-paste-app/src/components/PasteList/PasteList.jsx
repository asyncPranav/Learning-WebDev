import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../../features/paste/pasteSlice";
import { Link, Outlet } from "react-router-dom";
import styles from "./PasteList.module.css";

import { toast } from "react-toastify";

const PasteList = () => {
  // search paste
  const [searchTerm, setSearchTerm] = useState("");

  // get pastes from Redux store
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  // delete paste
  function handleDelete(id) {
    dispatch(removeFromPastes(id));
    toast.error("Paste deleted!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
    });
  }

  return (
    <div className={styles.container}>
      <h2>List of Pastes</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Paste"
        className={styles.searchInput}
      />
      {pastes.length === 0 ? (
        <p>No pastes found. Add one!</p>
      ) : (
        <ul className={styles.pasteLists}>
          {pastes
            .filter((paste) =>
              paste.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((paste) => (
              <li key={paste.id}>
                <strong>{paste.title}</strong>
                <p>{paste.content}</p>

                <div className={styles.buttonGroup}>
                  {/* View button */}
                  <Link to={`/pastes/${paste.id}`}>
                    <button className={`${styles.button} ${styles.viewButton}`}>
                      View
                    </button>
                  </Link>

                  {/* Edit button */}
                  <Link to={`/?pasteId=${paste.id}`}>
                    <button className={`${styles.button} ${styles.editButton}`}>
                      Edit
                    </button>
                  </Link>

                  {/* Delete button */}
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => handleDelete(paste.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default PasteList;
