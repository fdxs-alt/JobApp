export const toBase64 = (element: number[]) => {
  return btoa(
    new Uint8Array(element).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );
};
