angular.module("app").service('Params', function () {

    this.getChannelParams = function (channelId) {
        return {
            key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
            // pageToken: $scope.nextPage ? $scope.nextPage : '',
            part: 'contentDetails',
            fields: 'items/contentDetails/relatedPlaylists/uploads',
            id: channelId
        };
    };

    this.getVideosParams = function (youTubeUploads) {
        return {
            key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
            maxResults: '12',
            // pageToken: $scope.nextPage ? $scope.nextPage : '',
            part: 'snippet',
            fields: 'items/snippet/publishedAt,items/snippet/title,items/snippet/description,items/snippet/thumbnails/medium,items/snippet/thumbnails/high,items/snippet/resourceId/videoId',
            playlistId: youTubeUploads
        };
    };

    this.getSingleVideoParams = function (videoId) {
      return {
          key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
          maxResults: '1',
          // pageToken: $scope.nextPage ? $scope.nextPage : '',
          part: 'statistics,contentDetails',
          fields: 'items/statistics/viewCount,items/statistics/likeCount,items/contentDetails/duration',
          id: videoId
      };
    };

});