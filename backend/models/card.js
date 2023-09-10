const mongoose = require('mongoose');
const urlRegex = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(link) {
          return urlRegex.test(
            link,
          );
        },
        message: 'Введен некорректный адрес',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        default: '0',
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', userSchema);
