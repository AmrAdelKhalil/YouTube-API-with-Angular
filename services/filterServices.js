/*
    This Service is responsible for doing filtering tasks.
 */
angular.module("app").service('Filter', function () {

    this.filterChannelUrl = function (url) {
        var channelId = "", slashCounter = 0;
        for(var i = 0 ; i< url.length; i++) {
            if(url[i] == '/' && slashCounter < 4){
                slashCounter++;
            }else if(slashCounter >= 4){
                channelId = channelId + url[i];
            }
        }
        return channelId;
    };

    this.filterDuration = function (duration) {

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
            var strLength = neededFormat.length + leadingZeros.length;

            while (strLength != 8){

                if(strLength == 2 || strLength == 5){
                    leadingZeros = ':' + leadingZeros;
                }else{
                    leadingZeros = '0' + leadingZeros;
                }
                strLength = neededFormat.length + leadingZeros.length;
            }
            neededFormat = leadingZeros + neededFormat;
        }
        return neededFormat;
    };

});