
function check() {
    // 1. Grab the values from the UI
    const dobValue = document.getElementById("dob").value;
    const stream = document.getElementById("stream").value;
    const resultDisplay = document.getElementById("result"); // Assuming you have an element to show the result

    // 2. Validate that a date was actually entered
    if (!dobValue) {
        alert("Please enter your Date of Birth");
        return;
    }

    // 3. Convert input string to a Date object
    const dob = new Date(dobValue);
    const birthYear = dob.getFullYear();

    /** * 4. Define Eligibility Logic (Example for NDA/NA 157)
     * Usually, for the 157th course, the birth date must fall 
     * between specific dates (e.g., Jan 2, 2007, to Jan 1, 2010).
     * Adjust these timestamps based on the actual official notification.
     */
    const minDate = new Date("2007-01-02");
    const maxDate = new Date("2010-01-01");

    let isAgeEligible = (dob >= minDate && dob <= maxDate);
    let isStreamEligible = (stream === 'Physics + Maths');

    // 5. Determine Eligibility Status
    let message = "";
    let eligibleForNA = 0;

    if (isAgeEligible) {
        if (isStreamEligible) {
            eligibleForNA = 1;
            message = "Congratulations! You are eligible for both Army, Navy, and Air Force (NA).";
        } else {
            message = "You are eligible for the Army wing, but Physics + Maths is required for the Naval Academy (NA).";
        }
    } else {
        message = "Sorry, your Date of Birth does not fall within the required range for the 157th course.";
    }

    // 6. Output the result to the screen
    console.log("Eligible for NA:", eligibleForNA);
    if (resultDisplay) {
        resultDisplay.innerText = message;
        resultDisplay.style.color = isAgeEligible ? "green" : "red";
    }
}