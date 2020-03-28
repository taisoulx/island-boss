// eslint-disable-next-line import/prefer-default-export
export function fileToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      try {
        const res = JSON.parse(e.target.result);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    };
  });
}
