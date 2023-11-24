import axios from "axios";

const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";

export const loadImage = (
  src: string,
  altSrc?: string
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (event, soucre, lineNo, colNo, error) => {
      if (altSrc && image.src !== altSrc) image.src = altSrc;
      else reject(`Cannot load image "${image.src}": ${error?.message}`);
    };
    image.src = src;
  });

const loadImageFromBlob = (imageBlob: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const imageData = URL.createObjectURL(imageBlob);
    const image = new Image();
    image.src = imageData;

    image.onload = () => {
      URL.revokeObjectURL(imageData);
      return resolve(image);
    };
    image.onerror = (event, soucre, lineNo, colNo, error) => {
      URL.revokeObjectURL(imageData);
      return reject(error?.message);
    };
  });

const imageNoCorsRequest = async (src: string): Promise<HTMLImageElement> => {
  try {
    const response = await axios.get(`${corsAnywhereUrl}${src}`, {
      responseType: "arraybuffer",
      headers: { origin: src },
    });
    const imageBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return await loadImageFromBlob(imageBlob);
  } catch (error) {
    return await Promise.reject(`Cannot load image "${src}": ${error}`);
  }
};

export const loadImageNoCors = async (
  src: string,
  altSrcOptions?: { altSrc: string; useNoCors?: boolean }
): Promise<HTMLImageElement> => {
  try {
    return await imageNoCorsRequest(src);
  } catch (error) {
    if (!altSrcOptions) return Promise.reject(error);
    if (!altSrcOptions.useNoCors) return loadImage(altSrcOptions.altSrc);
    return await imageNoCorsRequest(altSrcOptions.altSrc);
  }
};

export const postFormNewTab = (data: Record<string, any>, url: string) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  form.target = "_blank";

  Object.keys(data).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
