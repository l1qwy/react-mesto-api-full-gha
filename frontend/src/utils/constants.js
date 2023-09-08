// Валидация форм
const validation = {
  inputSelector: ".form__field",
  submitButtonSelector: ".submit",
  inactiveButtonClass: "submit_disabled",
  inputErrorClass: "form__field_error",
  errorClass: "form__error",
};

const popupEditProfileSelector = ".popup_edit-profile";
const popupAddElementSelector = ".popup_add-item";
const popupScaleImgSelector = ".popup_scale-img";
const popupChangeAvatarSelector = ".popup_avatar-profle";
const popupDeleteCardSelector = ".popup_delete-item";

const userProfileInfo = {
  userName: ".profile__name",
  userJob: ".profile__description",
  userAvatar: ".profile__avatar",
};
// темплейт контент элемента галерии и селектор контейна карточек
const cardTemplate = "#galery-item";
const galeryContainer = ".galery";

export {
  validation,
  popupEditProfileSelector,
  popupAddElementSelector,
  popupScaleImgSelector,
  popupChangeAvatarSelector,
  popupDeleteCardSelector,
  userProfileInfo,
  cardTemplate,
  galeryContainer,
};
