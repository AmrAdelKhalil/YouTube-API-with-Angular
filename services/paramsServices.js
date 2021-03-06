/*
    This service is responsible for returning objects of parameters for requests.
 */

angular.module("app").service('Params', function () {

    this.getChannelParams = function (channelId) {
        return {
            key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
            part: 'contentDetails',
            fields: 'items/contentDetails/relatedPlaylists/uploads',
            id: channelId
        };
    };

    this.getVideosParams = function (youTubeUploads, currentPageToken) {
        return {
            key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
            maxResults: '12',
            pageToken: currentPageToken,
            part: 'snippet',
            fields: 'nextPageToken,prevPageToken,items/snippet/publishedAt,items/snippet/title,items/snippet/description,items/snippet/thumbnails/medium,items/snippet/thumbnails/high,items/snippet/resourceId/videoId',
            playlistId: youTubeUploads
        };
    };

    this.getSingleVideoParams = function (videoId) {
      return {
          key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
          maxResults: '1',
          part: 'statistics,contentDetails',
          fields: 'items/statistics/viewCount,items/statistics/likeCount,items/contentDetails/duration',
          id: videoId
      };
    };

});