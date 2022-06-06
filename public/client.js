window.onload = () => {
    const uplaodButton = document.getElementById('uploadButton');
    const downloadButton = document.getElementById('downloadButton');
    //const imgName = document.getElementById('imgName').value;


    uplaodButton.addEventListener('click', () => fileUpload(), false);
    downloadButton.addEventListener('click', () => fileDownload(), false);

    async function fileUpload() {
        let formData = new FormData();
        formData.append("fileupload", fileupload.files[0]);
        await fetch('http://localhost:3000/api/images/upload', {
            method: "POST",
            body: formData
        });

        console.log('upload complete');
    }

    async function fileDownload() {
        try {
            const imgName = document.getElementById('imgName').value;
            let response = await fetch(`http://localhost:3000/api/images/download/${imgName}`, {
                method: "GET"
            });

            let myImage = document.getElementById('downloadedImage');
            let imgData = await response.blob();
            let objectURL = URL.createObjectURL(imgData);
            myImage.src = objectURL;
        }

        catch(err) {
            console.log(err)
        }
    }
}
