'use strict';
import { openPopup, pictureInfo, pictureSignature, pictureFullPopup } from './index.js';

export default class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._likeButton = this._element.querySelector('.element__button-like');

        const pictureFull = this._element.querySelector('.element__top');

        pictureFull.src = this._image;
        pictureFull.alt = this._title;
        this._element.querySelector('.element__text').textContent = this._title;
        //const likeButton = this._element.querySelector('.element__button-like');

        return this._element;
    }

    _toggleLike() {
        //const likeButton = this._element.querySelector('.element__button-like');
        this._likeButton.classList.toggle('element__button-like_active');
        //this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handleCardClick() {
        pictureInfo.src = this._image;
        pictureInfo.alt = this._title;
        pictureSignature.textContent = this._title;

        openPopup(pictureFullPopup);
    }

    _setEventListeners() {

        this._element.querySelector('.element__button-like').addEventListener('click', () => {
            this._toggleLike();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__top').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
}