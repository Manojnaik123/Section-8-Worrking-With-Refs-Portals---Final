import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onRest }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;

    const formettedRemainingTime = (remainingTime / 1000).toFixed(2);

    const score = ((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onRest}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>You stopped the timer with <strong>{formettedRemainingTime} seconds left.</strong></p>
            <form method='dialog' onSubmit={onRest}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;