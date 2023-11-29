export const loadImage = (
  src: string,
  { useCors = false, altSrc }: { useCors?: boolean; altSrc?: string }
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = useCors ? "Anonymous" : null;

    image.onload = () => resolve(image);
    image.onerror = (event, soucre, lineNo, colNo, error) => {
      if (altSrc && image.src !== altSrc) image.src = altSrc;
      else reject(`Cannot load image "${image.src}": ${error?.message}`);
    };
    image.src = src;
  });

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
