document.addEventListener('DOMContentLoaded', async () => {
    const createForm = document.getElementById('create-form');
    const urlParams = new URLSearchParams(window.location.search);
    const insuranceId = urlParams.get('id');

    if (createForm) {
        createForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            const loggedUserId = loggedInUser.userId;

            const policyHolderName = createForm.querySelector('#policy-holder-name').value;
            const propertyAddress = createForm.querySelector('#property-address').value;
            const coverageType = createForm.querySelector('#coverage-type').value;
            const premiumAmount = createForm.querySelector('#premium-amount').value;
            const filename = createForm.querySelector('#filename').value;
            const imageFile = createForm.querySelector('#image-upload').files[0];

            try {
                let response;
                if (insuranceId) {
                    // If insuranceId is present, it's an update operation
                    const imageFileDataUrl = await readFileAsDataURL(imageFile);
                    const formData = {
                        policyHolderName,
                        propertyAddress,
                        coverageType,
                        premiumAmount,
                        filename,
                        imageFile: imageFileDataUrl // Pass the data URL as the image file
                    };

                    response = await fetch(`/api/home-insurance/${insuranceId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    window.location.href = "/homepage.html";
                } else {
                    // Otherwise, it's a create operation
                    const imageFileDataUrl = await readFileAsDataURL(imageFile);
                    const formData = {
                        user_id: loggedUserId,
                        policyHolderName,
                        propertyAddress,
                        coverageType,
                        premiumAmount,
                        filename,
                        imageFile: imageFileDataUrl // Pass the data URL as the image file
                    };

                    response = await fetch('/api/home-insurance', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    window.location.href = "/homepage.html";
                }

                if (!response.ok) {
                    throw new Error('Failed to update/create home insurance holder');
                }

                const data = await response.json();
                console.log('Home insurance holder updated/created:', data);
                // Redirect to homepage or display success message
            } catch (error) {
                console.error('Error updating/creating home insurance holder:', error.message);
                // Display error message to the user
            }
        });
    }

    if (insuranceId) {
        try {
            // Fetch insurance holder data by ID
            const response = await fetch(`/api/home-insurance/${insuranceId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch insurance holder data');
            }
            const insuranceData = await response.json();

            // Populate form fields with insurance holder data
            document.getElementById('policy-holder-name').value = insuranceData.policyHolderName;
            document.getElementById('property-address').value = insuranceData.propertyAddress;
            document.getElementById('coverage-type').value = insuranceData.coverageType;
            document.getElementById('premium-amount').value = insuranceData.premiumAmount;
            document.getElementById('filename').value = insuranceData.filename;

            // Convert binary image data to data URL and set it as the image source
            const imageDataUrl = `data:${insuranceData.image.contentType};base64,${insuranceData.image.data.$binary.base64}`;
            const imgElement = document.getElementById('house-image');
            imgElement.src = imageDataUrl;

            const submitButton = document.getElementById('submit-button'); // Get the submit button element
            submitButton.textContent = 'Update'; // Change button text to 'Update'
        } catch (error) {
            console.error('Error fetching insurance holder data:', error);
        }
    }
});

// Function to read file as Data URL
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
