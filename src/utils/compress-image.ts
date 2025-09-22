interface CompressImageParams {
   file: File;
   maxWidth?: number;
   maxHeight?: number;
   quality?: number;
}

const convertToWebp = (filename: string): string => {
   const lastDoIndex = filename.lastIndexOf(".");
   if (lastDoIndex === -1) {
      return `${filename}.webp`;
   }

   return `${filename.substring(0, lastDoIndex)}.webp`;
};

export function compressImage({
   file,
   maxHeight = Number.POSITIVE_INFINITY,
   maxWidth = Number.POSITIVE_INFINITY,
   quality = 1,
}: CompressImageParams) {
   const allowFileTypes = ["image/jpeg", "image/png", "image/webp"];

   if (!allowFileTypes.includes(file.type)) {
      throw new Error("Image format not supported");
   }

   return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
         const compressed = new Image();

         compressed.onload = () => {
            const canvas = document.createElement("canvas");
            let width = compressed.width;
            let height = compressed.height;

            if (width > height) {
               if (width > maxWidth) {
                  width = maxWidth;
                  height *= maxWidth / width;
               }
            } else {
               if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
               }
            }
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");

            if (!context) {
               reject("Failure to get canvas context");
               return;
            }

            context.drawImage(compressed, 0, 0, width, height);
            canvas.toBlob(
               (blob) => {
                  if (!blob) {
                     reject("Failured to compress Image");
                     return;
                  }
                  const compressedFile = new File(
                     [blob],
                     convertToWebp(file.name),
                     {
                        type: "image/webp",
                        lastModified: Date.now(),
                     }
                  );
                  resolve(compressedFile);
               },
               "image/webp",
               quality
            );
         };
         compressed.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
   });
}
