The task extension support mobile app uploads to MyAppCI moobile application lifecycle management.
See: https://myappci.com


Integrate the task into you mobile app pipeline.

Specify the parameters:

Task parameters:

Branchname/Branchid:

The id of your CI branch maintained in MyAppCI (required a professional subscription)0.

API Key:

The API key of your CI branch.

Filename:

The filename of your APK or IPA file including the file path.
E.g.
$(Build.Repository.LocalPath)/1.a


Prerequisuites Task variable:
The version variable needs to be set by your build pipeline and needs to be increased with every upload.

e.g:
version: 1.2.4
