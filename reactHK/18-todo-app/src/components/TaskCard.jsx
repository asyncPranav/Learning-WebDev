import React from "react";

const TaskCard = ({ index, title, status, description, handleDone, handleDelete }) => {
  return (
    <div className="taskCard">
      <p className={status ? "done" : "undo"}>
        <strong>{title}</strong> : {description}
      </p>
      <div className="taskButtonContainer">
        {/* <button onClick={handleDone(index)}>Done</button> // ❌ Looks correct, but causes a bug */}
        <button className="done" onClick={() => handleDone(index)}>{status ? "Undo" : "Done"}</button>
        <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
      </div>
    </div>
  );
};

/*
If you had written: onClick={handleDone(index)} — it would call the function immediately.

  <button onClick={handleDone(index)}>Done</button> // ❌ Looks correct, but causes a bug


🚨 What This Really Does

  That line does NOT wait for the user to click the button.

  Instead, it says:
    "Hey React, when rendering the component, go ahead and immediately run handleDone(index)."

  So as soon as the component loads, React calls handleDone(index) — even though the user didn’t click anything.
  Then React tries to set onClick={undefined} because the function has already run.


🧪 You Can Try It

  Try putting this in your component just to test:
    <button onClick={console.log("Clicked!")}>Test</button> // ❌ logs instantly

  Then change to:
    <button onClick={() => console.log("Clicked!")}>Test</button> // ✅ logs only when clicked


❓ Doubt

  I wrote onClick={handleDone(index)} — so why doesn't it wait until I click? I clearly said onClick, right?

  It seems logical, but the issue is not the onClick part — the issue is how JavaScript evaluates functions inside JSX.


  🔥 Here's what actually happens in this code:

    <button onClick={handleDone(index)}>Done</button>

  When React reads this line during rendering, JavaScript immediately runs:

    handleDone(index)

  Why?
    Because JavaScript evaluates anything inside {} in JSX right away.
    So it’s the same as writing:

    const result = handleDone(index);
    <button onClick={result}>Done</button>

  Which means:
    - You ran the function,
    - stored the return value in onClick,
    - instead of storing the function itself to run later.

  So the onClick is now set to the result of handleDone(index), not the function itself.


  ✅ Correct: wrap it in an arrow function

    <button onClick={() => handleDone(index)}>Done</button>

    Now, React sees a function — not the result of a function. This function will be called later, when the user clicks.

    It’s exactly like writing:

    function onClickHandler() {
      handleDone(index);
    }

    <button onClick={onClickHandler}>Done</button>

*/

export default TaskCard;
