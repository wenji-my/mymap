
let locationData = [{
    id: "B000A8URXB",
    latitude: "39.989684",
    longitude: "116.480989",
    name: "北京方恒假日酒店"
}, {
    id: "B000A1853E",
    latitude: "39.988911",
    longitude: "116.479856",
    name: "国际竹藤大厦"
}, {
    id: "B0FFFAJYRZ",
    latitude: "39.987037",
    longitude: "116.480026",
    name: "北京东煌酒店"
}, {
    id: "B000A8WBH7",
    latitude: "39.988377",
    longitude: "116.481239",
    name: "北京望京798和颐酒店"
}, {
    id: "B000A8WAXF",
    latitude: "39.989759",
    longitude: "116.476689",
    name: "宏悦酒店"
}];

let map,infoWindow;

function init() {
    map = new AMap.Map('map',{
        zoom:15,
        center: [116.480989, 39.989759]
    });
    ko.applyBindings(new ViewModel());
}

let ViewModel = function () {

    let self = this;
    self.query = ko.observable('');
    self.locations = ko.observableArray();
    self.resultControl = ko.observable("隐藏搜索结果");

    let $result = $('.result');
    let $poiInfo = $('.poiInfo');

    locationData.forEach(function (data) {
        let location = {};
        let latLng = new AMap.LngLat(Number(data.longitude),Number(data.latitude));

        // 创建 marker
        let marker = new AMap.Marker({
            position: latLng,
            title: data.name,
            clickable: true,
            map: map
        });

        infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        marker.content = data.name;
        marker.on('click',markerClick);

        function markerClick(e) {
            marker.setAnimation("AMAP_ANIMATION_BOUNCE");
            setTimeout(function() {
                marker.setAnimation(null);
            }, 2400);
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }

        location.marker = marker;
        location.name = data.name;
        location.latLng = latLng;
        // 将 marker name latLng 保存到 locations 地点信息内
        self.locations.push(location);
    });

    // 过滤左侧列表以及右侧地图 markers
    self.filteredLocations = ko.computed(function() {
        // 如果 input 没有输入
        if (!self.query()) {
            showResult();
            self.locations().forEach(function(lcoation) {
                lcoation.marker.show();
            });
            return self.locations();
        } else {
            let data = self.locations().filter(function(location) {
                // 输入框匹配条件
                let matched = location.name.indexOf(self.query()) !== -1;
                if (matched) {
                    location.marker.show();
                } else {
                    location.marker.hide();
                }
                return (matched);
            });
            if (data.length === 0) {
                hideResult();
            } else {
                showResult();
            }
            return data;
        }
    })

    //展开/隐藏搜索结果
    $result.click(function () {
        let resHeight = $poiInfo.css('display');
        if (resHeight !== 'none') {
            $poiInfo.css('display','none');
            self.resultControl('展开搜索结果')
        } else {
            $poiInfo.css('display','block');
            self.resultControl('隐藏搜索结果')
        }
    })

    function showResult() {
        $result.css('display','block');
    }

    function hideResult() {
        $result.css('display','none');
    }
}
