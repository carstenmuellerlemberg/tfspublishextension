import tl = require('azure-pipelines-task-lib/task');
import { createReadStream } from "fs";
import request = require('request');
const FormData = require('form-data');

async function run() {
    try {
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

        let filepath: string = tl.getInput('filepath', true);
        if (filepath === "filepathrelative") {
            tl.setResult(tl.TaskResult.Failed, 'Missing filepath');
            return;
        }

        if (!tl.exist( filepath )) {
            console.error("File not found", filepath);
            tl.setResult(tl.TaskResult.Failed, 'File not found');
            return;
        }
        
        const version = tl.getVariable("version");
        console.info(`Processing version: ${version}`);

        const readStream = createReadStream(filepath);
      
        const formData = {
            branch: branchname,
            apikey: apikey,
            app:  readStream,
            version
        };
    
     
        request.post({url:'https://myappci.com/api/ci', formData,  timeout: 1200000,}, function optionalCallback(err: any, httpResponse: any, body: any) {
            if (err) {
              return console.error('upload failed:', err);
            }
            if ( httpResponse.statusCode === 200) {
                if (body === "Conflict") {
                    tl.setResult(tl.TaskResult.Failed, 'Version conflict. Version needs to be increased within a branch');
                    return;
                } else {
                    tl.setResult(tl.TaskResult.Succeeded, `Upload successfull to branch: ${branchname}`);
                    return;
                }
            }
            if (httpResponse.statusCode === 403) {
                tl.setResult(tl.TaskResult.Failed, `Access denied to branch: ${branchname}`);
            }
         });

        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
}

run();
