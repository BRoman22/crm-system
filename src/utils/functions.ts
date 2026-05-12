export function validateTitle(title: string) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    alert('Поле обязательно для заполнения');
    return true;
  }

  if (trimmedTitle.length < 2) {
    alert(`"${trimmedTitle}" - минимальная длина 2 символа (сейчас ${trimmedTitle.length})`);
    return true;
  }

  if (trimmedTitle.length > 64) {
    alert(
      `"${trimmedTitle.substring(0, 20)}..." - максимальная длина 64 символа (сейчас ${trimmedTitle.length})`
    );
    return true;
  }

  return false;
}
