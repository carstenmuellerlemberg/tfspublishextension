import tl = require('azure-pipelines-task-lib/task');
import { createReadStream } from "fs";
import request = require('request');
const FormData = require('form-data');

async function run() {
    try {
        console.log('Path', __dirname );
        const branchname: string = tl.getInput('branchid', true);
        if (branchname.match("^[a-zA-Z0-9.]+$") === null) {
            tl.setResult(tl.TaskResult.Failed, 'Invalid branch id');
            return;
        }
        const apikey: string = tl.getInput('apikey', true);
        if (apikey === "") {
            tl.setResult(tl.TaskResult.Failed, 'Missing api key');
            return;
        }

        const filepath: string = tl.getInput('filepath', true);
        if (filepath === "filepathrelative") {
            tl.setResult(tl.TaskResult.Failed, 'Missing filepath');
            return;
        }
        const filePath = __dirname + "\\" +filepath;

        if (!tl.exist( filePath )) {
            console.error("File not found", filePath);
            tl.setResult(tl.TaskResult.Failed, 'File not found');
            return;
        }

        const version = tl.getVariable("version");

        const readStream = createReadStream(filePath);
      
        const formData = {
            branch: branchname,
            apikey: apikey,
            app:  readStream,
            version: "1.1.2"
        };
    
     
        request.post({url:'http://localhost:8080/api/ci', formData}, function optionalCallback(err: any, httpResponse: any, body: any) {
            if (err) {
              return console.error('upload failed:', err);
            }
            if (body === "Conflict") {
                console.log('Version conflict. Version needs to be increased within a branch');
            } else {
                console.log('Upload successful!  Server responded with:', body);
            }
         });

        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
}

run();
