var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @date: 2016.02.03.
     * @怪物动态信息，在SceneData.
     */
    var MonsterData = (function () {
        function MonsterData(_st) {
            this.st = _st;
        }
        Object.defineProperty(MonsterData.prototype, "IdleJson", {
            /**
             * @待机动画json文件.
             */
            get: function () {
                return String("monster_00" + this.st.pic + "_idle_json");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "IdlePng", {
            /**
             * @待机动画png文件.
             */
            get: function () {
                return String("monster_00" + this.st.pic + "_idle_png");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "Idle", {
            /**
             * @待机动画名称.
             */
            get: function () {
                return String("monster_00" + this.st.pic + "_idle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "HitJson", {
            /**
             * @受击动画json文件.
             */
            get: function () {
                return String("monster_00" + this.st.pic + "_gethit_json");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "HitPng", {
            /**
             * @受击动画png文件.
             */
            get: function () {
                return String("monster_00" + this.st.pic + "_gethit_png");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "Hit", {
            /**
             * @受击动画名称.
             */
            get: function () {
                return String("monster_00" + this.st.pic + "_gethit");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "AddHp", {
            /**
             * @怪物血量设置.
             */
            set: function (_value) {
                this.hp += _value;
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: this.hp += _value  " + this.hp);
                }
                if (this.hp < 0) {
                    this.hp = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "HpAndUnit", {
            /**
             * @带单位怪物血量.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hp);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "HpMaxAndUnit", {
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hpMax);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "DropMoneyAndUnit", {
            /**
             * @带单位怪物金币掉落数量.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.dropMoney);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "MonsterType", {
            /**
             * @怪物类型.
             */
            get: function () {
                return Model.MonsterType[this.st.monsterType];
            },
            enumerable: true,
            configurable: true
        });
        return MonsterData;
    }());
    Model.MonsterData = MonsterData;
    __reflect(MonsterData.prototype, "Model.MonsterData");
})(Model || (Model = {}));
//# sourceMappingURL=MonsterData.js.map