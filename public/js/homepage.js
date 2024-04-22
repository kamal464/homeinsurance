document.addEventListener("DOMContentLoaded", async function () {
    const homeInsuranceList = document.getElementById("home-insurance-list");
    try {
        // Fetch home insurance holders from the server
        const response = await fetch("/api/home-insurance");
        if (!response.ok) {
            throw new Error("Failed to fetch home insurance holders");
        }
        const homeInsurances = await response.json();
    
        // Render home insurance holders
        homeInsurances.forEach(insurance => {
            let imageData;
            if (insurance.image && insurance.image.data && insurance.image.data.type === "Buffer") {
                // Convert array of bytes to base64 string
                const uint8Array = new Uint8Array(insurance.image.data.data);
                const binaryString = uint8Array.reduce((acc, byte) => {
                    return acc + String.fromCharCode(byte);
                }, '');
                imageData = btoa(binaryString);
            }
            const row = `
                <tr>
                    <td>${insurance.policyHolderName}</td>
                    <td>${insurance.propertyAddress}</td>
                    <td>${insurance.coverageType}</td>
                    <td>${insurance.premiumAmount}</td>
                    <td>${insurance.filename}</td>
                    <td>${imageData ? `<img src="data:image/png;base64,${imageData}" alt="House Image" style="max-width: 100px;">` : ''}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${insurance._id}">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${insurance._id}">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
            homeInsuranceList.insertAdjacentHTML("beforeend", row);
        });
        // Add event listeners for edit and delete buttons
        homeInsuranceList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const insuranceId = btn.getAttribute('data-id');
                // Redirect to edit page with insuranceId and call data
                window.location.href = `/formpage.html?id=${insuranceId}`; // Removed the unnecessary single quote
            });
        });
        

        homeInsuranceList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const insuranceId = btn.getAttribute('data-id');
                try {
                    // Send delete request to server
                    const response = await fetch(`/api/home-insurance/${insuranceId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete home insurance');
                    }
                    // Reload the page to reflect changes
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            });
        });

    } catch (error) {
        console.error(error);
    }

    const createButton = document.getElementById('create-button');

    createButton.addEventListener('click', () => {
        window.location.href = '/formpage.html'; // Replace '/formpage' with the actual URL of your form page
    });

});
