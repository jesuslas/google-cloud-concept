import { apiBaseUrl } from "../config";

export async function getImageInfo(files) {
  var data = new FormData();
  for (const file of files) {
    data.append("files", file, file.name);
  }
  let options = {
    method: "POST",
    body: data
  };
  return await fetch(`${apiBaseUrl}/image`, options);
}
