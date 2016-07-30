/**
 * Created by plter on 7/27/16.
 */

import Game2dApp from "cn/ucai/game2d/app/Game2dApp";
import Rectangle from "cn/ucai/game2d/display/Rectangle";
import PropertyAnim from  "cn/ucai/game2d/anim/PropertyAnim";

class AnimDemo extends Game2dApp {


    constructor() {
        super(400, 300);

        document.body.appendChild(this.getDom());

        this._rect = new Rectangle(100, 100, "red");
        this.addChild(this._rect);

        let move = new PropertyAnim(this._rect, "x", 0, 200, 120);
        move.start();

        this._rect.addEventListener("click", function (e) {
            move.start();
        });
    }
}

new AnimDemo();

export default AnimDemo;