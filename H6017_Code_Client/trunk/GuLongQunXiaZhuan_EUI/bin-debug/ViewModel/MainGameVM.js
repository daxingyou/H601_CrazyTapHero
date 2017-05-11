var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var Camp;
    (function (Camp) {
        Camp[Camp["Player"] = 0] = "Player";
        Camp[Camp["Opponent"] = 1] = "Opponent";
    })(Camp = ViewModel.Camp || (ViewModel.Camp = {}));
    var MainGameVM = (function (_super) {
        __extends(MainGameVM, _super);
        function MainGameVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @敌人待机对象.
             */
            _this.enemy = null;
            /**
             * @扣血标示
             * @by cai_haotian 2016.3.8
             */
            _this.cutFlag = true;
            /**
             * @作弊标示
             * @by cai_haotian 2016.3.9
             */
            _this.cheatFlag = true;
            /**
             * @点击频率计数
             * @by cai_haotian 2016.3.8
             */
            _this.clickFrequence = 0;
            /**
             * @挚友的播放帧率
             */
            _this.friendFrameRate = 0;
            /**
             * @自动提交数据标示
             * @by cai_haotian 2016.3.30
             */
            _this.commitFlag = 0;
            _this.skinName = View.MainGameView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChildAt(_this, 0);
            return _this;
        }
        MainGameVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //            var audio: Model.AudioService = new Model.AudioService("bgm-003_mp3",() => { },-1);
            Model.AudioService.Shared().PlayBGM("bgm-003_mp3");
            egret.Ticker.getInstance().register(function (advanceTime) {
                dragonBones.WorldClock.clock.advanceTime(advanceTime / 1000);
            }, this);
            this.initSceneInfo();
            this.initPlayer();
            this.initFriend();
            this.initEnemy();
            this.initCheatingDetection();
            this.shockTool = new Model.ShockTools();
            this.clickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
        };
        /**
         * @初始化监听是否作弊
         * @by cai_haotian 2016.3.9.
         */
        MainGameVM.prototype.initCheatingDetection = function () {
            var _this = this;
            var detection = egret.setInterval(function () {
                if (Model.MainLocalService.cheatingDetection(_this.clickFrequence)) {
                    Main.singleton.mainMenuVM.offLineGroup.visible = true;
                    _this.cheatFlag = false;
                    egret.clearInterval(detection);
                }
                _this.clickFrequence = 0;
            }, this, 1000);
        };
        /**
         * @初始化场景信息界面.
         */
        MainGameVM.prototype.initSceneInfo = function () {
            this.sceneInfo.giftBag.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                alert("此功能2016.1.8.之后开发!");
            }, this);
            this.changeScene();
        };
        /**
         * @初始化玩家角色.
         */
        MainGameVM.prototype.initPlayer = function () {
            this.initPlayerIdle();
        };
        /**
         * @初始挚友.
         */
        MainGameVM.prototype.initFriend = function () {
            var _this = this;
            var fDatas = Model.FriendLocalService.FriendList;
            var hadFDatas = Enumerable.From(fDatas).Select(function (x) {
                if (x.dy != null) {
                    _this.switchFriend(x);
                    return x;
                }
            }).ToArray();
            this.onDpsEvent();
        };
        /**
         * @初始化敌人角色.
         */
        MainGameVM.prototype.initEnemy = function () {
            this.enemy = new ViewModel.HeroItemVM(this.enemyGroup);
            this.enemy.initMovieClip(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].IdleJson, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].IdlePng, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Idle);
        };
        /**
         * @点击按钮事件.
         */
        MainGameVM.prototype.onClickBtn = function (evt) {
            this.clickFrequence++;
            this.clickEffect(evt);
            /*NOTE: 如果需要改成只出一个云歌点击特效，则解开注释.
            for(var i = this.yungeClickEffectGroup.numChildren ; i > 0 ; i--){
                this.yungeClickEffectGroup.getChildAt(i-1).visible = false;
            }*/
            if (this.yungeGroup.numChildren > 1) {
                this.yungeGroup.removeChildAt(1); //强制删除1号位云歌攻击动画.movieClip被移除，正常回调的事件监听也就没有了.
            }
            this.initPlayerAttack(); //主角攻击,隐藏待机,回调关攻击,显示待机.
            //            var audio: Model.AudioService = new Model.AudioService(Model.PlayerLocalService.PlayerData.st.playerAttackAudio);//主角音效
            //            Model.AudioService.Shared().SoundSource = Model.PlayerLocalService.PlayerData.st.playerAttackAudio;
            Model.AudioService.Shared().PlaySound(Model.PlayerLocalService.PlayerData.st.playerAttackAudio);
            this.cutHp(true);
        };
        /**
         * @减血事件.
         * @触发点击伤害.
         * @减血.
         * @更新UI
         */
        MainGameVM.prototype.cutHp = function (_isClick) {
            var _this = this;
            if (_isClick === void 0) { _isClick = false; }
            if (this.cutFlag && this.cheatFlag) {
                this.cutHpAnim(_isClick, function (damage) {
                    //by cai_haotian 2016.4.15
                    //设置为false进入正常打怪环节 注：默认就为false
                    if (Model.PlayerLocalService.PlayerData.isChallenge) {
                        //这段作为活动扣血
                        Model.ChallengeLoaclService.challengeBossData.AddHp = -damage;
                        _this.sceneInfo.setChallengeBoss();
                        if (Model.ChallengeLoaclService.challengeBossData.hp <= 0) {
                            _this.enemyKilled(function () {
                                _this.sceneInfo.cBossEvent();
                                //调用挑战成功函数
                                Model.ChallengeLoaclService.successBack(Model.ChallengeLoaclService.challengeBossData);
                            });
                        }
                    }
                    else {
                        //此段作为正常扣血
                        Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].AddHp = -damage; //model层扣血.
                        _this.sceneInfo.setMonsterHp();
                        if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp <= 0) {
                            _this.enemyKilled(function () {
                                if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                                    _this.sceneInfo.bossDeathEvent();
                                    Model.SceneLocalService.setNextSceneData(); //更新关卡数据.
                                    _this.sceneInfo.setSceneIndex();
                                    _this.changeScene();
                                    Model.MonsterLocalService.setMonsterData();
                                    //保护挚友 by cai_haotian 2016.3.21
                                    if (!Model.PlayerLocalService.PlayerData.protectFriend) {
                                        Model.FriendLocalService.sealFriendAndSkills(); //判断是否触发挚友技能锁定。
                                    }
                                }
                                else {
                                    Model.SceneLocalService.SceneData.currentMonster++;
                                }
                            }); //先死后加index.
                        }
                        else {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("zhujun: monster have been alive ! ");
                            }
                        }
                    }
                });
            }
        };
        /**
         * @改变场景.
         */
        MainGameVM.prototype.changeScene = function () {
            //            //判断当前关卡号.
            //            if(parseInt(Model.SceneLocalService.SceneData.sceneId.sceneId) >= Model.PlayerLocalService.PlayerData.st.startScene){
            //                //TODO:在这里改。
            ////                Model.SceneLocalService.
            //            }
            if (Model.SceneLocalService.SceneData.st.sceneName) {
                var titleMsg = new ViewModel.ScrollMsgVM(this.uiLayer, function (_bUILayer) {
                    _bUILayer.removeChild(titleMsg);
                }, Model.SceneLocalService.SceneData.st.sceneName);
            }
            if (Model.SceneLocalService.SceneData.st.scenePic) {
                this.bg.source = Model.SceneLocalService.SceneData.st.scenePic;
            }
            else {
                var scenePid = Math.ceil(Model.SceneLocalService.SceneData.st.id / 5);
                this.bg.source = "scene_pic_" + scenePid;
            }
        };
        /**
         * @扣血动画.
         */
        MainGameVM.prototype.cutHpAnim = function (_isClick, _onAnimFinish) {
            //飘血动画.
            var cutHpItem = new ViewModel.CutHpItemVM(this);
            var critFactor = Model.Mathf.random(0, 100);
            var damage = 0;
            if (_isClick) {
                if (critFactor <= Model.PlayerLocalService.PlayerData.CritRate) {
                    cutHpItem.y = 230;
                    damage = Model.PlayerLocalService.PlayerData.CritDamage;
                    var damgeUnit = Model.MainLocalService.toUnitConversion(Number(damage));
                    Model.PlayerLocalService.setPerSecondTapDamage(Number(damage));
                    cutHpItem.setCriticalAttack(damgeUnit, damage); //暴击显示
                    this.shockTool.shock(this, 3);
                }
                else {
                    cutHpItem.y = 300;
                    damage = Model.PlayerLocalService.PlayerData.dy.clickDamage;
                    var damgeUnit = Model.MainLocalService.toUnitConversion(Number(damage));
                    Model.PlayerLocalService.setPerSecondTapDamage(Number(damage));
                    cutHpItem.setNoramlAttack(damgeUnit, damage); //普通攻击
                }
                cutHpItem.x = 480 - cutHpItem.width / 2;
            }
            else {
                cutHpItem.y = 300;
                damage = Model.PlayerLocalService.PlayerData.dy.friendDamage;
            }
            _onAnimFinish(damage);
        };
        /**
         * 点击特效
         */
        MainGameVM.prototype.clickEffect = function (evt) {
            var _this = this;
            this.tapEffect.x = evt.stageX - this.tapEffect.width / 2;
            this.tapEffect.y = evt.stageY - this.tapEffect.height / 2;
            this.tapEffect.visible = true;
            egret.setTimeout(function () {
                _this.tapEffect.visible = false;
            }, this, 80);
        };
        /**
         * @秒伤监听事件.(初始化完挚友执行.)
         */
        MainGameVM.prototype.onDpsEvent = function () {
            var _this = this;
            this.cutHp(false);
            egret.setTimeout(function () {
                _this.onDpsEvent();
            }, this, 1000 - Model.PlayerLocalService.PlayerData.friendFrameRate);
        };
        /**
         * @主角待机动画.
         */
        MainGameVM.prototype.initPlayerIdle = function () {
            var yunge = new ViewModel.HeroItemVM(this.yungeGroup);
            yunge.initMovieClip(Model.PlayerLocalService.PlayerData.IdleJson, Model.PlayerLocalService.PlayerData.IdlePng, Model.PlayerLocalService.PlayerData.st.playerIdle);
        };
        /**
         * @主角攻击动画.
         */
        MainGameVM.prototype.initPlayerAttack = function () {
            this.onAttackAnim(this.yungeGroup, [Model.PlayerLocalService.PlayerData.AttackJson, Model.PlayerLocalService.PlayerData.AttackPng, Model.PlayerLocalService.PlayerData.st.playerAttack]);
            this.onAttackEffect(this.yungeClickEffectGroup, [Model.PlayerLocalService.PlayerData.EffectJson, Model.PlayerLocalService.PlayerData.EffectPng, Model.PlayerLocalService.PlayerData.Effect]);
        };
        /**
         * @选择挚友动画
         */
        MainGameVM.prototype.switchFriend = function (_data) {
            switch (_data.dy.friendId) {
                case 1:
                    var baihe = new ViewModel.HeroItemVM(this.baiheGroup);
                    this.friendAnimal(baihe, this.baiheGroup, _data);
                    break;
                case 7:
                    var bingyi = new ViewModel.HeroItemVM(this.bingyiGroup);
                    this.friendAnimal(bingyi, this.bingyiGroup, _data);
                    break;
                case 13:
                    var xupingjun = new ViewModel.HeroItemVM(this.xupingjunGroup);
                    this.friendAnimal(xupingjun, this.xupingjunGroup, _data);
                    break;
                case 19:
                    var mengjue = new ViewModel.HeroItemVM(this.mengjueGroup);
                    this.friendAnimal(mengjue, this.mengjueGroup, _data);
                    break;
                case 25:
                    var liufuling = new ViewModel.HeroItemVM(this.liufulingGroup);
                    this.friendAnimal(liufuling, this.liufulingGroup, _data);
                    break;
                default: ;
            }
        };
        /**
         * @初始化单个挚友动画.
         */
        MainGameVM.prototype.friendAnimal = function (_item, _uiGroup, _data) {
            var _this = this;
            if (_data.dy.sealCD > 0) {
                _uiGroup.visible = false;
            }
            else {
                _uiGroup.visible = true;
            }
            if (_uiGroup.numChildren > 0) {
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: 大于0则是更新挚友，挚友挚友更新的时候才存在现实隐藏 ! ");
                }
                return;
            }
            _item.initMovieClip(_data.IdleJson, _data.IdlePng, _data.st.idle); //待机动画
            egret.setInterval(function () {
                _this.onAttackAnim(_uiGroup, [_data.AttackJson, _data.AttackPng, _data.st.attack], function () {
                    _this.onAttackEffect(_uiGroup, [_data.EffectJson, _data.EffectPng, _data.Effect], function () {
                    });
                });
                Model.AudioService.Shared().PlaySound(_data.st.attackAudio);
            }, this, Model.Mathf.random(Model.PlayerLocalService.PlayerData.st.effectTimeMin * 1000, Model.PlayerLocalService.PlayerData.st.effectTimeMax * 1000));
        };
        /**
         * @播放攻击动画.
         */
        MainGameVM.prototype.onAttackAnim = function (_uiGroup, _data, _onCallBack) {
            _uiGroup.getChildAt(0).visible = false; //重新播放,无论是不是点击,0号位都需要隐藏.
            var item = new ViewModel.HeroItemVM(_uiGroup);
            var mc = item.initMovieClip(_data[0], _data[1], _data[2], 1, function () {
                _uiGroup.getChildAt(0).visible = true;
                _uiGroup.removeChild(item.movieClip);
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: once movie clip call back successed ! ");
                }
            });
            if (Model.PlayerLocalService.PlayerData.friendFrameRate != 0) {
                mc.frameRate = 24 + Model.PlayerLocalService.PlayerData.friendFrameRate;
            }
            mc.once(egret.MovieClipEvent.FRAME_LABEL, function () {
                if (_onCallBack) {
                    _onCallBack();
                }
            }, this);
        };
        /**
         * @攻击特效.
         */
        MainGameVM.prototype.onAttackEffect = function (_uiGroup, _data, _onCallBack) {
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: on attack effect start !  " + JSON.stringify(_data));
            }
            var item = new ViewModel.EffectSkillVM(_uiGroup, function () {
                if (_onCallBack) {
                    _onCallBack();
                }
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: attack effect play finished ! ");
                }
            });
            item.initDragonBone(_data[0], _data[1], _data[2]);
        };
        /**
         * @改变敌人.
         */
        MainGameVM.prototype.changeEnemy = function (_index) {
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: change Enemy " + _index);
            }
            this.enemy.changeMovieClip(Model.MonsterLocalService.MonsterList[_index].IdleJson, Model.MonsterLocalService.MonsterList[_index].IdlePng, Model.MonsterLocalService.MonsterList[_index].Idle);
        };
        /**
         * @金币掉落.
         */
        MainGameVM.prototype.goldDrop = function () {
            var dropMoney = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].dropMoney;
            var dropMoneyAndUnit = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DropMoneyAndUnit;
            this.goldAnimel(dropMoney, dropMoneyAndUnit);
        };
        /**
         * @灵石掉落.
         */
        MainGameVM.prototype.jewelDrop = function () {
            if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                var bossDropJewelProbability = Model.Mathf.random(0, 10000);
                if (bossDropJewelProbability < Model.PlayerLocalService.PlayerData.st.bossDropJewelProbability) {
                    this.jewelAnimel(Model.PlayerLocalService.PlayerData.st.bossDropJewelCount, Model.PlayerLocalService.PlayerData.st.bossDropJewelCount + "");
                }
                ;
            }
        };
        /**
         * @敌人死亡时动画
         */
        MainGameVM.prototype.enemyKilled = function (_onKilled) {
            var _this = this;
            //by cai_haotian 2016.4.15
            if (Model.PlayerLocalService.PlayerData.isChallenge) {
                //这段作为活动boss死亡时的效果调用
                var effect = new ViewModel.HeroItemVM(this.enemyGroup);
                _onKilled();
                effect.initMovieClip("tx_siwang_json", "tx_siwang_png", "Tx_siwang", 1, function () {
                    _this.enemyGroup.removeChild(effect.movieClip);
                }, false);
                this.challengeFinishTitle.visible = true;
                if (Model.WebValue.isTraditional) {
                    this.challengeFinishTitle.source = "icon_zhandoushengli_tw_png";
                }
                else {
                    this.challengeFinishTitle.source = "icon_zhandoushengli_png";
                }
                egret.setTimeout(function () {
                    _this.challengeFinishTitle.visible = false;
                }, this, 1000);
                this.commitAuto(); //自动提交数据
            }
            else {
                //这段作为正常游戏流程的调用
                //调用成就方法 by cai_haotian 
                this.achievement();
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: enemy killed ! ");
                }
                this.cutFlag = false; //先停止点击事件 by cai_haotian 2016.3.8.
                this.goldDrop(); //要在怪物死亡后，切换index之前调用金币模块.
                this.jewelDrop(); //如果为Boss则有几率掉落灵石.
                var effect = new ViewModel.HeroItemVM(this.enemyGroup);
                effect.initMovieClip("tx_siwang_json", "tx_siwang_png", "Tx_siwang", 1, function () {
                    _this.enemyGroup.removeChild(effect.movieClip);
                    _onKilled();
                    if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                        _this.sceneInfo.swardIcon.visible = false; //关小剑.
                        _this.sceneInfo.bossInfoGroup.visible = true; //显示倒计时，逃跑按钮，进度条
                        _this.sceneInfo.countTimeImage.visible = true; //显示倒计时 by cai_haotian 2016.4.18
                        _this.sceneInfo.countTimeLabel.visible = true; //显示进度条 by cai_haotian 2016.4.18
                        _this.sceneInfo.bossBtn.currentState = "down"; //设置按钮显示 by cai_haotian 2016.4.18
                        //倒计时初始化.                    
                        _this.sceneInfo.setCountDown(function () {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("zhujun: boss倒计时结束,进入刷怪模式 ! ");
                            }
                            Model.MonsterLocalService.setFarmMonsterData();
                            Model.SceneLocalService.SceneData.currentMonster = 0; //强制切换怪物.
                            _this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster); //怪物死后调用
                            _this.sceneInfo.setMonsterHp(); //倒计时到了,强制切换怪物数据，更新UIhp.
                            Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                                if (Model.WebServiceBase.isDebug) {
                                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                }
                            }, function () {
                                Main.singleton.mainMenuVM.offLineGroup.visible = true;
                                if (Model.WebValue.isTraditional) {
                                    alert("數據提交失敗請聯繫管理員！！！！");
                                }
                                else {
                                    alert("数据提交失败请联系管理员！！！！");
                                }
                            });
                        });
                    }
                    else {
                        if (Model.SceneLocalService.SceneData.currentMonster == Model.SceneLocalService.SceneData.monsterCount - 1) {
                            Model.MonsterLocalService.setFarmMonsterData();
                            Model.SceneLocalService.SceneData.currentMonster = 0; //强制切换怪物.
                        }
                        else {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("zhujun: 这边进入了循环战斗,UI应该不变,等点击按钮时,修改数据,切换回挑战boss ! ");
                            }
                        }
                    }
                    _this.sceneInfo.setMonsterHp(); //普通怪物死亡更新UIhp.
                    _this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster); //怪物死后调用
                    _this.sceneInfo.setMonsterIndex();
                    _this.cutFlag = true; //重新开始扣血事件 by cai_haotian 2016.3.8.
                    _this.commitAuto(); //自动提交数据
                }, false);
            }
        };
        /**
         * @敌人被攻击时动画
         */
        MainGameVM.prototype.enemyHit = function () {
            var _this = this;
            console.log("zhujun： enemy Hit " + Model.SceneLocalService.SceneData.currentMonster);
            this.enemy.changeMovieClip(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HitJson, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HitPng, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Hit, 1, function () {
                _this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster);
            });
            //敌人受到攻击时的动画
            //by cai_haotian 2016.3.16.
            var enemyHit = new ViewModel.HeroItemVM(this.levelUpLight);
            var enemyHitMc = enemyHit.initMovieClip("Tx_shouji_json", "Tx_shouji_png", "Tx_shouji", 1, function () {
                _this.levelUpLight.removeChild(enemyHitMc);
            });
        };
        /**
         * @金币动画.
         */
        MainGameVM.prototype.goldAnimel = function (_goldAdd, _goldAddAndUnit) {
            var _this = this;
            var max = Model.Mathf.random(1, 5);
            for (var i = 0; i < max; i++) {
                var coin = new eui.Image();
                coin.source = "icon_jinbi";
                coin.x = 500;
                coin.y = 300;
                var endRandomX = Model.Mathf.random(0, 600); //掉落终点的x坐标
                var bezierP1X = endRandomX + Model.Mathf.random(-100, 100); //返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
                var startPos = new Model.Vector2(300, 300); //设置出现点的起始坐标
                var endPos = new Model.Vector2(endRandomX, Model.Mathf.random(530, 550)); //设置掉落点的终点坐标
                var finalPos = new Model.Vector2(225, 155); //金币最终飞到的坐标
                var tween = new Model.TweenCustom(coin, this.goldAndTextGroup, startPos, endPos, finalPos); //进行掉落返回曲线的函数   
                tween.sAnimTime = Model.Mathf.random(1200, 1400); //总时长
                tween.bezierP1X = bezierP1X; //设置回收动画，贝塞尔曲线的P1点x坐标
                var recycleCallBack = function (_bTween) {
                    _bTween.obj.touchEnabled = false;
                    _this.addHpText(_bTween, _goldAddAndUnit);
                    _bTween.GoldRecycleAnim(function () {
                        _this.sceneInfo.goldAnimelStart(); //点击后播放呼吸动画
                        Model.PlayerLocalService.PlayerData.AddGold = _goldAdd; //收到钱后更新金币数量
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN, _goldAdd);
                    });
                };
                tween.GoldProductionAnim(function (_bTween) {
                    var waitBackAnim = egret.setTimeout(function () {
                        recycleCallBack(_bTween);
                        egret.clearTimeout(waitBackAnim);
                    }, _this, _bTween.goldWaitTime);
                    _bTween.obj.once(egret.TouchEvent.TOUCH_TAP, function () {
                        recycleCallBack(_bTween);
                        egret.clearTimeout(waitBackAnim);
                    }, _this);
                }); //开启掉落曲线.
            }
        };
        /**
         * @处理显示钱币
         */
        MainGameVM.prototype.addHpText = function (_tween, _goldAddAndUnit) {
            var label = new eui.BitmapLabel();
            label.font = RES.getRes("gold-font_fnt");
            label.text = _goldAddAndUnit;
            label.x = _tween.ePos.x - label.textWidth / 2;
            label.y = _tween.ePos.y - _tween.obj.height;
            Main.singleton.mainMenuVM.addChild(label);
            egret.Tween.get(label).to({ y: 350, alpha: 0 }, 1200).call(function () {
                Main.singleton.mainMenuVM.removeChild(label);
            });
        };
        /**
         * @灵石动画.
         */
        MainGameVM.prototype.jewelAnimel = function (_jewelAdd, _jewelAddAndUnit) {
            var _this = this;
            var jewel = new eui.Image();
            jewel.source = "icon_lingshi";
            jewel.width = 23;
            jewel.height = 23;
            jewel.x = 500;
            jewel.y = 300;
            Main.singleton.mainMenuVM.addChild(jewel);
            var endRandomX = Model.Mathf.random(0, 600); //掉落终点的x坐标
            var bezierP1X = endRandomX + Model.Mathf.random(-100, 100); //返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
            var startPos = new Model.Vector2(300, 300); //设置出现点的起始坐标
            var endPos = new Model.Vector2(endRandomX, Model.Mathf.random(530, 550)); //设置掉落点的终点坐标
            var finalPos = new Model.Vector2(266, 387); //灵石最终飞入坐标
            var tween = new Model.TweenCustom(jewel, this.goldAndTextGroup, startPos, endPos, finalPos); //进行掉落返回曲线的函数      
            tween.sAnimTime = Model.Mathf.random(1200, 1400); //总时长
            tween.bezierP1X = bezierP1X; //设置回收动画，贝塞尔曲线的P1点x坐标
            var recycleCallBack = function (_bTween) {
                _bTween.obj.touchEnabled = false;
                _this.addJewelText(_bTween, _jewelAddAndUnit);
                _bTween.GoldRecycleAnim(function () {
                    Model.PlayerLocalService.PlayerData.AddJewel = Number(_jewelAdd); //收到钱后更新金币数量
                    //调用成就 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL, Number(_jewelAdd));
                });
            };
            tween.GoldProductionAnim(function (_bTween) {
                var waitBackAnim = egret.setTimeout(function () {
                    recycleCallBack(_bTween);
                    egret.clearTimeout(waitBackAnim);
                }, _this, _bTween.goldWaitTime);
                _bTween.obj.once(egret.TouchEvent.TOUCH_TAP, function () {
                    recycleCallBack(_bTween);
                    egret.clearTimeout(waitBackAnim);
                }, _this);
            }); //开启掉落曲线.
        };
        /**
         * @处理显示灵石
         */
        MainGameVM.prototype.addJewelText = function (_tween, _goldAddAndUnit) {
            var label = new eui.BitmapLabel();
            label.font = RES.getRes("gold-font_fnt");
            label.text = _goldAddAndUnit;
            label.x = _tween.ePos.x - label.textWidth / 2;
            label.y = _tween.ePos.y - _tween.obj.height;
            Main.singleton.mainMenuVM.addChild(label);
            egret.Tween.get(label).to({ y: 350, alpha: 0 }, 1200).call(function () {
                Main.singleton.mainMenuVM.removeChild(label);
            });
        };
        /**
         * @自动提交方法
         * @by cai_haotian 2016.3.30
         */
        MainGameVM.prototype.commitAuto = function () {
            this.commitFlag++;
            if (this.commitFlag == 10) {
                this.commitFlag = 0;
                Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                    }
                }, function () {
                    Main.singleton.mainMenuVM.offLineGroup.visible = true;
                    if (Model.WebValue.isTraditional) {
                        alert("數據提交失敗請聯繫管理員！！！！");
                    }
                    else {
                        alert("数据提交失败请联系管理员！！！！");
                    }
                });
            }
        };
        /**
         * @怪物与成就相关数据
         * @by cai_haotian 2016.4.5
         */
        MainGameVM.prototype.achievement = function () {
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_KILL_ENEMY, 1);
            switch (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType) {
                case Model.MonsterType.MONSTER_TYPE_BOSS:
                    //调用成就 by cai_haotian 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_KILL_BOSS, 1);
                    break;
                case Model.MonsterType.MONSTER_TYPE_BOX:
                    //调用成就 by cai_haotian 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_BOX, 1);
                    break;
                case Model.MonsterType.MONSTER_TYPE_PERSON:
                    break;
                default: alert("怪物类型出错！请联系管理员！c");
            }
        };
        return MainGameVM;
    }(eui.Component));
    ViewModel.MainGameVM = MainGameVM;
    __reflect(MainGameVM.prototype, "ViewModel.MainGameVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=MainGameVM.js.map