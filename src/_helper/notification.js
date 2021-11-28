export const createNotification = (title, message) => ({ title, message });

export const errorMaxFavorite = (name) => createNotification(
  'Невозможно добавить в избранное!',
  `Превышено максимальное число избранных мест. Для того, чтобы добавить ${name} в избранное, необходимо удалить одно из старых.`,
);
