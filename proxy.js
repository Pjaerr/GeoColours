'use strict';

//NPM Imports
const request = require('request');
const express = require('express');
const path = require('path');

//Express Instance
const app = express();

const withLogging = false;

/*
    Where the static content lives. (/YOURDIRECTORY/index.html) 
    ! Do not leave a trailing forward slash. 
*/
const contentDirectory = "/build";

/** 
 * Serves a static index.html file from within a given content directory whenever the domain
 * this script is running on is requested. Anything after the first forward slash (127.0.0.1/THISSTUFFHERE)
 * will be ignored and re-sent back to the given index.html file within the contentDirectory unless
 * it is given a url via (127.0.0.1/?url=URLHERE), in which case it will reverse proxy that url so that
 * the content is on the same domain so as to avoid the CORS issue. 
 * 
 * This works well for grabbing images that have CORS enabled and it is its intended purpose but it
 * will also load webpages if given the url.
*/
app.get('/', function (req, res)
{
    let invalidUrl = false;

    if (withLogging)
        console.log("\n\nGetting resource at: " + req.url + "\n\n");

    if (req.url.substr(0, 6) === "/?url=")
    {
        let url = req.url.replace('/?url=', '');

        if (req.url.substr(6, 8) !== "https://")
        {
            if (req.url.substr(6, 7) !== "http://")
            {
                if (withLogging)
                    console.error("\n\nproxy.js: Invalid URL\n\n");

                invalidUrl = true;
            }
        }

        if (!invalidUrl)
        {
            req.pipe(request(url)).pipe(res);
        }
    }
    else
    {
        app.use(express.static(path.join(__dirname, contentDirectory)));

        res.sendFile(path.join(__dirname + contentDirectory + '/index.html'));
    }

    invalidUrl = false;
});

app.listen(process.env.PORT || 3000);



