{
    // New Game-Level Variables
    const takePhotoButton = document.querySelector('.takePhoto');
    let video;
    let mediaStream;
    let imageCapture;

    const init = () => {
        video = document.querySelector('video');
        navigator.mediaDevices.enumerateDevices()
            .catch(error => console.log('enumerateDevice() error: ', error))
            .then(getStream);
        takePhotoButton.addEventListener('click', getPicture);
    }

    // Get a video stream from the camera
    const getStream = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        constraints = {
            video: {
                width: 720,
                height: 720,
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .error((error) => console.log('getUserMedia() error:**', error))
            .then(gotStream);
    };

    // Display the stream from the camera, and then
    // create an ImageCapture object, using video from the stream
    const gotStream = stream => {
        mediaStream = stream;
        video.srcObject = stream;
        imageCapture = new imageCapture(stream.getVideoTracks()[0]);
    };

    // Take the picture
    const getPicture = () => {
        imageCapture.takePhoto()
            .then((img) => {
                image.src = URL.createObjectURL(img);
                image.addEventListener('load', () => createImagePieces(image));
                setInterval(() => checkDistance(), 1000);
            })
            .catch((error) => {console.log('takePhoto() error', error)});
    };

    const createImagePieces = (image) => {};
    const checkDistance = () => {};

    window.addEventListener('load', () => setTimeout(() => init(), 1000));

}