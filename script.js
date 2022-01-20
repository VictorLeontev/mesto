let buttonEdit = document.querySelector(".button_edit");
let buttonClose = document.querySelector(".button_close");
let popup = document.querySelector(".popup");

function openPopup() {
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

buttonEdit.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container");

let nameInput = document.getElementById('name');
let jobInput = document.getElementById('about-us');
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__about-us");

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

let popupSaveClose = document.querySelector(".button_save");
popupSaveClose.addEventListener("click", closePopup);