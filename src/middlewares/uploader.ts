import multer, { memoryStorage } from 'multer';

const storage = memoryStorage();
const upload = multer({ storage });

export function useSingleUploader(fileName: string) {
  return upload.single(fileName);
}
