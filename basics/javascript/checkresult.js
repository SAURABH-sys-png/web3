const categorySelect = document.getElementById('category');
const category10Plus2Div = document.querySelector('.category-10plus2');
const button = document.getElementById('calculate');

categorySelect.addEventListener('change', function() {
    if (this.value === 'category-10plus2') {
        category10Plus2Div.style.display = 'block';
        button.style.display = 'block';
    } else {
        category10Plus2Div.style.display = 'none';
    }
});

function calculateEligibility() {
    const dob = document.getElementById('dob').value;
    const currentlyStudyingIn = document.getElementById('currentlyStudyingIn').value;
    // Add your eligibility calculation logic here
    
};

