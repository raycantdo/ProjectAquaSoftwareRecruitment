/* 
 * Aqua Software Recruitment Task
 * 
 * Your Goal: Implement the control logic for the ROV.
 * 
 * CONTROL LOGIC EXPLAINED:
 * 1. The ROV has two thrusters: Left and Right.
 *    - Use `leftMotorDriver(speed)` and `rightMotorDriver(speed)` to control them.
 *    - speed range: -1023 (Reverse) to 1023 (Forward).
 * 
 * 2. Depth is controlled by a Ballast Tank.
 *    - Use `injectorPump(speed)` to add water
 *    - Use `ejectorPump(speed)` to remove water
 *    - speed range: 0 to 1023.
 * 
 * GLOBAL VARIABLES:
 * - joystickLeft (Object): { x, y } - range -1024 to 1024
 * - joystickRight (Object): { x, y } - range -1024 to 1024
 */


/* 
 * TASK 1: BUTTON CONTROLS
 * Implement these functions to control the hardware.
 * Use valid values (e.g. 1023, 0, -1023) for the drivers.
 */

function moveForward() {
    // TODO: Move forward
}

function moveBackward() {
    // TODO: Move Backward
}

function turnLeft() {
    // TODO: Rotate Left 
}

function turnRight() {
    // TOOD: Rotate Right
}

function ascend() {
    // TODO: Eject water to float

}

function descend() {
    // TODO: Inject water to sink 
}




/* 
 * TASK 2: JOYSTICK CONTROL
 * This function is called every frame when in Joystick Mode.
 * 
 * INPUTS:
 *  - joystickLeft.y: Forward/Backward (-1024 to 1024). Up is Positive (Forward).
 *  - joystickLeft.x: Turn Left/Right (-1024 to 1024).
 *  - joystickRight.y: Depth Control (-1024 to 1024).
 * 
 * TASK:
 *  - Calculate appropriate motor values based on joystick inputs.
 *  - Map outputs to -1023 to 1023.
 */
function handleJoystickControl() {
    // TODO: Implement JoystickControl
}







// --- EVENT LISTENERS (DO NOT REMOVE) ---
function stop() {
    leftMotorDriver(0);
    rightMotorDriver(0);
    injectorPump(0);
    ejectorPump(0);
}

if (document.getElementById('btn-forward')) {
    const attachButton = (id, startHandler) => {
        const btn = document.getElementById(id);
        if(!btn) return;
        btn.addEventListener('mousedown', startHandler);
        btn.addEventListener('mouseup', stop);
        btn.addEventListener('mouseleave', stop);
    };

    attachButton('btn-forward', moveForward);
    attachButton('btn-backward', moveBackward);
    attachButton('btn-left', turnLeft);
    attachButton('btn-right', turnRight);
    attachButton('btn-ascend', ascend);
    attachButton('btn-descend', descend);
}

