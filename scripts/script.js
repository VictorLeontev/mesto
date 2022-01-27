let buttonEdit = document.querySelector(".profile__button-edit");
let buttonClose = document.querySelector(".popup__button-close");
let popup = document.querySelector(".popup");

let formElement = document.querySelector(".popup__container");

let nameInput = document.getElementById('name');
let jobInput = document.getElementById('about-us');
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__about-us");

function openPopup() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

buttonEdit.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);

formElement.addEventListener('submit', formSubmitHandler);