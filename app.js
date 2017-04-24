var app = angular.module("app",[]);

app.controller('youtubeController', function($scope,$http,$filter,$sce) {
    $scope.youtubeUploads;
    $scope.videos;
    $scope.channelId = "";
    $scope.headForVideo;
    $scope.nextPage = "";
    $scope.youtubeSearchText = "";
    $scope.channelLink="";

    $scope.filterChannelUrl = function () {
        var channelId = "", slashCounter = 0;
        for(var i = 0 ; i< $scope.channelLink.length; i++) {
            if($scope.channelLink[i] == '/' && slashCounter < 4){
                slashCounter++;
            }else if(slashCounter >= 4){
                channelId = channelId + $scope.channelLink[i];
            }
        }
        return channelId;
    };

    $scope.getYoutubeData = function(){

        $scope.channelId = $scope.filterChannelUrl($scope.channelLink);
        // console.log($scope.channelId);
        // console.log($scope.channelLink);

        $http.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
                pageToken: $scope.nextPage ? $scope.nextPage : '',
                part: 'contentDetails',
                fields: 'items/contentDetails/relatedPlaylists/uploads',
                id: $scope.channelId
            }
        }).success( function (data) {
            if (data.items.length === 0) {
                $scope.youtubeUploads = 'No results were found!';
            }
            $scope.youtubeSearchText = $scope.channelLink;
            $scope.youtubeUploads = data.items[0].contentDetails.relatedPlaylists.uploads;
            $scope.getAllVideos();
            // console.log(data);
            console.log($scope.youtubeUploads);
        }).error( function(e){
            console.log('something wrong');
        });
    };

    $scope.getAllVideos = function () {
        $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {
            params: {
                key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
                maxResults: '10',
                pageToken: $scope.nextPage ? $scope.nextPage : '',
                part: 'snippet',
                fields: 'items/snippet/publishedAt,items/snippet/title,items/snippet/description,items/snippet/thumbnails/medium,items/snippet/thumbnails/high,items/snippet/resourceId/videoId',
                playlistId: $scope.youtubeUploads
            }
        }).success( function (data) {
            $scope.videos = data.items;
            // console.log($scope.videos[0]);
            for(var i = 0 ; i < $scope.videos.length; i++){
                $scope.getMoreDetails(i);
            }
            // console.log($scope.videos);
        }).error( function(e){
            console.log('something wrong in getting videos');
        });
    };

    $scope.getMoreDetails = function (index) {
        $http.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                key: "AIzaSyAZNHm0VzKP-TiDQ9IeSSPvGoipZ2s5znQ",
                maxResults: '1',
                pageToken: $scope.nextPage ? $scope.nextPage : '',
                part: 'statistics,contentDetails',
                fields: 'items/statistics/viewCount,items/statistics/likeCount,items/contentDetails/duration',
                id: $scope.videos[index].snippet.resourceId.videoId
            }
        }).success( function (data) {
            $scope.videos[index].likeCount = data.items[0].statistics.likeCount;
            $scope.videos[index].viewCount = data.items[0].statistics.viewCount;
            $scope.videos[index].duration = $scope.filterDuration(data.items[0].contentDetails.duration);

            // $scope.headForVideo = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"
            //     + $scope.videos[0].snippet.resourceId.videoId
            // )
            // $scope.headForVideo = $scope.videos[0].snippet.resourceId.videoId;
            // console.log($scope.headForVideo);
        }).error( function(e){
            console.log('something wrong in getting more details');
        });
    };

    $scope.checkDataLength = function(data){
        return (data.length >=1);
    };

    $scope.callNextPageFn = function(nextPage){
        $scope.nextPage = nextPage;
        $scope.getYoutubeData($scope.youtubeSearchText);
    };

    $scope.filterDuration = function (duration) {

        var neededFormat = "", numbersHolder = "";

        for(var i = 2; i < duration.length; i++){
            if(duration[i] >= '0' && duration[i] <= '9'){
                numbersHolder += duration[i];
            }else{
                if(numbersHolder.length < 2){
                    neededFormat = neededFormat + '0' + numbersHolder;
                }else if(numbersHolder.length == 2){
                    neededFormat = neededFormat + numbersHolder;
                }

                if(duration[i] != 'S'){
                    neededFormat += ':';
                }
                numbersHolder="";
            }
        }

        if(neededFormat.length < 8){
            var leadingZeros = "";
            while (neededFormat.length + leadingZeros.length != 8){
                if(neededFormat.length + leadingZeros.length == 2
                    || neededFormat.length + leadingZeros.length == 5){
                    leadingZeros = ':' + leadingZeros;
                }else{
                    leadingZeros = '0' + leadingZeros;
                }
            }
            neededFormat = leadingZeros + neededFormat;
            // console.log(neededFormat);
        }
        return neededFormat;
    };
});

//,snippet,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken,prevPageToken
 // AIzaSyB6gTh61IDp9osagdfV4AwXBo91vPAMF2c
