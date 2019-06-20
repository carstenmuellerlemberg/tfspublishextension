

## Welcome to MyAppCI

The task extension supports mobile app uploads to MyAppCI mobile application lifecycle management.

See: https://myappci.com

 
Integrate the task into you mobile app pipeline.

## Specify the Task Parameters:

 

**Branchname/Branchid:**

 
The id of your CI branch maintained in MyAppCI (requireds a professional subscription).

  
**API Key:**

The API key of your CI branch.


**Filename:**

The filename of your APK or IPA file including the file path. Use Azure DevOps variables to ensure to locate the file in the right path on the build agent.

e.g.

$(Build.Repository.LocalPath)/myapp.apk or
$(Build.Repository.LocalPath)/myapp.ipa

 
## Prerequisuites Task Variable:

The version variable needs to be set by your build pipeline and must  be increased with every build/upload.

e.g:

version: 1.2.4