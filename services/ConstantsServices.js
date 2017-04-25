/*
    This Service is responsible for holding important URLs for request, In other systems this
    could be different, Like if we have admin and regular user we would divide this service to
    two files.
 */

angular.module("app").service('Constants', function () {

    this.getEmbeddedURL = function () {
        return "https://www.youtube.com/embed/";
    };

    this.getChannelURL = function () {
        return 'https://www.googleapis.com/youtube/v3/channels';
    };

    this.getPlayListItemsURL = function () {
        return 'https://www.googleapis.com/youtube/v3/playlistItems';
    };

    this.getVideosURL = function () {
        return 'https://www.googleapis.com/youtube/v3/videos';
    };
});