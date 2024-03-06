import { forwardRef } from 'react';

const RegistrationResult = forwardRef( function RegistrationResult({result}, ref) {
    
    const failed = result.title !== "Success";
    const classes = "result-modal" + (failed ? " dialog-failure" : "");
    return (
      <dialog ref={ref} className={classes}>
        <h2>{result.title}</h2>
        <p>{result.description}</p>
        <form method='dialog'>
            <button>Close</button>
        </form>
      </dialog>
    );
})

export default RegistrationResult;