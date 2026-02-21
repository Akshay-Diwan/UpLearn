export interface UploadResponse {
  answer: string;
  audio_url: string;
}

export const uploadPdfAndAsk = async (
  file: File,
  question: string
): Promise<UploadResponse> => {
  try {
    console.log(typeof file);
    console.log("Uploading file and question:", file, question);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ques", question);
    // console.log("Uploading file and question:", file, question);

    const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
      method: "POST",
      body: formData,
    });
    console.log("Response received:", response);
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data: UploadResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};