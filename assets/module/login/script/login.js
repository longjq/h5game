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
        audio: {
            default: null,
            type: cc.AudioClip
        },
        audioId: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化判断
        if (!cc.vv) {
            cc.director.loadScene("loading")
            return
        }
        this.audioId = cc.audioEngine.play(this.audio, true, 1);
    },

    // start () { },
    onBtnQuickStartClicked(){
        console.log(cc.vv)
        cc.audioEngine.stop(this.audioId)
        // this.audio.stop()
    }

    // update (dt) {},
});
