let buttonEdit = document.querySelector(".profile__button_edit");
let buttonClose = document.querySelector(".popup__button_close");
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

buttonEdit.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);