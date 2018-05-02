AMapUI.loadUI(['misc/PositionPicker','misc/PoiPicker'], function(PositionPicker,PoiPicker) {

})

let cityObj;

let placeSearch;
function init() {
    let map = new AMap.Map('map', {
        zoom:11,
        resizeEnable: true
    });

    map.plugin(["AMap.ToolBar"], function() {
        // 添加 工具条
        map.addControl(new AMap.ToolBar({
            liteStyle: true
        }));
    });

    map.getCity(function (result) {
        cityObj = result;
        AMap.service('AMap.PlaceSearch',function(){//回调函数
            //实例化PlaceSearch
            placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 5,
                pageIndex: 1,
                city: cityObj.citycode, //城市
                map: map,
                panel: "poiInfo"
            });
        })
    })

// 加载定位插件，实现定位功能
    AMap.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野s内可见，默认：false
        });
        console.log(geolocation)
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });


    function onComplete(data) {
    }

    function onError(data) {
        console.log(data)
    }
}

