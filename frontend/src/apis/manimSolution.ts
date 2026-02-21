export const fetchAnswerAndVideoUrl = async (question: string)=> {
    const formData = new FormData();
    formData.append("problem", question);
    const response = await fetch("http://127.0.0.1:8000/generate-animation/",{
        method: "POST",
        body: formData
    });
    const data = await response.json();
    return {answer: data?.answer, videoUrl: data?.video_url};
}