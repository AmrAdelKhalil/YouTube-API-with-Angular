Project structure:

|---controllers
|   |---youtubeController.js
|---css
|   |---style.css
|---dependencies
|   |---ngclipboard.min.js
|---img
|   |---img.jpg
|   |---glyphicons-224-chevron-right.png
|   |---glyphicons-225-chevron-left.png
|---services
|   |---ConstantsServices.js
|   |---filterServices.js
|   |---paramsServices.js
|---templates
|   |---navbar.html
|---app.js
|---index.html
|---README.txt

-------------------------------------------

Used dependencies, frameworks and environment

1- ngclipboard: {
    notes: 'I used it to make copy button works correctly.'
}

2- bootstrap: {
    version: '1.1.1',
    notes: 'you need to be connected to the internet, I'm using maxcdn to include it',
    source: 'https://sachinchoolur.github.io/ngclipboard/'
}

3- AngularJS: {
    version: '1.4.8',
    notes: 'you need to be connected to the internet'
}

4- CSS: {
    notes: 'I need to add my own style to some component.'
}

5- Environment: {
    Editor: 'WebStorm',
    OS: 'Ubuntu 14.04',
    Virsion Control: 'github'
    github url: 'https://github.com/AmrAdelKhalil/YouTube-API-with-Angular'
}

-------------------------------------------

Tasks

    1- Main:
        1.1- Implement the design of the webpage attached below, status: done
        1.2- Use JavaScript to integrate with YouTube official API to retrieve the list of videos from a
             specific YouTube channel, status: done
        1.3- Show the list of videos in the table. For each video, display
             a. Title, status: done
             b. Upload date, status: done
             c. Duration, status: done
             d. # of likes, status: done
             e. # of views, status: done
             f. Description, status: done
        1.4- If any video is selected, the right side column is populated with details of the video, status: done
        1.5- The right side column shows:
             a. Embedded YouTube player to playback the video, status: done
             b. Links for thumbnails of the videos (Medium quality, and High quality), and an
             option to download them, status: only copy

    2- Bouns:
        2.1- Add a text box on the top, to set the channel identifier and reload the table, status: done
        2.2- Implement paging in the videos table, status: done

-------------------------------------------

General notes:

In the download part i tried to send a GET request using the thumbnail url but it says that my local server
is not allowed to do this request because CORS, When i searched about it i found some links says that i can not
test downloading using local server and this issue is in Chrome itself.

some links taking about similar issues:

1- https://bugs.chromium.org/p/chromium/issues/detail?id=67743
2- http://stackoverflow.com/questions/16930473/angularjs-factory-http-get-json-file

