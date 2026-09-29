// == 
// CONTACTS ARRAY
// ==

let contacts = [];


// == 
// GET HTML ELEMENTS
// == 
const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");

const saveContactBtn = document.getElementById("saveContactBtn");

const phoneError = document.getElementById("phoneError");


// === 
// SAVE CONTACT
// ===
saveContactBtn.addEventListener("click", function () {

    const name = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();


    // === 
    // VALIDATION
    // === 

    if (name === "") {
        alert("Please enter full name");
        return;
    }


    if (phone === "") {
        phoneError.textContent = "Please enter phone number";
        phoneInput.classList.add("is-invalid");
        return;
    }


    // Egyptian phone number
    const egyptianPhone =
        /^01[0125][0-9]{8}$/;


    if (!egyptianPhone.test(phone)) {

        phoneError.textContent =
            "Please enter a valid Egyptian phone number";

        phoneInput.classList.add("is-invalid");

        return;
    }


    // Remove error
    phoneError.textContent = "";
    phoneInput.classList.remove("is-invalid");


    // == 
    // CREATE CONTACT OBJECT
    // == 
    const contact = {

        id: Date.now(),

        name: name,

        phone: phone,

        email: email,

        address: address,

        favorite: false,

        emergency: false
    };


    // == 
    // ADD CONTACT TO ARRAY
    // == 
    contacts.push(contact);


    // == 
    // UPDATE PAGE
    // ==

    displayContacts();

    updateStatistics();


    // == 
    // CLEAR INPUTS
    // == 

    clearForm();


    // == 
    // CLOSE MODAL
    // == 
    const modalElement =
        document.getElementById("addContactModal");

    const modal =
        bootstrap.Modal.getInstance(modalElement);

    modal.hide();

});


// == 
// CLEAR FORM
// === 

function clearForm() {

    fullNameInput.value = "";

    phoneInput.value = "";

    emailInput.value = "";

    addressInput.value = "";

    phoneError.textContent = "";

    phoneInput.classList.remove("is-invalid");
}


// == 
// DISPLAY CONTACTS
// == 

function displayContacts() {

    const contactsContainer =
        document.querySelector(".empty-state-container");


    if (!contactsContainer) {
        return;
    }


    // No contacts
    if (contacts.length === 0) {

        contactsContainer.innerHTML = `
            <div class="text-center py-5">

                <div class="empty-icon">
                    <i class="fa-regular fa-address-book"></i>
                </div>

                <h4 class="mt-3">
                    No contacts found
                </h4>

                <p class="text-secondary">
                    Click "Add Contact" to get started
                </p>

            </div>
        `;

        return;
    }


    // Display contacts
    contactsContainer.innerHTML = contacts.map(contact => {

        return `
            <div class="card border-0 shadow-sm rounded-4 mb-3 p-3">

                <div class="d-flex justify-content-between align-items-center">

                    <div class="d-flex align-items-center gap-3">

                        <div class="contact-avatar">
                            <i class="fa-solid fa-user"></i>
                        </div>

                        <div>

                            <h5 class="mb-1 fw-bold">
                                ${contact.name}
                            </h5>

                            <p class="mb-1 text-secondary">
                                <i class="fa-solid fa-phone"></i>
                                ${contact.phone}
                            </p>

                            ${
                                contact.email
                                ? `
                                    <p class="mb-1 text-secondary">
                                        <i class="fa-solid fa-envelope"></i>
                                        ${contact.email}
                                    </p>
                                `
                                : ""
                            }

                            ${
                                contact.address
                                ? `
                                    <p class="mb-0 text-secondary">
                                        <i class="fa-solid fa-location-dot"></i>
                                        ${contact.address}
                                    </p>
                                `
                                : ""
                            }

                        </div>

                    </div>


                    <div class="d-flex gap-2">

                        <button
                            class="btn btn-light"
                            onclick="toggleFavorite(${contact.id})">

                            <i class="${
                                contact.favorite
                                ? "fa-solid"
                                : "fa-regular"
                            } fa-star"></i>

                        </button>


                        <button
                            class="btn btn-light"
                            onclick="toggleEmergency(${contact.id})">

                            <i class="fa-solid fa-heart-pulse"></i>

                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


// == 
// UPDATE STATISTICS
// == 

function updateStatistics() {

    const totalContacts =
        contacts.length;


    const favoriteContacts =
        contacts.filter(contact => contact.favorite).length;


    const emergencyContacts =
        contacts.filter(contact => contact.emergency).length;


    const statistics =
        document.querySelectorAll(".stat-card h3");


    if (statistics.length >= 3) {

        statistics[0].textContent =
            totalContacts;

        statistics[1].textContent =
            favoriteContacts;

        statistics[2].textContent =
            emergencyContacts;
    }
}


// === 
// FAVORITE
// === 

function toggleFavorite(id) {

    const contact =
        contacts.find(contact => contact.id === id);


    if (!contact) {
        return;
    }


    contact.favorite =
        !contact.favorite;


    displayContacts();

    updateStatistics();
}


// === 
// EMERGENCY
// === 
function toggleEmergency(id) {

    const contact =
        contacts.find(contact => contact.id === id);


    if (!contact) {
        return;
    }


    contact.emergency =
        !contact.emergency;


    displayContacts();

    updateStatistics();
}


// === 
// PHONE INPUT
// === 
phoneInput.addEventListener("input", function () {

    const phone =
        phoneInput.value.trim();


    const egyptianPhone =
        /^01[0125][0-9]{8}$/;


    if (phone === "") {

        phoneError.textContent = "";

        phoneInput.classList.remove("is-invalid");

        return;
    }


    if (!egyptianPhone.test(phone)) {

        phoneError.textContent =
            "Please enter a valid Egyptian phone number";

        phoneInput.classList.add("is-invalid");

    } else {

        phoneError.textContent = "";

        phoneInput.classList.remove("is-invalid");
    }

});