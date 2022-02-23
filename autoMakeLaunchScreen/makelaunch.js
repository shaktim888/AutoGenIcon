
var path = require("path");
var gm = require('gm')
var _genMakeLaunch = function(outputpath,icon_path,isL){
    var inputPath = path.join(path.dirname(__filename), "input")
    var bgImg = path.join(inputPath,"LaunchScreenBackground.png");
    var itemImg = path.resolve(icon_path)
    var outPath = path.join(outputpath,"LaunchScreenBackground.png") 
    
    var width
    var height  

    if (isL){
        width = 2208
        height = 1242
    }else{
        width = 1242
        height = 2208
    }
    
    var itemPath = `image Over ${width/2-150},${height/2-150},${300},${300},"${itemImg}"`; 
    gm(bgImg)
    .resize(width, height, '!')
    .draw(itemPath)
    .write(outPath, function (err) {
        if (!err) 
        {
            console.log(outPath)
            console.log("启动图制作成功");
        } 
        else 
        {
            console.log(err.message || "出错了！" + i);
        }
    });
}

module.exports = _genMakeLaunch;

