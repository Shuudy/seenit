export function handleImageChange(
  fileList: FileList | null,
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  if (!fileList || fileList.length === 0) {
    setPreview(undefined);
    return;
  }

  const file = fileList[0];
  const url = URL.createObjectURL(file);

  setPreview(prev => {
    if (prev) URL.revokeObjectURL(prev);
    return url;
  });
}
