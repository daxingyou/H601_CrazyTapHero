var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author
     *
     */
    var MovieClip = (function () {
        //        private onCallBack :Function = null;
        function MovieClip(_image, _list, _rate) {
            this.i = 0;
            this.image = _image;
            this.rate = _rate;
            this.list = _list;
        }
        MovieClip.prototype.play = function (_onCallBack) {
            var _this = this;
            egret.setTimeout(function () {
                var a = _onCallBack;
                _this.image.source = _this.list[_this.i];
                _this.i++;
                if (_this.i < _this.list.length) {
                    _this.play(_onCallBack);
                }
                else {
                    _this.image.source = null;
                    if (_onCallBack != null) {
                        _onCallBack();
                    }
                }
            }, this, 1000 / this.rate);
        };
        return MovieClip;
    }());
    Model.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "Model.MovieClip");
})(Model || (Model = {}));
//# sourceMappingURL=MovieClip.js.map