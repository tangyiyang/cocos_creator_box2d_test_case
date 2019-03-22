// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const physics = cc.director.getPhysicsManager();
        physics.enabled  = true;
        // physics.debugDrawFlags =

        cc.log("call main on load.");
        cc.loader.loadRes("prefab/player", (error, prefab) => {
            if (error ) {
                cc.error("load player with error " + error);


            } else {
                cc.log("load player ok");

                const player = cc.instantiate(prefab);
                player.setPosition(cc.v2(0, 0));
                this.node.addChild(player);

                cc.loader.loadRes("prefab/knife", (error, prefab) => {
                    if (error) {
                        cc.error("load knife error");
                    } else {
                        cc.log("load knife ok");
                        const knife = cc.instantiate(prefab);
                        knife.setPosition( 100, 100);
                        player.addChild(knife);

                        player.runAction(cc.repeatForever(cc.rotateBy(1, -240)));

                        this._player = player;
                    }
                });
            }
        });
    },

    start () {

    },
});
