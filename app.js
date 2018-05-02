$(function () {

    let ViewModel = function () {

        let self = this;
        this.name = ko.observable();
        this.resultControl = ko.observable("隐藏搜索结果");

        this.search = function () {
            if (self.name()) {
                placeSearch.clear();//清空上一次搜索记录
                //关键字查询
                placeSearch.search(self.name(), function(status, result) {
                    if (status === 'complete') {
                        $result.css('display','block')
                    }
                });
            }
        }

        let $poiInfo = $('#poiInfo');
        let $result = $('.result');

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
    }

    ko.applyBindings(new ViewModel());
})