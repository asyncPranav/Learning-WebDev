import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Paste App</h1>
      <p className={styles.text}>
        Paste App is a simple and lightweight tool that allows you to create, save, edit, and share text or code snippets easily.
      </p>

      <h2 className={styles.subtitle}>Features</h2>
      <ul className={styles.list}>
        <li>Create and save pastes with a title.</li>
        <li>Edit or delete pastes anytime.</li>
        <li>Share pastes with a link.</li>
        <li>Search pastes by title.</li>
        <li>Syntax highlighting for code snippets.</li>
      </ul>

      <h2 className={styles.subtitle}>Why this app?</h2>
      <p className={styles.text}>
        This app was built as a beginner-friendly React project to practice Redux, routing, and state management while making something useful.
      </p>

      <p className={styles.footer}>
        🚀 Made with ❤️ using React & Redux
      </p>
    </div>
  );
};

export default About;

