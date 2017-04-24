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