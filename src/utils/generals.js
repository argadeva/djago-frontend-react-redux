//function image to base64
export async function toBase64Sync(file) {
  return new Promise((resolve, reject) => {
    let data = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      data = reader.result;
      resolve(data);
    };
  });
}