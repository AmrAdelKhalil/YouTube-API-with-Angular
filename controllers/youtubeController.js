angular.module("app").controller('youtubeController', function($scope,$http,$sce, Filter,Params,Constants) {

    $scope.channel = {
        youtubeUploads: '',
        channelId: '',
        channelLink: ''
    };
    $scope.selectedVideo = {
        videoId: '',
        mediumQuality: '',
        highQuality: '',
        completeURL: ''
    };
    $scope.tokens = {
        nextPage: '',
        prevPage: '',
        currentPage: ''
    };
    $scope.videos;
    $scope.numberOfVideos;
    $scope.pageNumber;

    $scope.selectVideo = function(videoId, mediumQuality, highQuality){
        $scope.selectedVideo.videoId = videoId;
        $scope.selectedVideo.mediumQuality = mediumQuality;
        $scope.selectedVideo.highQuality = highQuality;
        $scope.selectedVideo.completeURL = $sce.trustAsResourceUrl(Constants.getEmbeddedURL()+
            ""+ videoId
        )
    };

    $scope.getYoutubeChannelData = function(newChannel){

        if(newChannel == true){
            $scope.tokens.currentPage = '';
            $scope.pageNumber = 1;
        }

        $scope.channel.channelId = Filter.filterChannelUrl($scope.channel.channelLink);

        $http.get(Constants.getChannelURL(), {
            params: Params.getChannelParams($scope.channel.channelId)
        }).success( function (data) {
            if (data.items.length != 0) {
                $scope.channel.youtubeUploads = data.items[0].contentDetails.relatedPlaylists.uploads;
                $scope.getAllVideos();
            }
        }).error( function(e){
            console.log('Channel data provided is not correct');
        });
    };

    $scope.getAllVideos = function () {
        $http.get(Constants.getPlayListItemsURL(), {
            params: Params.getVideosParams($scope.channel.youtubeUploads, $scope.tokens.currentPage)
        }).success( function (data) {
            $scope.videos = data.items;
            $scope.tokens.nextPage = (data.nextPageToken)?data.nextPageToken:'';
            $scope.tokens.prevPage = (data.prevPageToken)?data.prevPageToken:'';
            $scope.numberOfVideos = $scope.videos.length;

            for(var i = 0 ; i < $scope.videos.length; i++){
                $scope.getMoreDetails(i);
            }
            $scope.selectVideo($scope.videos[0].snippet.resourceId.videoId,
                $scope.videos[0].snippet.thumbnails.medium.url,
                $scope.videos[0].snippet.thumbnails.high.url);
        }).error( function(e){
            console.log('Video data provided is not correct');
        });
    };

    $scope.getMoreDetails = function (index) {
        $http.get(Constants.getVideosURL(), {
            params: Params.getSingleVideoParams($scope.videos[index].snippet.resourceId.videoId)
        }).success( function (data) {
            $scope.videos[index].likeCount = data.items[0].statistics.likeCount;
            $scope.videos[index].viewCount = data.items[0].statistics.viewCount;
            $scope.videos[index].duration = Filter.filterDuration(data.items[0].contentDetails.duration);
        }).error( function(e){
            console.log('Video data provided is not correct');
        });
    };

    $scope.download = function (url) {
        $http.post("https://i.ytimg.com/vi/TfKrNGv5Ajw/mqdefault.jpg",{
            AccessControlAllowOrigin: '*',
            key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ"
        }).success( function (data) {
            console.log(data);
        });
    };

    $scope.nextPage = function () {
        if($scope.tokens.nextPage != ''){
            $scope.tokens.currentPage = $scope.tokens.nextPage;
            $scope.pageNumber++;
            $scope.getYoutubeChannelData(false);
        }
    };

    $scope.prevPage = function () {
        if($scope.tokens.prevPage != ''){
            $scope.tokens.currentPage = $scope.tokens.prevPage;
            $scope.pageNumber--;
            $scope.getYoutubeChannelData(false);
        }
    }

    $scope.init = function () {
        $scope.channel.channelLink='https://www.youtube.com/channel/UCQ5kHOKpF3-1_UCKaqXARRg';
        $scope.pageNumber = 1;
        $scope.getYoutubeChannelData();
    };

    $scope.init();
});

