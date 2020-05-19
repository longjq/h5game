// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        tipLabel: cc.Label, // 加载标签文字
        _splash:null,       // 引导页
        _stateStr: ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.initMgr()

        this.tipLabel.string = this._stateStr
        this._splash = cc.find("Canvas/splash")
        this._splash.active = true
    },

    // 初始化函数
    initMgr(){
        cc.vv = {}

        const AudioMgr = require('audiomgr')
        cc.vv.audioMgr = new AudioMgr()
    },

    start () {
        this.loadingScene()
    },

    // 引导页函数
    loadingScene(){
        var self = this;
        var SHOW_TIME = 3000; //显示时间
        var FADE_TIME = 500;  //褪去时间
        //判断是否为原生，运行的os名称不是IOS
        if(cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative){
            self._splash.active = true; //设为可见
            var t = Date.now(); //当前时间
            var fn = function(){
                var dt = Date.now() - t; //显示时间差
                //未到显示时间
                if(dt < SHOW_TIME){
                    setTimeout(fn,33);
                }
                //已到时间
                else {
                    //显示完成后计算隐藏时间
                    var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
                    //是否刚到褪色时间
                    if(op < 0){
                        self._splash.opacity = 0;
                        self.checkVersion();    //检查版本更新
                    }
                    else{
                        //未到褪色时间继续显示
                        self._splash.opacity = op;
                        setTimeout(fn,33);   
                    }
                }
            };
            setTimeout(fn,33); 
        }
        else{
            this._splash.active = false;
            self.checkVersion();//检查版本更新
        }
    },
    // 检查版本更新
    checkVersion(){
        this.onLoadComplete()
    },
    // 加载完成
    onLoadComplete(){
        this._stateStr = "准备登录"
        cc.director.loadScene("login")
    }

    // update (dt) {},
});
