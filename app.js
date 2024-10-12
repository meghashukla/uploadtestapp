import * as AWS from "@aws-sdk/client-s3";

// AWS.config.region = 'us-east-1';
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:ab7fa22d-c672-4c69-9911-e9aa843ec2d7'
// });

// Create an S3 client
const s3 = new AWS.S3({ region: "REGION" });

document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const key = `nov-24/${file.name}`;
    const params = {
        Bucket: 'uploadimagesfromuser',
        Key: key,
        Body: file
    };

    s3.putObject(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            alert('An error occurred while uploading the file.');
        } else {
            console.log('File uploaded successfully:', data);
            alert('File uploaded successfully!');
        }
    });
});