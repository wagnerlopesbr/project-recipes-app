export const copyLink = (
  url: string,
  setFunction: (boolean: React.SetStateAction<boolean>) => void,
) => {
  navigator.clipboard.writeText(url)
    .then(() => {
      setFunction(true);
    })
    .catch((err) => console.error('Erro ao copiar: ', err));
};
